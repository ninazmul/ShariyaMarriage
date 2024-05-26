import CallToAction from "../Components/CallToAction";

const About = () => {
  return (
    <div className="min-h-screen p-4 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl lg:text-4xl mt-5 font-semibold font-serif text-center pb-8">
          About Shariya Marriage
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl mt-5 font-semibold font-serif text-start pb-4">
            Who We Are
          </h2>
          <p className="text-justify text-lg leading-relaxed ">
            Shariya Marriage is a dedicated online platform connecting individuals
            seeking meaningful and faith-based marriages. Our mission is to
            create a safe and respectful environment where individuals can find
            their life partners guided by the principles of faith and mutual
            respect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mt-5 font-semibold font-serif text-start pb-4">
            Our Vision
          </h2>
          <p className="text-justify text-lg leading-relaxed ">
            We envision a community where marriage is built on the foundations
            of trust, faith, and shared values. Shariya Marriage aims to support
            individuals in forming strong, faith-centered marriages that
            contribute to the well-being of the broader community.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mt-5 font-semibold font-serif text-start pb-4">
            Our Mission
          </h2>
          <p className="text-justify text-xl pb-2 font-semibold ">
            Our mission is to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-lg ">
            <li>
              Facilitate Connections: Help individuals find compatible life
              partners who share their faith and values.
            </li>
            <li>
              Ensure Safety: Provide a secure platform for users to interact and
              build relationships based on trust.
            </li>
            <li>
              Promote Education: Offer resources and guidance on building
              successful, faith-based marriages.
            </li>
            <li>
              Foster Community: Create a supportive community where members can
              share experiences and advice.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mt-5 font-semibold font-serif text-start pb-4">
            What We Offer
          </h2>
          <p className="text-justify text-xl pb-2 ">
            Shariya Marriage provides a variety of features to assist you on your
            journey:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-lg ">
            <li>
              Comprehensive Profiles: Detailed profiles to help you find the
              right match.
            </li>
            <li>Secure Messaging: Safe and private communication tools.</li>
            <li>
              Matchmaking Assistance: Personalized matchmaking services to
              connect you with potential partners.
            </li>
            <li>
              Educational Resources: Articles, webinars, and workshops on
              marriage and relationships.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mt-5 font-semibold font-serif text-start pb-4">
            How We Work
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-lg ">
            <li>
              Sign Up: Create a detailed profile and share your preferences.
            </li>
            <li>
              Search & Connect: Browse profiles and connect with potential
              matches.
            </li>
            <li>
              Engage: Use our secure messaging to get to know your matches
              better.
            </li>
            <li>
              Learn & Grow: Access our resources to prepare for a successful
              marriage.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mt-5 font-semibold font-serif text-start pb-4">
            Join Us
          </h2>
          <p className="text-justify text-lg leading-relaxed ">
            Start your journey towards a blessed union today. Whether you’re
            ready to find your partner or looking to learn more about
            faith-based marriages, Shariya Marriage is here to support you every step of
            the way. Join our community and discover the path to a meaningful
            marriage.
          </p>
          <CallToAction />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mt-5 font-semibold font-serif text-start pb-4">
            Contact Us
          </h2>
          <p className="text-justify text-xl pb-2 ">
            If you have any questions or need assistance, please reach out to us
            at:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-lg ">
            <li>Email: support@shariya.com</li>
            <li>Phone: +1234567890</li>
            <li>Address: 123 Marriage Street, Faith City, Country.</li>
          </ul>
        </section>

        <section className="mb-8">
          <p className="text-justify text-xl py-2 ">
            Follow us on social media to stay updated on our latest features and
            success stories:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-lg ">
            <li>Facebook: https://www.facebook.com/ShariyaMarriage</li>
            <li>Twitter: https://twitter.com/ShariyaMarriage</li>
            <li>Instagram: https://www.instagram.com/shariya_marriage</li>
          </ul>
        </section>

        <p className="text-center text-xl py-4 ">
          Join Shariya Marriage and find your path to a faithful, loving, and lasting
          marriage!
        </p>
      </div>
    </div>
  );
};

export default About;
