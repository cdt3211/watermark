import { Mail } from 'lucide-react'
import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* 版权信息 */}
          <div className="text-gray-600 text-sm">
            © 2024 Abner. All rights reserved.
          </div>

          {/* 社交媒体链接 */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/cdt3211"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:tiankong089@gmail.com"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
