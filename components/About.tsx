import React from "react";

import {
  FaCar,
  FaUsers,
  FaShieldAlt,
  FaAward,
  FaHandshake,
  FaStar,
} from "react-icons/fa";

const About = () => {
  const stats = [
    { number: "500+", label: "Cars Sold", icon: FaCar },
    { number: "1000+", label: "Happy Customers", icon: FaUsers },
    { number: "5+", label: "Years Experience", icon: FaAward },
    { number: "98%", label: "Satisfaction Rate", icon: FaStar },
  ];

  const values = [
    {
      icon: FaShieldAlt,
      title: "Trust & Integrity",
      description:
        "We prioritize transparency and honesty in all our dealings, ensuring you get exactly what you expect.",
    },
    {
      icon: FaHandshake,
      title: "Customer First",
      description:
        "Your satisfaction is our top priority. We go above and beyond to meet your automotive needs.",
    },
    {
      icon: FaCar,
      title: "Quality Assurance",
      description:
        "Every vehicle in our inventory undergoes rigorous inspection to guarantee quality and reliability.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-heading font-bold mb-6">
            About Simba Motors
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Kenya's premier car dealership, dedicated to providing exceptional
            vehicles and outstanding customer service for over 5 years.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <Icon className="text-primary-600 text-2xl" />
                  </div>
                  <div className="text-3xl font-bold text-neutral-800 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-neutral-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-center text-neutral-800 mb-8">
              Our Story
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  Founded in 2019, Simba Motors began with a simple mission: to
                  make quality vehicles accessible to every Kenyan driver. What
                  started as a small showroom has grown into one of Kenya's most
                  trusted car dealerships.
                </p>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  Our name "Simba" reflects our pride in Kenyan heritage and our
                  commitment to being the king of car dealerships. We believe
                  that everyone deserves a reliable vehicle that fits their
                  lifestyle and budget.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Today, we continue to uphold the highest standards of customer
                  service, vehicle quality, and business integrity that have
                  made us a leader in the automotive industry.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-soft p-8">
                <h3 className="text-2xl font-semibold text-neutral-800 mb-4">
                  Why Choose Simba Motors?
                </h3>
                <ul className="space-y-3 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Comprehensive vehicle inspection and warranty</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Competitive financing options available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Expert staff with years of automotive experience
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>After-sales support and maintenance services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-neutral-800 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Simba Motors
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-100 rounded-full mb-6">
                    <Icon className="text-accent-600 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our extensive collection of quality vehicles and experience
            the Simba Motors difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors"
            >
              Browse Cars
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
