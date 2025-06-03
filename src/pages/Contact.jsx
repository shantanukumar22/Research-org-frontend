import React from "react";
import { Mail, Phone, MapPin, Clock, Globe, Users } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get in touch with our research organization. We look forward to
          hearing from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Main Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Main Office</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900">Address</p>
                <p className="text-gray-600">
                  123 Research Boulevard
                  <br />
                  Cambridge, MA 02142
                  <br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900">Phone</p>
                <p className="text-gray-600">
                  Main: (617) 555-0123
                  <br />
                  Fax: (617) 555-0124
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900">Email</p>
                <p className="text-gray-600">
                  General Inquiries:{" "}
                  <a
                    href="mailto:info@researchorg.com"
                    className="text-blue-600 hover:underline"
                  >
                    info@researchorg.com
                  </a>
                  <br />
                  Media Relations:{" "}
                  <a
                    href="mailto:media@researchorg.com"
                    className="text-blue-600 hover:underline"
                  >
                    media@researchorg.com
                  </a>
                  <br />
                  Partnerships:{" "}
                  <a
                    href="mailto:partnerships@researchorg.com"
                    className="text-blue-600 hover:underline"
                  >
                    partnerships@researchorg.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900">
                  Office Hours
                </p>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 5:00 PM
                  <br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Department Contacts */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Department Contacts
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Research & Development
              </h3>
              <p className="text-gray-600">
                Dr. Sarah Williams, Research Director
                <br />
                <a
                  href="mailto:s.williams@researchorg.com"
                  className="text-blue-600 hover:underline"
                >
                  s.williams@researchorg.com
                </a>
                <br />
                (617) 555-0125
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Environmental Science Division
              </h3>
              <p className="text-gray-600">
                Dr. Robert Chen, Division Head
                <br />
                <a
                  href="mailto:r.chen@researchorg.com"
                  className="text-blue-600 hover:underline"
                >
                  r.chen@researchorg.com
                </a>
                <br />
                (617) 555-0126
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Data Science & Analytics
              </h3>
              <p className="text-gray-600">
                Dr. Aisha Patel, Lead Data Scientist
                <br />
                <a
                  href="mailto:a.patel@researchorg.com"
                  className="text-blue-600 hover:underline"
                >
                  a.patel@researchorg.com
                </a>
                <br />
                (617) 555-0127
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Administration & Operations
              </h3>
              <p className="text-gray-600">
                Michael Thompson, Operations Manager
                <br />
                <a
                  href="mailto:m.thompson@researchorg.com"
                  className="text-blue-600 hover:underline"
                >
                  m.thompson@researchorg.com
                </a>
                <br />
                (617) 555-0128
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map and Additional Locations */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Visit Our Main Campus
        </h2>

        {/* Map placeholder - in a real implementation, you might use Google Maps or another mapping service */}
        <div className="w-full h-96 bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
          <div className="text-gray-500 text-lg">
            Interactive Map Would Be Displayed Here
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Additional Locations */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Field Research Station
            </h3>
            <div className="flex items-start mb-4">
              <MapPin className="h-5 w-5 text-blue-600 mt-1" />
              <div className="ml-3 text-gray-600">
                456 Coastal Road
                <br />
                Woods Hole, MA 02543
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-blue-600 mt-1" />
              <div className="ml-3 text-gray-600">(508) 555-0130</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              West Coast Office
            </h3>
            <div className="flex items-start mb-4">
              <MapPin className="h-5 w-5 text-blue-600 mt-1" />
              <div className="ml-3 text-gray-600">
                789 Innovation Drive
                <br />
                Palo Alto, CA 94301
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-blue-600 mt-1" />
              <div className="ml-3 text-gray-600">(650) 555-0140</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              European Office
            </h3>
            <div className="flex items-start mb-4">
              <MapPin className="h-5 w-5 text-blue-600 mt-1" />
              <div className="ml-3 text-gray-600">
                10 Science Square
                <br />
                Oxford, OX1 2JD
                <br />
                United Kingdom
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-blue-600 mt-1" />
              <div className="ml-3 text-gray-600">+44 (0)1865 555 0150</div>
            </div>
          </div>
        </div>
      </div>

      {/* Connect With Us */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Connect With Us
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Follow our work and join the conversation on our social media
          channels.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://twitter.com/researchorg"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
            <span className="ml-2">Twitter</span>
          </a>

          <a
            href="https://linkedin.com/company/researchorg"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span className="ml-2">LinkedIn</span>
          </a>

          <a
            href="https://youtube.com/researchorg"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="ml-2">YouTube</span>
          </a>

          <a
            href="https://researchblog.org"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <Globe className="h-8 w-8" />
            <span className="ml-2">Blog</span>
          </a>

          <a
            href="https://github.com/researchorg"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span className="ml-2">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
