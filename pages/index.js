import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IndexCard from "../components/IndexCard";
import NewsletterSignup from "../components/NewsletterSignup";
import {
  Container,
  SingleColumn,
  Section,
  TwoUp,
  formatDate,
  generateDisplayDate,
  getAllPosts,
} from "@urbit/foundation-design-system";
import Link from "next/link";
import {
  Comms,
  Ringsig,
  Squad,
  Database,
  Distribution,
  Functional,
  Identity,
  Interface,
  Peer,
} from "../components/icons";
import Card from "../components/Card";
import TallCard from "../components/TallCard";
import HoonIcon from "../components/icons/TallCard/hoon";
import AppIcon from "../components/icons/TallCard/app";
import Meta from "../components/Meta";
import HighlightCard from "../components/HighlightCard";

export default function Home({ search, posts, highlights }) {

  const post = {
    title: "Urbit Developers",
    description: "Discover the creative possibilities of a unified operating system.",
    image: "https://storage.googleapis.com/media.urbit.org/site/opengraph/developers.png"
  };

  return (
    <div>
      <Head>
        <title>Urbit Developers</title>
        {Meta(post, false, true)}
      </Head>
      <Container>
        <Header search={search} />
        <SingleColumn>
          <Section className="pb-36">
            {/* Hero statement */}
            <div className="flex flex-col space-y-4">
              <h1 className="max-w-prose">
                Discover the creative possibilities of a unified operating
                system.
              </h1>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pt-4">
                <Link href="/guides/quickstart/intro" passHref>
                  <a className="button-lg bg-green-400 text-white">
                    Quickstart
                  </a>
                </Link>
                <Link href="/overview" passHref>
                  <a className="button-lg bg-blue-400 text-white">
                    Read the Overview
                  </a>
                </Link>
                <Link href="/guides" passHref>
                  <a className="button-lg bg-white border-wall-500 border-2">
                    Learn the Stack
                  </a>
                </Link>
              </div>
            </div>
          </Section>

          <Section short>
            <h2 className="font-normal">
              Urbit provides{" "}
              <span className="font-bold">foundational primitives</span> at the
              operating system layer, serving as a better platform for building{" "}
              <span className="font-bold">
                networked, decentralized applications
              </span>
              .
            </h2>
            <div className="flex flex-wrap pt-12">
              {pitch.map((each) => {
                return (
                  <div
                    key={each.title}
                    className="basis-full md:basis-1/2 xl:basis-1/3 flex space-x-2 justify-start items-start my-8 pr-8"
                  >
                    {each.icon}
                    <div className="flex flex-col">
                      <p className="font-bold text-sm">{each.title}</p>
                      <p className="text-sm">{each.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pt-12">
              <h3 className="max-w-prose font-normal">
                Thanks to this architecture, you can take software into
                production within weeks rather than months.
              </h3>
            </div>
          </Section>
          <Section>
            <h2 className="pt-12">Quickstart: Lightning Tutorials</h2>
            <p className="pt-12 text-lg">Jump right in and build an app in under a half hour.</p>
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8 pt-12">
              <Card
                icon={<Squad />}
                title="Groups Application"
                text="Build an app to create public or private groups"
                className="basis-1/2"
                href="/guides/quickstart/groups-guide"
              />
              <Card
                icon={<Comms />}
                title="Encrypted Chat Application"
                text="Build your own secure comms tool"
                className="basis-1/2"
                href="/guides/quickstart/chat-guide"
              />
            </div>
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8 pt-8">
              <Card
                icon={<Ringsig />}
                title="Ring Signature Voting App"
                text="Build an anonymous voting app for groups"
                className="basis-1/2"
                href="/guides/quickstart/voting-guide"
              />
              <div className="basis-1/2" />
            </div>
          </Section>
          <Section className="flex flex-col space-y-12">
            <h2>Guides</h2>
            <p className="text-lg max-w-prose">
              Learn the foundations of software development on Urbit with our
              core curriculum of guides and workbooks.
            </p>
            <TwoUp>
              <TallCard
                title="Hoon School"
                description="Learn the fundamentals of the Hoon programming language"
                callout="View Guide"
                href="/guides/core/hoon-school"
                image="https://storage.googleapis.com/media.urbit.org/developers/images/hoon-school.svg"
                className="h-full"
              />
              <TallCard
                title="App School"
                description="Learn how to build Urbit userspace applications by writing your own Gall agents"
                callout="View Guide"
                href="/guides/core/app-school"
                image="https://storage.googleapis.com/media.urbit.org/developers/images/app-school.svg"
                className="h-full"
              />
            </TwoUp>
            <Link href="/guides" passHref>
              <a className="button-lg bg-wall-600 text-white w-fit">
                View All Guides
              </a>
            </Link>
          </Section>
          <Section narrow>
            <div className="measure">
              <h2 className="pb-2">[battery payload]</h2>
              <p className="pb-6">The Urbit Developer Newsletter</p>
            </div>
            <NewsletterSignup />
            <p className="pt-6">
              Get monthly developer news on releases, applications, events, and&nbsp;more.
            </p>
          </Section>
        </SingleColumn>
        <Footer />
      </Container>
    </div>
  );
}

const pitch = [
  {
    icon: <Identity className="shrink-0" />,
    title: "Identity",
    content:
      "Identity is built-in at the lowest level of the stack – say goodbye to auth systems.",
  },
  {
    icon: <Functional className="shrink-0" />,
    title: "Functional Network",
    content:
      "Immutable, functional programming across the entire OS and network",
  },
  {
    icon: <Database className="shrink-0" />,
    title: "Built-in Database",
    content: "Every piece of state in your application is persistent, always",
  },
  {
    icon: <Peer className="shrink-0" />,
    title: "Peer-to-Peer Applications",
    content: "Urbit makes robust peer-to-peer applications easy to build",
  },
  {
    icon: <Distribution className="shrink-0" />,
    title: "Open Distribution",
    content:
      "Distribute software directly to users — you are your own app store",
  },
  {
    icon: <Interface className="shrink-0" />,
    title: "Web Interfaces",
    content:
      "Urbit applications can be built on any interface framework, including the web",
  },
];



export async function getStaticProps() {

  // Highlights
  const highlights = getAllPosts(
    ["title", "slug", "image", "url", "description"],
    "highlights"
  );

  const posts = getAllPosts(
    ["title", "slug", "date", "description", "extra"],
    "blog",
    "date"
  );
  return {
    props: {
      posts,
      highlights
    },
  };
}
