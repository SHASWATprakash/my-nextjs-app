// pages/index.js
import Head from 'next/head';
import Roadmap from '../components/Roadmap';
import Carousel from '../components/Carousel';

export default function Home() {
  return (
    <div>
      <Head>
        <title>FrontEnd Developer Assignment</title>
        <meta name="description" content="Interactive Roadmap and Custom Carousel" />
      </Head>
      <main>
        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>
          FrontEnd Developer Assignment
        </h1>
        <section>
          <Roadmap />
        </section>
        <section style={{ margin: '2rem 0' }}>
          <Carousel />
        </section>
      </main>
    </div>
  );
}
