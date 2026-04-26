package com.banvexe.accountmanagement.config;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;
import org.springframework.util.StringUtils;

public class CloudinaryOnPropertyCondition implements Condition {

    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        return hasSecret(context.getEnvironment().getProperty("cloudinary.cloud-name", ""))
            && hasSecret(context.getEnvironment().getProperty("cloudinary.api-key", ""))
            && hasSecret(context.getEnvironment().getProperty("cloudinary.api-secret", ""));
    }

    private static boolean hasSecret(String v) {
        return StringUtils.hasText(v == null ? null : v.trim());
    }
}
