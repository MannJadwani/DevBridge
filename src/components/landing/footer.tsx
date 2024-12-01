// src/components/landing/footer.tsx
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-slate-400 hover:text-white transition">Features</Link></li>
              <li><Link href="#pricing" className="text-slate-400 hover:text-white transition">Pricing</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Documentation</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">API</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-slate-400 hover:text-white transition">About</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Community</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Help Center</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Partners</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Status</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Privacy</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Terms</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Security</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400">
            © 2024 DevBridge. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-slate-400 hover:text-white transition">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-slate-400 hover:text-white transition">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-slate-400 hover:text-white transition">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}