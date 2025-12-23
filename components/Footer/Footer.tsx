"use client"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-background py-6">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <a href="#" className="font-medium text-primary hover:underline">
            Buyer Panel
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  )
}
