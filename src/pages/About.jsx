import React from "react";
import { Users, BookOpen, Globe, Award } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
          About Our Research Organization
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Dedicated to advancing scientific knowledge and developing innovative
          solutions for global challenges.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-8">
            Our organization is committed to conducting pioneering research that
            addresses critical challenges in [your specific field]. Through
            collaborative efforts and innovative methodologies, we aim to
            contribute knowledge that improves human understanding and creates
            positive impact.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
          <p className="text-lg text-gray-700">
            We envision a world where evidence-based research guides policy
            decisions, technological advancement, and social progress. By
            fostering an environment of academic excellence and inclusive
            collaboration, we strive to be at the forefront of discoveries that
            shape our future.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Academic Integrity</h3>
            <p className="text-gray-600">
              We uphold the highest standards of honesty, accuracy, and ethical
              conduct in all our research endeavors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Collaborative Innovation
            </h3>
            <p className="text-gray-600">
              We foster partnerships across disciplines and sectors to develop
              comprehensive solutions to complex problems.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Globe className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Perspective</h3>
            <p className="text-gray-600">
              We approach research with an inclusive, worldwide viewpoint,
              recognizing diverse insights and applications.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Award className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for distinction in all aspects of our work, from
              methodology to dissemination of findings.
            </p>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our History</h2>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 mb-4">
            Founded in [founding year], our organization began with a small team
            of dedicated researchers focused on [initial research focus]. Over
            the years, we have expanded our scope to address emerging challenges
            while maintaining our commitment to scientific excellence.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Through strategic partnerships with universities, industry leaders,
            and government agencies, we have successfully completed [number]
            major research initiatives that have influenced policy decisions and
            technological advancements.
          </p>
          <p className="text-lg text-gray-700">
            Today, with [number] researchers across [number] specialized
            departments, we continue to push the boundaries of knowledge in
            service of our mission.
          </p>
        </div>
      </div>

      {/* Team Introduction */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Leadership Team
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          Our organization is led by distinguished experts committed to
          advancing our research mission and fostering a culture of innovation.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team member cards would go here - just showing placeholder structure */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Dr. Jane Smith</h3>
              <p className="text-blue-600 font-medium mb-3">
                Executive Director
              </p>
              <p className="text-gray-600">
                Ph.D. in [Field] with over 20 years of research experience in
                [specialization].
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Dr. Michael Johnson</h3>
              <p className="text-blue-600 font-medium mb-3">
                Research Director
              </p>
              <p className="text-gray-600">
                Leading our efforts in [research area] with breakthrough
                publications in top journals.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Dr. Sarah Williams</h3>
              <p className="text-blue-600 font-medium mb-3">
                Head of Innovation
              </p>
              <p className="text-gray-600">
                Specializes in translating research findings into practical
                applications and policies.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="/team"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Meet Our Full Team
          </a>
        </div>
      </div>

      {/* Publications & Impact */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Impact</h2>
        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">100+</p>
              <p className="text-xl text-gray-700">
                Peer-reviewed Publications
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">25+</p>
              <p className="text-xl text-gray-700">Research Partnerships</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">12</p>
              <p className="text-xl text-gray-700">Major Grants Received</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/publications"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Explore Our Research Publications →
            </a>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-blue-700 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Interested in Collaborating?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          We're always looking for partners who share our vision and can
          contribute to our research initiatives.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100"
          >
            Contact Us
          </a>
          <a
            href="/partnerships"
            className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800"
          >
            Learn About Partnerships
          </a>
        </div>
      </div>
    </div>
  );
}
