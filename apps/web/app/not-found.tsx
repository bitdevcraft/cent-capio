import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@repo/ui/components/shadcn/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Large 404 Text */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-bold select-none bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 animate-pulse bg-clip-text text-transparent overflow-hidden">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">
            Oops! Page Not Found
          </h2>
          <p className="text-md text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved,
            deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center py-8">
          <div className="relative">
            <div className="size-48 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <Search className="w-24 h-24 text-slate-400 dark:text-slate-500" />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-pink-400 rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-green-400 rounded-full animate-bounce delay-700"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="min-w-[160px]">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[160px] bg-transparent"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need help? Try searching for what you need or{" "}
            <Link
              href="/contact"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
