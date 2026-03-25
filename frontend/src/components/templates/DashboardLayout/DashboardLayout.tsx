import { useState } from 'react'
import { cn } from '@/lib/cn'
import { TopNav } from '@/components/organisms/TopNav'
import { SupportChatButton } from '@/components/molecules/SupportChatButton'

interface DashboardLayoutProps {
  sidebar?: React.ReactNode
  children: React.ReactNode
  topLabel?: string
  contentClassName?: string
}

export function DashboardLayout({
  sidebar,
  children,
  topLabel,
  contentClassName,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen((prev) => !prev)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="relative flex h-dvh max-h-dvh w-full flex-col overflow-hidden bg-[#1B5FE9] dark:bg-gradient-to-b! dark:from-[#1B5FE9]! dark:to-[#1A1B1D]!">
      <div
        className="pointer-events-none absolute left-1/2 top-[112px] -translate-x-1/2 dark:hidden"
        style={{
          width: '2139px',
          height: '1433px',
          background: 'hsla(0, 0%, 100%, 0.73)',
          filter: 'blur(131.25px)',
        }}
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto">
        {topLabel && (
          <div className="relative z-10 shrink-0 px-4 pt-4 sm:px-6 lg:px-10 lg:pt-6">
            <span className="text-sm font-medium text-white/70">{topLabel}</span>
          </div>
        )}

        <div className={cn(
          'relative z-10 flex w-full shrink-0 items-center justify-center',
          'px-4 pt-4 sm:px-6 lg:px-10',
        )}>
          <TopNav onMenuClick={sidebar ? toggleSidebar : undefined} />
        </div>

        {sidebar ? (
          <div className={cn(
            'w-auto mx-4 mt-4 sm:mx-6 sm:mt-6 flex min-h-0 flex-1 flex-col gap-0 animate-fade-in',
            contentClassName
          )}>
            {/* Mobile overlay backdrop */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                onClick={closeSidebar}
              />
            )}

            <div
              className={cn(
                'relative flex w-full flex-1 min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#727B8E]/10 dark:border-[#40485A]',
                'flex-col lg:flex-row'
              )}
            >
              {/* Sidebar com animação mobile */}
              <div
                className={cn(
                  'flex shrink-0 flex-col overflow-hidden bg-white dark:bg-[#1A1B1D]',
                  // Mobile: fixed overlay com slide animation
                  'fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm transition-transform duration-300 ease-in-out',
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full',
                  // Desktop: static sidebar
                  'lg:relative lg:h-full lg:min-h-0 lg:w-[400px] lg:translate-x-0 lg:rounded-l-3xl'
                )}
              >
                {sidebar}
              </div>

              <div className="flex flex-1 flex-col min-h-0 overflow-auto rounded-2xl bg-[#F4F6F9] dark:bg-[#272A34] sm:rounded-3xl lg:rounded-r-3xl lg:rounded-l-none">
                {children}
              </div>
            </div>
          </div>
        ) : (
          <div className={cn(
            'mx-4 mt-4 sm:mx-6 sm:mt-6 flex min-h-0 flex-1 flex-col overflow-y-auto animate-fade-in',
            contentClassName
          )}>
            {children}
          </div>
        )}
      </div>
      <SupportChatButton />
    </div>
  )
}
