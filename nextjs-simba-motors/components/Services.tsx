import React from "react";

import {
  FaCar,
  FaTools,
  FaHandshake,
  FaCreditCard,
  FaShieldAlt,
  FaHeadset,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: FaCar,
      title: "Car Sales",
      description:
        "Wide selection of new and pre-owned vehicles from top brands",
      features: [
        "Comprehensive vehicle inspection",
        "Price matching guarantee",
        "Test drive availability",
        "Extended warranty options",
      ],
    },
    {
      icon: FaTools,
      title: "Maintenance & Repair",
      description: "Professional automotive maintenance and repair services",
      features: [
        "Scheduled maintenance",
        "Emergency repairs",
        "Genuine parts replacement",
        "Diagnostic services",
      ],
    },
    {
      icon: FaHandshake,
      title: "Trade-In Services",
      description: "Fair and transparent vehicle trade-in valuations",
      features: [
        "Free vehicle appraisal",
        "Competitive trade-in values",
        "Quick processing",
        "No-obligation quotes",
      ],
    },
    {
      icon: FaCreditCard,
      title: "Financing Solutions",
      description: "Flexible financing options to fit your budget",
      features: [
        "Low interest rates",
        "Flexible repayment terms",
        "Quick approval process",
        "Multiple financing partners",
      ],
    },
    {
      icon: FaShieldAlt,
      title: "Warranty & Insurance",
      description: "Comprehensive protection for your vehicle investment",
      features: [
        "Extended warranty plans",
        "Insurance brokerage",
        "Roadside assistance",
        "Gap insurance coverage",
      ],
    },
    {
      icon: FaHeadset,
      title: "Customer Support",
      description: "Dedicated support team available to assist you",
      features: [
        "24/7 customer service",
        "Online booking system",
        "Emergency assistance",
        "Follow-up support",
      ],
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Choose Your Vehicle",
      description:
        "Browse our extensive inventory or contact us to find your perfect match.",
    },
    {
      step: "02",
      title: "Vehicle Inspection",
      description:
        "Our experts perform comprehensive checks to ensure quality and safety.",
    },
    {
      step: "03",
      title: "Documentation & Paperwork",
      description:
        "We handle all legal requirements and paperwork efficiently.",
    },
    {
      step: "04",
      title: "Final Delivery",
      description:
        "Take delivery of your vehicle with full orientation and support.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-heading font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            From car sales to comprehensive after-sales support, we provide
            end-to-end automotive solutions tailored to your needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-neutral-800 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Comprehensive automotive services designed to meet all your
              vehicle needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-neutral-50 rounded-xl p-8 hover:shadow-soft transition-shadow border border-neutral-200"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-6">
                    <Icon className="text-primary-600 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-800 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3 text-neutral-600"
                      >
                        <FaCheckCircle className="text-accent-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-neutral-800 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Simple, transparent steps to get you on the road with confidence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white text-xl font-bold rounded-full mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-200 -translate-x-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-neutral-800 mb-4">
                Why Choose Simba Motors?
              </h2>
              <p className="text-xl text-neutral-600">
                Experience the difference with our commitment to excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      Quality Assurance
                    </h3>
                    <p className="text-neutral-600">
                      Every vehicle undergoes rigorous inspection and testing
                      before delivery.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      Transparent Pricing
                    </h3>
                    <p className="text-neutral-600">
                      No hidden fees or surprise charges. Clear, competitive
                      pricing on all services.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      Expert Team
                    </h3>
                    <p className="text-neutral-600">
                      Our experienced professionals provide knowledgeable
                      guidance and support.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      After-Sales Support
                    </h3>
                    <p className="text-neutral-600">
                      Comprehensive support and maintenance services long after
                      your purchase.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      Flexible Financing
                    </h3>
                    <p className="text-neutral-600">
                      Work with our financial partners to find the perfect
                      payment plan for you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      Customer Satisfaction
                    </h3>
                    <p className="text-neutral-600">
                      Your happiness is our priority. We strive for 100%
                      customer satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready to Experience Our Services?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about how we can help you with your
            automotive needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
            >
              Get Started
              <FaArrowRight />
            </a>
            <a
              href="/"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Browse Cars
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
