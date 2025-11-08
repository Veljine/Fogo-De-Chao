export const siteConfig = {
     navItems: [
        {href: "/menu/new", label: "Menu"},
        {href: '/ingredients', label: 'Ingredients'},
        {href: '/about', label: 'About Us'}
    ],
    appInfo: {
        title: "Fogo de Chão Steakhouse",
        description: "Brazilian Steakhouse"
    },
    pagesContent: {
         "/": {
             content: ""
         },
        "/about": {
             content: `
             
                <section id="about-fogo" aria-labelledby="about-fogo-title" style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#1f2937; line-height:1.6;">
  <div style="max-width:980px; margin:48px auto; padding:28px; box-shadow:0 8px 30px rgba(31,41,55,0.06); border-radius:12px; background:linear-gradient(180deg,#ffffff,#fbfbfb);">
    <header style="display:flex; align-items:center; gap:18px; margin-bottom:18px;">
      <div style="width:72px; height:72px; border-radius:10px; background:#f3f4f6; display:flex; align-items:center; justify-content:center; font-weight:700; color:#111827;">
        FOGO
      </div>
      <div>
        <h1 id="about-fogo-title" style="margin:0; font-size:1.6rem; letter-spacing: -0.01em;">About Fogo de Chão</h1>
        <p style="margin:6px 0 0; color:#6b7280; font-size:0.95rem;">A story of churrasco, hospitality, and fire-roasted tradition.</p>
      </div>
    </header>

    <article>
      <p style="margin:0 0 16px;">
        Fogo de Chão was founded in <strong>1979</strong> in Porto Alegre, Brazil, by brothers <strong>Arri and Jair Coser</strong> along with their partners <strong>Jorge and Aleixo Ongaratto</strong>. The name “Fogo de Chão,” meaning <em>“fire on the ground”</em> in Portuguese, pays tribute to the traditional gaúcho style of roasting meats over open flames in southern Brazil. This centuries-old cooking technique—known as <strong>churrasco</strong>—became the heart of Fogo’s philosophy: to celebrate authentic Brazilian hospitality through fire-roasted meats, warm service, and a communal dining experience.
      </p>

      <p style="margin:0 0 16px;">
        After gaining popularity in Brazil, Fogo de Chão brought the art of churrasco to the United States, opening its first American restaurant in <strong>Dallas, Texas, in 1997</strong>. The concept quickly became a favorite among diners seeking a unique and interactive dining experience. Today, Fogo de Chão operates locations across the <strong>U.S., Brazil, Mexico, and the Middle East</strong>, continuing to share its southern Brazilian roots with guests around the world.
      </p>

      <p style="margin:0 0 16px;">
        At Fogo de Chão, guests enjoy the <strong>Full Rodízio Experience</strong>—a continuous tableside service of premium fire-roasted meats carved by gaucho chefs. Complementing the meats is the <strong>Market Table</strong>, featuring a vibrant selection of seasonal salads, fresh vegetables, charcuterie, and traditional Brazilian side dishes. Each element of the dining experience is designed to embody the warmth, generosity, and rhythm of Brazilian culture.
      </p>

      <p style="margin:0 0 16px;">
        Over the years, Fogo de Chão has evolved while staying true to its heritage. The menu now includes premium cuts such as dry-aged and Wagyu beef, an expanded bar program with crafted cocktails and wines, and new ways to enjoy churrasco through take-out, delivery, and special events. The brand’s elegant atmosphere and signature green-and-red service cards remain iconic symbols of the Fogo de Chão experience.
      </p>

      <p style="margin:0 0 4px;">
        Fogo de Chão’s dedication to quality and authenticity has made it a leader in Brazilian steakhouse dining. From its humble beginnings in southern Brazil to its presence in major cities around the world, Fogo continues to honor the tradition of the Brazilian gaucho—one perfectly fire-roasted cut at a time.
      </p>
    </article>

    <footer style="margin-top:20px; display:flex; gap:12px; align-items:center;">
      <a href="/" style="text-decoration:none; background:#111827; color:#fff; padding:10px 14px; border-radius:8px; font-weight:600; font-size:0.95rem;">View Menu</a>
      <a href="https://maps.app.goo.gl/cTQNHHbef6Eaj5QW6" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:#111827; padding:10px 14px; border-radius:8px; border:1px solid #e6e7ea; font-weight:600; font-size:0.95rem;">Find The Nearest Location</a>
      <span style="color:#6b7280; font-size:0.9rem; margin-left:auto;">Established 1979</span>
    </footer>
  </div>
</section>

             
             `
        },
        "/menu": {
             content: ""
        },
        "/ingredients": {
             content: ""
        }
    }
}