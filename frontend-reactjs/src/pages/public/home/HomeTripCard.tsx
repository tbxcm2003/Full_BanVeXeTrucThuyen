import {
  getSeatLayoutByVehicleType,
  gheHienThiTrenBang,
  type SeatMapResponse,
  type SeatStatus,
} from '../../../utils/seatMapLayout';
import { addMinutesToTime, formatCurrency, formatDuration } from './homeFormatters';
import type { ResultTab, TripSummary } from './homeTypes';

type HomeTripCardProps = {
  trip: TripSummary;
  tripDangChonGhe: number | null;
  dangTaiSoDoGhe: boolean;
  soDoGheTheoChuyen: Record<number, SeatMapResponse>;
  gheDangChonTheoChuyen: Record<number, string[]>;
  onToggleSeatPanel: (tripId: number) => void;
  onSelectSeat: (tripId: number, seat: SeatStatus) => void;
  onChooseTrip: (trip: TripSummary) => void;
  tripType: 'one-way' | 'round-trip';
  activeResultTab: ResultTab;
};

const HomeTripCard = ({
  trip,
  tripDangChonGhe,
  dangTaiSoDoGhe,
  soDoGheTheoChuyen,
  gheDangChonTheoChuyen,
  onToggleSeatPanel,
  onSelectSeat,
  onChooseTrip,
  tripType,
  activeResultTab,
}: HomeTripCardProps) => (
  <div id={`trip-card-${trip.id}`} className="rounded-xl border border-[#ef5222]/40 p-3 hover:shadow-md transition bg-white">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-[72px]">
            <p className="text-3xl font-bold text-gray-900 leading-none">{trip.gioDi?.slice(0, 5) || '--:--'}</p>
            <p className="text-[20px] leading-none text-green-700 mt-0.5">•</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5 leading-tight truncate">{trip.diemDi || '---'}</p>
          </div>

          <div className="flex-1 px-1 pt-0.5">
            <div className="border-t border-dotted border-gray-300 mt-2" />
            <p className="text-sm font-semibold text-gray-700 mt-1.5 text-center">
              {formatDuration(trip.thoiGianDuKienPhut)}
              {trip.khoangCach ? ` - ${trip.khoangCach}Km` : ''}
            </p>
            <p className="text-xs text-gray-500 text-center">(Asia/Ho Chi Minh)</p>
          </div>

          <div className="min-w-[72px] text-right">
            <p className="text-3xl font-bold text-gray-900 leading-none">
              {(trip.gioDenDuKien || addMinutesToTime(trip.gioDi, trip.thoiGianDuKienPhut))?.slice(0, 5) || '--:--'}
            </p>
            <p className="text-[20px] leading-none text-[#ef5222] mt-0.5">•</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5 leading-tight truncate">{trip.diemDen || '---'}</p>
          </div>
        </div>
      </div>

      <div className="min-w-[145px] text-right pt-0.5">
        <p className="text-xs text-gray-500">
          {trip.loaiXe ? `${trip.loaiXe} • ` : ''}
          {trip.soGheTrong} chỗ trống
        </p>
        <p className="text-2xl font-bold text-[#ef5222] mt-1">{formatCurrency(Number(trip.giaVe || 0))}</p>
      </div>
    </div>
    <div className="mt-2.5 pt-2.5 border-t border-gray-100 flex items-center justify-between">
      <div className="text-sm flex items-center gap-6">
        <button
          type="button"
          onClick={() => onToggleSeatPanel(trip.id)}
          className={`pb-1 border-b-2 transition ${
            tripDangChonGhe === trip.id
              ? 'text-[#ef5222] border-[#ef5222] font-semibold'
              : 'text-gray-700 border-transparent hover:text-[#ef5222]'
          }`}
        >
          Chọn ghế
        </button>
        <span className="text-gray-700">Lịch trình</span>
        <span className="text-gray-700">Trung chuyển</span>
        <span className="text-gray-700">Chính sách</span>
      </div>
      <button
        type="button"
        onClick={() => onChooseTrip(trip)}
        className="px-4 py-2 rounded-full text-sm font-semibold bg-[#ef5222] text-white hover:bg-[#d84a1e] transition"
      >
        {tripType === 'round-trip'
          ? activeResultTab === 'outbound'
            ? 'Chọn chuyến đi'
            : 'Chọn chuyến về'
          : 'Chọn chuyến'}
      </button>
    </div>

    {tripDangChonGhe === trip.id && (
      <div className="mt-4 border-t border-gray-100 pt-4">
        {dangTaiSoDoGhe && !soDoGheTheoChuyen[trip.id] && <p className="text-sm text-gray-500">Đang tải sơ đồ ghế...</p>}
        {soDoGheTheoChuyen[trip.id] && (
          <>
            <div className="flex items-center justify-center gap-10 text-base text-gray-700 mb-5 font-medium">
              <span className="inline-flex items-center gap-1">
                <span className="w-5 h-5 rounded-md bg-gray-300 border border-gray-300" />
                Đã bán
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-5 h-5 rounded-md bg-blue-50 border border-blue-300" />
                Còn trống
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-5 h-5 rounded-md bg-[#fff3ef] border border-[#ef5222]" />
                Đang chọn
              </span>
            </div>
            {(() => {
              const apiSeats = soDoGheTheoChuyen[trip.id].ghe;
              const layout = getSeatLayoutByVehicleType(trip.loaiXe || '', apiSeats);
              const renderSeatButton = (seat: SeatStatus & { hienThiGhe?: string }, sizeClass = 'w-11 h-11 md:w-12 md:h-12') => {
                if (!seat.maGhe) return null;
                const selected = (gheDangChonTheoChuyen[trip.id] ?? []).includes(seat.maGhe);
                const seatClass = seat.daBan
                  ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                  : selected
                    ? 'bg-[#fff3ef] text-[#ef5222] border-[#ef5222] cursor-pointer shadow-[0_2px_6px_rgba(239,82,34,0.2)]'
                    : 'bg-blue-50 text-blue-500 border-blue-300 cursor-pointer hover:bg-blue-100';
                return (
                  <button
                    key={seat.maGhe}
                    type="button"
                    onClick={() => onSelectSeat(trip.id, seat)}
                    disabled={seat.daBan}
                    className={`${sizeClass} text-[13px] font-bold rounded-lg border-2 leading-none transition ${seatClass}`}
                  >
                    {seat.hienThiGhe ?? seat.maGhe}
                  </button>
                );
              };
              return (
                <>
                  {layout.tangDuoi && layout.tangTren && (
                    <div className="mb-4 flex w-full flex-col items-center">
                      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-700 mb-2 text-center">Tầng dưới</p>
                          <div className="space-y-3 max-w-md mx-auto">
                            {layout.tangDuoi.map((row, rowIdx) => (
                              <div key={`duoi-${rowIdx}`} className="grid grid-cols-3 gap-3 w-fit mx-auto">
                                {row.length === 2 ? (
                                  <>
                                    {renderSeatButton(row[0] as SeatStatus)}
                                    <div className="w-11 h-11 md:w-12 md:h-12" />
                                    {renderSeatButton(row[1] as SeatStatus)}
                                  </>
                                ) : (
                                  row.map((seat) => renderSeatButton(seat as SeatStatus))
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-700 mb-2 text-center">Tầng trên</p>
                          <div className="space-y-3 max-w-md mx-auto">
                            {layout.tangTren.map((row, rowIdx) => (
                              <div key={`tren-${rowIdx}`} className="grid grid-cols-3 gap-3 w-fit mx-auto">
                                {row.length === 2 ? (
                                  <>
                                    {renderSeatButton(row[0] as SeatStatus)}
                                    <div className="w-11 h-11 md:w-12 md:h-12" />
                                    {renderSeatButton(row[1] as SeatStatus)}
                                  </>
                                ) : (
                                  row.map((seat) => renderSeatButton(seat as SeatStatus))
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {layout.tangDuoi && !layout.tangTren && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2 text-center">Tầng dưới</p>
                      <div className="space-y-3 max-w-md mx-auto">
                        {layout.tangDuoi.map((row, rowIdx) => (
                          <div key={`duoi-only-${rowIdx}`} className="grid grid-cols-3 gap-3 w-fit mx-auto">
                            {row.length === 2 ? (
                              <>
                                {renderSeatButton(row[0] as SeatStatus)}
                                <div className="w-11 h-11 md:w-12 md:h-12" />
                                {renderSeatButton(row[1] as SeatStatus)}
                              </>
                            ) : (
                              row.map((seat) => renderSeatButton(seat as SeatStatus))
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {layout.tangTren && !layout.tangDuoi && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2 text-center">Tầng trên</p>
                      <div className="space-y-3 max-w-md mx-auto">
                        {layout.tangTren.map((row, rowIdx) => (
                          <div key={`tren-only-${rowIdx}`} className="grid grid-cols-3 gap-3 w-fit mx-auto">
                            {row.length === 2 ? (
                              <>
                                {renderSeatButton(row[0] as SeatStatus)}
                                <div className="w-11 h-11 md:w-12 md:h-12" />
                                {renderSeatButton(row[1] as SeatStatus)}
                              </>
                            ) : (
                              row.map((seat) => renderSeatButton(seat as SeatStatus))
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {layout.single && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2 text-center">
                        {layout.singleType === 'limousine' ? 'Sơ đồ Limousine' : 'Sơ đồ ghế'}
                      </p>
                      {layout.singleType === 'seat' ? (
                        <div className="space-y-3 max-w-md mx-auto">
                          {layout.single.map((row, rowIdx) => (
                            <div key={`single-seat-${rowIdx}`} className="flex items-center justify-center gap-10">
                              <div className="flex gap-3">{row.slice(0, 2).map((seat) => renderSeatButton(seat as SeatStatus))}</div>
                              <div className="flex gap-3">{row.slice(2).map((seat) => renderSeatButton(seat as SeatStatus))}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2 max-w-[220px] mx-auto">
                          {layout.single.map((row, rowIdx) => (
                            <div key={`single-limo-${rowIdx}`} className="grid grid-cols-3 gap-2 w-fit mx-auto">
                              {row.length === 3 ? (
                                row.map((seat) => renderSeatButton(seat as SeatStatus, 'w-10 h-10'))
                              ) : (
                                <>
                                  {renderSeatButton(row[0] as SeatStatus, 'w-10 h-10')}
                                  <div className="w-10 h-10" />
                                  {row[1] ? renderSeatButton(row[1] as SeatStatus, 'w-10 h-10') : <div className="w-10 h-10" />}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              );
            })()}
            {(gheDangChonTheoChuyen[trip.id] ?? []).length > 0 && (
              <div className="mt-4 flex items-center justify-between flex-wrap gap-2 border-t border-gray-100 pt-3">
                <div>
                  <p className="text-sm text-gray-700">{(gheDangChonTheoChuyen[trip.id] ?? []).length} Vé</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {gheHienThiTrenBang(
                      gheDangChonTheoChuyen[trip.id] ?? [],
                      soDoGheTheoChuyen[trip.id] ?? null,
                      trip.loaiXe || '',
                    )}
                  </p>
                </div>
                <div className="flex items-end gap-0.75">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Tổng tiền</p>
                    <p className="text-lg font-bold text-[#ef5222]">
                      {formatCurrency((gheDangChonTheoChuyen[trip.id] ?? []).length * Number(trip.giaVe || 0))}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onChooseTrip(trip)}
                    className="px-6 py-2 rounded-full text-sm font-semibold bg-[#ef5222] text-white hover:bg-[#d84a1e] transition"
                  >
                    {tripType === 'round-trip'
                      ? activeResultTab === 'outbound'
                        ? 'Chọn chuyến đi'
                        : 'Chọn chuyến về'
                      : 'Chọn'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    )}
  </div>
);

export default HomeTripCard;
