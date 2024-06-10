const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* About Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h3 className="text-lg font-bold mb-2">About MyInbox</h3>
            <p className="text-sm">
              MyInbox is a cutting-edge chat application that allows you to stay connected with your friends and family. Our mission is to provide seamless and secure communication.
            </p>
          </div>
          
          {/* Quick Links Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li className="mb-2"><a href="#" className="hover:underline">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Features</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Pricing</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h3 className="text-lg font-bold mb-2">Contact Us</h3>
            <ul className="text-sm">
              <li className="mb-2">Email: support@myinbox.com</li>
              <li className="mb-2">Phone: +1 234 567 890</li>
              <li className="mb-2">Address: 123 Chat Avenue, Messaging City, USA</li>
            </ul>
          </div>
          
          {/* Social Media Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <div className="flex flex-col space-x-4">
              <a href="#" className="hover:text-gray-400"><i className="fab fa-facebook-f"></i> Facebook</a>
              <a href="#" className="hover:text-gray-400"><i className="fab fa-twitter"></i> Twitter</a>
              <a href="#" className="hover:text-gray-400"><i className="fab fa-instagram"></i> Instagram</a>
              <a href="#" className="hover:text-gray-400"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MyInbox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
