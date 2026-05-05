package com.banvexe.accountmanagement.config;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.Ordered;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseCharsetMigrationRunner implements ApplicationRunner, Ordered {

    private static final Logger log = LoggerFactory.getLogger(DatabaseCharsetMigrationRunner.class);

    private final JdbcTemplate jdbcTemplate;

    @Value("${app.db.charset.auto-fix:true}")
    private boolean autoFix;

    public DatabaseCharsetMigrationRunner(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int getOrder() {
        // Run right after seed runner.
        return Ordered.HIGHEST_PRECEDENCE + 10;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (!autoFix) {
            log.info("DB charset auto-fix disabled (app.db.charset.auto-fix=false).");
            return;
        }

        try {
            jdbcTemplate.execute("ALTER DATABASE `" + currentDatabase() + "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        } catch (Exception ex) {
            log.warn("Skip ALTER DATABASE charset due to: {}", ex.getMessage());
        }

        List<String> tableNames = jdbcTemplate.queryForList(
            "SELECT table_name FROM information_schema.tables WHERE table_schema = DATABASE()",
            String.class
        );

        for (String tableName : tableNames) {
            try {
                jdbcTemplate.execute("ALTER TABLE `" + tableName + "` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            } catch (Exception ex) {
                log.warn("Skip charset conversion for table {} due to: {}", tableName, ex.getMessage());
            }
        }

        log.info("DB charset migration check completed (target: utf8mb4 / utf8mb4_unicode_ci).");
    }

    private String currentDatabase() {
        String db = jdbcTemplate.queryForObject("SELECT DATABASE()", String.class);
        return db == null ? "" : db;
    }
}

