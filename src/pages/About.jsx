import React from "react";
import { Users, BookOpen, Globe, Award, Heart, Shield, TreePine, Target } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
          Institute for Democracy and Sustainability (IDS)
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Committed to upholding the right to space of marginal and vulnerable urban dwellers 
          and ensuring their inclusion in urban democratic processes.
        </p>
      </div>

      {/* Vision & Ideology */}
      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
          <p className="text-lg text-gray-700 mb-8">
            We envision a society based on equity, equality, justice and non-violence wherein 
            human rights are revered and all developmental processes proceed in a democratic 
            and sustainable manner.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Ideology</h2>
          <p className="text-lg text-gray-700 mb-4">
            We believe that, in the name of development, our society is experiencing a 
            degradation of its life support systems. The process of "development" suffers from 
            a lack of contextual thought and a disregard of the long-term vision of sustainable 
            development. There is a need to prevent, arrest and restrain this degradation.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The profile of society in general, and democracy in particular is changing due to 
            a continuous exodus of poor people from the villages to the cities looking for 
            employment opportunities in the informal sector such as cycle rickshaw pullers, 
            cyclists, pedestrians, domestic workers, street vendors, waste pickers, and 
            industrial labourers.
          </p>
          <p className="text-lg text-gray-700">
            We, at the IDS, are committed to upholding RIGHT TO SPACE of Marginal and 
            Vulnerable Urban dwellers and ensuring their inclusion in the urban democratic 
            processes.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Our Focus Areas
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Right to Space</h3>
            <p className="text-gray-600">
              Upholding the right to space of marginal and vulnerable urban dwellers 
              in democratic processes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <TreePine className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Sustainable Transportation
            </h3>
            <p className="text-gray-600">
              Supporting non-polluting and people-friendly modes of transportation 
              like cycles, rickshaws, and pedestrians.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Migrant Workers</h3>
            <p className="text-gray-600">
              Advocating for the rights and dignity of migrant workers and 
              informal sector employees.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Social Justice</h3>
            <p className="text-gray-600">
              Promoting equity, equality, justice and non-violence in all 
              developmental processes.
            </p>
          </div>
        </div>
      </div>

      {/* Objective Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Objective</h2>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 mb-4">
            Our objective is to help, aid, assist, arrange, contribute, finance, 
            coordinate, organize, maintain and carry out democratic, sustainable and 
            general welfare activities connected with the health, education, culture 
            and upliftment of all the people, with special focus on every kind of 
            human labor.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The long term goal of the institute is to generate awareness in the society 
            about the shortcomings of the current developmental practices, with regard 
            to sustainability and democracy.
          </p>
          <p className="text-lg text-gray-700">
            Our experience, over the past few years, has led us to understand that 
            transportation can be a major enabling or disabling factor for survival 
            in the urban or rural context. Issues of shelter, livelihood and services 
            are linked to and linked by the transport infrastructure in the city or village.
          </p>
        </div>
      </div>

      {/* Strategy Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Our Strategy
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          We believe that for the successful achievement of our goals we need to apply, 
          and balance between, the academic and the activist approaches of tackling 
          grass-root level problems.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold mb-6 text-blue-600">Academic Approach</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Research on different aspects of social development, highlighting the dis-benefits of "development" to the poor
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Preparation of dissemination material in audio-visual form, like video, plays, exhibitions
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Publication of monographs, books, pamphlets, newsletters
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Formulation of Democracy and Sustainable Development study programs
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Conducting seminars, conferences and workshops
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold mb-6 text-blue-600">Activist Approach</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Formation of thematic organizations on activities such as democratic understanding, legal awakening, sustainable urban transportation
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Networking of individuals, groups and organizations working on similar issues
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Promotion and aid of health centers and de-addiction centers for migrant workers
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Liaisoning with government organizations for poverty alleviation schemes
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Providing legal assistance to the poor and those seeking to correct wrongs against human rights
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Governing Board */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Governing Board Members
        </h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Mahesh Kumar Gaur</h3>
              <p className="text-blue-600 font-medium">Chairperson</p>
            </div>
            <div className="text-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Rajendra Ravi</h3>
              <p className="text-blue-600 font-medium">Director</p>
            </div>
            <div className="text-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Geeta Ravikirti</h3>
              <p className="text-blue-600 font-medium">Treasurer</p>
            </div>
            <div className="text-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Mamta</h3>
              <p className="text-blue-600 font-medium">Member</p>
            </div>
            <div className="text-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Tarun Kanti Bose</h3>
              <p className="text-blue-600 font-medium">Member</p>
            </div>
            <div className="text-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Suraj Kumar</h3>
              <p className="text-blue-600 font-medium">Member</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold text-gray-900">Basant Kumar Hetamsaria</h3>
              <p className="text-blue-600 font-medium">Member</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-blue-700 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Join Our Movement for Democracy and Sustainability
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          We're always looking for partners who share our vision of equity, equality, 
          justice and non-violence in developmental processes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100"
          >
            Contact Us
          </a>
          <a
            href="/team"
            className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800"
          >
            Learn About Our Work
          </a>
        </div>
      </div>
    </div>
  );
}
