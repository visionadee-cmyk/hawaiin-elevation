import { Heart, Code, Building2, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const yearsSince2016 = currentYear - 2016;

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Left - Logo & Company */}
          <div className="flex items-center gap-4">
            <img 
              src="/logo/logo.jpeg" 
              alt="Hawaiin Elevation" 
              className="h-12 w-auto bg-white rounded-lg p-1"
            />
            <div>
              <h3 className="font-bold text-lg">Hawaiin Elevation</h3>
              <p className="text-slate-400 text-sm">Pvt Ltd</p>
            </div>
          </div>

          {/* Center - Developer Credit */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Code className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-300">Developed by</span>
            </div>
            <p className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              RettsWebDev
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Since 2016 • {yearsSince2016}+ Years of Excellence
            </p>
          </div>

          {/* Right - Contact */}
          <div className="flex flex-col items-end gap-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Hawaiin Elevation Pvt Ltd</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>hawainnelevation@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <a href="https://www.facebook.com/profile.php?id=61590504496612" target="_blank" rel="noopener noreferrer" className="underline">
                Hawaiin Elevation
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-6"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by RettsWebDev
          </p>
          <p>
            © {currentYear} Hawaiin Elevation Pvt Ltd. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Powered by Hawaiin Elevation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
