import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <article>
        <section className="hero">
          <div className="hero-img">
            <Image
              src="/teddy_present.png"
              alt="illustration of a teddy bear sitting by a present"
              fill
            />
          </div>
          <div
            className="wrapper text center"
            style={{ backgroundColor: "var(--bg-body)" }}
          >
            <h1>
              Välkomna till <span className="magic-effect">Frej's</span>{" "}
              Födelse&shy;dags&shy;kalas
            </h1>
            <p>
              Vi bjuder in till att fira ett år fyllt av glädje, skratt och
              kärlek. Frej har spridit så mycket lycka omkring sig under detta
              första magiska år, och vi kan knappt vänta med att dela den här
              speciella dagen tillsammans med er alla. Hjälp oss fira framsteg,
              första leenden, små steg och alla de stora stunderna som gör att
              vi känner oss så stolta som föräldrar.
            </p>
            <p>
              Så ta en ballong, njut av lite festligt fika och låt oss
              tillsammans skapa ännu fler värdefulla minnen att bevara för
              alltid.
            </p>
          </div>
        </section>
        <section className="bg-secondary details">
          <div className="half">
            <h2 className="subheading">När</h2>
            <h3>2021-10-16</h3>
            <h3>kl. 14:00 - 17:00</h3>
          </div>
          <div className="half">
            <h2 className="subheading">Var</h2>
            <h3>Zenithgatan 52</h3>
          </div>
          <p>
            Vi kommer att vara utomhus så kläder efter väder. Det kommer att
            finnas möjlighet att värma sig vid en brasa.
          </p>
        </section>
      </article>
      {/* <footer>
        <div className="footer">
          <Image
            src="/hot_air_balloon.png"
            alt="digital illustration of a hot air balloon over a valley"
            fill
          />
        </div>
      </footer> */}
    </main>
  );
}
