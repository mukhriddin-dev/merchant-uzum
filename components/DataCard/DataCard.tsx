"use client"

import type React from "react"

import { Copy, ExternalLink, RotateCcw, CheckCircle, XCircle } from "lucide-react"
import type { DataCardProps } from "./type"

export function DataCard({ data, language, onCopy, onOpenWebview, onReset }: DataCardProps) {
  const labels = {
    uz: {
      // Header
      phone: "Telefon raqami",
      buyerId: "Buyer ID",
      status: "Status",
      verifiedAt: "Tasdiqlangan sana",
      notVerified: "Tasdiqlanmagan",

      // Financial
      financialStatus: "Moliyaviy holat",
      balance: "Balans", 
      hasLimit: "Limit mavjud",
      customDiscount: "Maxsus chegirma",
      overdueContracts: "Qarzi mavjud",

      // Security
      securityRisk: "Xavfsizlik / Risk",
      blacklist: "Qora ro'yxat",
      blacklistReason: "Qora ro'yxat sababi",
      statusExplanation: "Status tushuntirishi",

      // Periods
      availablePeriods: "Mavjud muddatlar",
      originalMarkup: "Asl ustama",
      discountMarkup: "Chegirmali ustama",
      availableBalance: "Mavjud balans",

      // Actions
      openWebview: "Web sahifani ochish",
      reset: "Qaytadan",

      // Values
      yes: "Ha",
      no: "Yo'q",
      notAvailable: "Mavjud emas",
      copy: "Nusxalash",
    },
    ru: {
      // Header
      phone: "Номер телефона",
      buyerId: "ID покупателя",
      status: "Статус",
      verifiedAt: "Дата верификации",
      notVerified: "Не подтверждено",

      // Financial
      financialStatus: "Финансовый статус",
      balance: "Баланс",
      hasLimit: "Лимит доступен",
      customDiscount: "Индивидуальная скидка",
      overdueContracts: "Просроченные договоры",

      // Security
      securityRisk: "Безопасность / Риск",
      blacklist: "Черный список",
      blacklistReason: "Причина черного списка",
      statusExplanation: "Пояснение статуса",

      // Periods
      availablePeriods: "Доступные периоды",
      originalMarkup: "Исходная наценка",
      discountMarkup: "Скидочная наценка",
      availableBalance: "Доступный баланс",

      // Actions
      openWebview: "Открыть веб-страницу",
      reset: "Сбросить",

      // Values
      yes: "Да",
      no: "Нет",
      notAvailable: "Недоступно",
      copy: "Копировать",
    },
  }

  const t = labels[language]

  const formatBalance = (balance: number) => {
    return (
      new Intl.NumberFormat("uz-UZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(balance) + " so'm"
    )
  }

  const formatDate = (date: string | null) => {
    if (!date) return t.notVerified
    return new Date(date).toLocaleDateString(language === "uz" ? "uz-UZ" : "ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatPhone = (phone: string | null) => {
    if (!phone) return "—"
    if (phone.length === 12) {
      return `+${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(8, 10)} ${phone.slice(10, 12)}`
    }
    return phone
  }

  const CopyButton = ({ text, label }: { text: string; label: string }) => (
    <button
      onClick={() => onCopy(text, label)}
      className="rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors"
      title={t.copy}
    >
      <Copy className="h-4 w-4" />
    </button>
  )

  const BooleanIndicator = ({ value, invertColor = false }: { value: boolean; invertColor?: boolean }) => {
    const showPositive = invertColor ? !value : value
    return (
      <div className="flex items-center gap-1.5">
        {showPositive ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <XCircle className="h-4 w-4 text-red-500" />
        )}
        <span className={`font-medium ${showPositive ? "text-green-600" : "text-red-600"}`}>
          {value ? (language === "uz" ? "Ha" : "Да") : language === "uz" ? "Yo'q" : "Нет"}
        </span>
      </div>
    )
  }

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b border-border pb-2">
      {children}
    </h3>
  )

  const DataRow = ({
    label,
    children,
    copyValue,
    copyLabel,
  }: { label: string; children: React.ReactNode; copyValue?: string; copyLabel?: string }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-medium text-foreground">{children}</span>
        {copyValue && copyLabel && <CopyButton text={copyValue} label={copyLabel} />}
      </div>
    </div>
  )

  const BlacklistIndicator = ({ inBlacklist }: { inBlacklist: boolean }) => {
    if (inBlacklist) {
      return (
        <div className="flex items-center gap-1.5">
          <CheckCircle className="h-4 w-4 text-red-500" />
          <span className="font-medium text-red-600">{language === "uz" ? "Bor" : "Есть"}</span>
        </div>
      )
    }
    return (
      <div className="flex items-center gap-1.5">
        <XCircle className="h-4 w-4 text-green-500" />
        <span className="font-medium text-green-600">{language === "uz" ? "Yo'q" : "Нет"}</span>
      </div>
    )
  }

  return (
    <div className="w-full rounded-[20px] bg-card p-6 md:p-8 shadow-sm border border-border">
      <div
        className="grid gap-6 md:gap-5 lg:gap-6"
        style={{
          gridTemplateColumns: "1fr",
        }}
      >
        <style jsx>{`
          @media (min-width: 768px) {
            div[data-grid="main"] {
              grid-template-columns: 58fr 42fr !important;
            }
          }
        `}</style>

        <div
          data-grid="main"
          className="grid gap-6 md:gap-5 lg:gap-6"
          style={{
            gridTemplateColumns: "1fr",
          }}
        >
          <div className="flex flex-col gap-6">
            <div>
              <SectionTitle>{language === "uz" ? "Asosiy ma'lumotlar" : "Основная информация"}</SectionTitle>

              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl font-bold text-primary whitespace-nowrap">{formatPhone(data.phone)}</span>
                {data.phone && <CopyButton text={data.phone} label={t.phone} />}
              </div>

              <DataRow label={t.buyerId} copyValue={String(data.id)} copyLabel={t.buyerId}>
                <span className="whitespace-nowrap">{data.id}</span>
              </DataRow>

              <DataRow label={t.status}>
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {data.status}
                  </span>
                  <span>{data.status_label}</span>
                </span>
              </DataRow>

              <DataRow label={t.verifiedAt}>
                <span className={`whitespace-nowrap ${data.verified_at ? "text-green-600" : "text-amber-600"}`}>
                  {formatDate(data.verified_at)}
                </span>
              </DataRow>
            </div>

            <div>
              <SectionTitle>{t.financialStatus}</SectionTitle>

              <DataRow label={t.balance} copyValue={formatBalance(data.balance)} copyLabel={t.balance}>
                <span className="font-semibold text-primary whitespace-nowrap">{formatBalance(data.balance)}</span>
              </DataRow>

              <DataRow label={t.hasLimit}>
                <BooleanIndicator value={data.has_limit} />
              </DataRow>

              <DataRow label={t.customDiscount}>
                <span className="whitespace-nowrap">
                  {data.custom_discount !== null ? `${data.custom_discount}%` : t.notAvailable}
                </span>
              </DataRow>

              <DataRow label={t.overdueContracts}>
                <BooleanIndicator value={data.has_overdue_contracts} invertColor />
              </DataRow>
            </div>

            <div>
              <SectionTitle>{t.securityRisk}</SectionTitle>

              <DataRow label={t.blacklist}>
                <BlacklistIndicator inBlacklist={data.is_in_black_list} />
              </DataRow>

              {data.is_in_black_list && data.blacklist_reason && (
                <DataRow label={t.blacklistReason}>
                  <span className="text-red-600">{data.blacklist_reason}</span>
                </DataRow>
              )}

              <DataRow label={t.statusExplanation}>
                <span className="max-w-[250px] text-right break-words">{data.status_explanation || "—"}</span>
              </DataRow>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex-1">
              <SectionTitle>{t.availablePeriods}</SectionTitle>

              {data.available_periods && data.available_periods.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {data.available_periods.map((period, index) => (
                    <div key={`period-${period.id ?? index}`} className="rounded-xl bg-muted/50 px-4 py-3">
                      <div className="font-semibold text-foreground mb-2 text-left">
                        {language === "uz" ? period.title_uz || period.name_uz : period.title_ru || period.name_ru}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-xs">{t.originalMarkup}</span>
                          <span className="font-medium">{period.original_markup ?? period.markup_percentage}%</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-xs">{t.discountMarkup}</span>
                          <span className="font-medium text-green-600">
                            {period.discount_markup ?? period.markup_percentage}%
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-border/50">
                        <span className="text-sm text-muted-foreground">{t.availableBalance}</span>
                        <span className="font-semibold text-primary whitespace-nowrap">
                          {formatBalance(period.available_balance)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-muted/50 px-4 py-3 text-center text-muted-foreground">
                  {t.notAvailable}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              {data.webview_url ? (
                <button
                  onClick={() => onOpenWebview(data.webview_url!)}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t.openWebview}
                </button>
              ) : (
                <div className="w-full flex items-center justify-center gap-2 rounded-full bg-muted px-5 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed">
                  <ExternalLink className="h-4 w-4" />
                  {t.openWebview} ({t.notAvailable})
                </div>
              )}
              <button
                onClick={onReset}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-muted px-5 py-3 text-sm font-semibold text-muted-foreground transition-all hover:bg-muted/80"
              >
                <RotateCcw className="h-4 w-4" />
                {t.reset}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
