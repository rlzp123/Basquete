import { db } from "@/db";
import { sql } from "drizzle-orm";
import { products, teams, players, games, news } from "@/db/schema";

const P = "/images/products";
const PX = (id: number | string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

export const IMG = {
  ballCourt: PX(6076409),
  ballHand: PX(1462618),
  ballNba: PX(12954255),
  ballIndoor: PX(36330545),
  dribble: PX(8084765),
  ballGreen: PX(12954258),
  jerseyBlue: PX(32371318),
  player13: PX(31747054),
  shotOutdoor: PX(37080042),
  playerBlue: PX(20872635),
  indoorGame: "https://images.pexels.com/photos/159611/basketball-player-game-sport-159611.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  outdoorGame: PX(32600343),
  groupGame: PX(32352232),
  playerShot: PX(27499643),
};

const productSeed = [
  { slug: "backboard-pro-basketball", name: "Backboard Pro Basketball", category: "Bolas", price: "199.90", salePrice: null, rating: "4.9", reviews: 312, images: [`${P}/ball.jpg`, IMG.ballIndoor, IMG.ballHand], sizes: ["6", "7"], featured: true, badge: "Mais vendido", description: "Bola oficial Backboard Pro com couro composto de alta aderência, canais profundos e retenção de ar superior. Desenvolvida para quadras indoor e outdoor, entrega controle absoluto em cada drible e arremesso." },
  { slug: "backboard-elite-jersey", name: "Backboard Elite Jersey", category: "Camisetas", price: "249.90", salePrice: null, rating: "4.8", reviews: 187, images: [`${P}/jersey.jpg`, IMG.jerseyBlue, IMG.player13], sizes: ["P", "M", "G", "GG", "XG"], featured: true, badge: "Novo", description: "Regata Elite com tecido DryCourt de secagem rápida, recortes a laser para ventilação e numeração termocolada. Leveza e performance para dominar o garrafão." },
  { slug: "court-vision-basketball-shoes", name: "Court Vision Basketball Shoes", category: "Tênis", price: "499.90", salePrice: "449.90", rating: "4.9", reviews: 428, images: [`${P}/shoes.jpg`, IMG.dribble, IMG.shotOutdoor], sizes: ["38", "39", "40", "41", "42", "43", "44"], featured: true, badge: "-10%", description: "Tênis de cano alto com amortecimento responsivo AirCourt, solado de tração multidirecional e travamento de tornozelo. Explosão e estabilidade a cada corte." },
  { slug: "street-dunk-shorts", name: "Street Dunk Shorts", category: "Shorts", price: "129.90", salePrice: null, rating: "4.7", reviews: 96, images: [`${P}/shorts.jpg`, IMG.outdoorGame], sizes: ["P", "M", "G", "GG"], featured: true, badge: null, description: "Shorts de basquete com cós elástico, bolsos laterais com zíper e tecido leve e respirável. Estilo de rua com performance de quadra." },
  { slug: "backboard-snapback-cap", name: "Backboard Snapback Cap", category: "Bonés", price: "89.90", salePrice: "69.90", rating: "4.6", reviews: 54, images: [`${P}/cap.jpg`], sizes: ["Único"], featured: true, badge: "Oferta", description: "Boné snapback com aba reta, logo bordado em alto-relevo e ajuste traseiro. O acessório indispensável dentro e fora das quadras." },
  { slug: "arena-pro-backpack", name: "Arena Pro Backpack", category: "Mochilas", price: "299.90", salePrice: null, rating: "4.8", reviews: 73, images: [`${P}/backpack.jpg`], sizes: ["Único"], featured: false, badge: null, description: "Mochila com compartimento exclusivo para bola, bolso ventilado para tênis, porta-notebook acolchoado e tecido impermeável." },
  { slug: "grip-pack-accessories", name: "Grip Pack – Sleeve + Munhequeiras", category: "Acessórios", price: "79.90", salePrice: null, rating: "4.5", reviews: 41, images: [`${P}/accessories.jpg`], sizes: ["P/M", "G/GG"], featured: true, badge: null, description: "Kit com arm sleeve compressivo, par de munhequeiras e headband em tecido tecnológico com absorção de suor." },
  { slug: "legends-mini-ball-collectible", name: "Legends Mini Ball – Edição Colecionável", category: "Colecionáveis", price: "349.90", salePrice: null, rating: "5.0", reviews: 22, images: [`${P}/collectible.jpg`], sizes: ["Único"], featured: true, badge: "Limitado", description: "Mini bola numerada em estojo de acrílico com iluminação LED e card autenticado. Apenas 500 unidades produzidas." },
  { slug: "backboard-outdoor-ball", name: "Backboard Outdoor Rubber Ball", category: "Bolas", price: "119.90", salePrice: "99.90", rating: "4.6", reviews: 210, images: [IMG.ballCourt, IMG.ballGreen], sizes: ["5", "6", "7"], featured: false, badge: "Oferta", description: "Bola de borracha resistente para asfalto e cimento, com grip reforçado e durabilidade extrema para o jogo de rua." },
  { slug: "backboard-city-jersey", name: "Backboard City Edition Jersey", category: "Camisetas", price: "279.90", salePrice: null, rating: "4.7", reviews: 64, images: [IMG.playerBlue, IMG.playerShot], sizes: ["P", "M", "G", "GG"], featured: false, badge: "Novo", description: "Edição especial inspirada nas quadras urbanas, com gráficos exclusivos e tecido premium respirável." },
  { slug: "fast-break-low-shoes", name: "Fast Break Low", category: "Tênis", price: "399.90", salePrice: null, rating: "4.6", reviews: 138, images: [IMG.shotOutdoor, IMG.groupGame], sizes: ["38", "39", "40", "41", "42", "43"], featured: false, badge: null, description: "Cano baixo ultraleve para armadores velozes. Solado de borracha translúcida e cabedal em mesh engenheirado." },
  { slug: "warmup-training-shorts", name: "Warm-Up Training Shorts", category: "Shorts", price: "109.90", salePrice: "89.90", rating: "4.4", reviews: 37, images: [IMG.indoorGame], sizes: ["P", "M", "G", "GG"], featured: false, badge: "Oferta", description: "Shorts de treino com tecido elástico em quatro direções e forro interno. Liberdade total de movimento." },
];

const teamSeed = [
  { slug: "los-angeles-lakers", name: "Los Angeles Lakers", short: "LAL", city: "Los Angeles", country: "Estados Unidos", competition: "NBA", color: "#552583", founded: 1947, arena: "Crypto.com Arena", coach: "JJ Redick", titles: 17, description: "Uma das franquias mais vitoriosas da história, os Lakers são sinônimo de glamour, dinastias e lendas como Magic, Kobe e LeBron." },
  { slug: "boston-celtics", name: "Boston Celtics", short: "BOS", city: "Boston", country: "Estados Unidos", competition: "NBA", color: "#007A33", founded: 1946, arena: "TD Garden", coach: "Joe Mazzulla", titles: 18, description: "Recordistas de títulos da NBA, os Celtics carregam a tradição do verde e a cultura de vitória construída por Bill Russell e Larry Bird." },
  { slug: "golden-state-warriors", name: "Golden State Warriors", short: "GSW", city: "San Francisco", country: "Estados Unidos", competition: "NBA", color: "#1D428A", founded: 1946, arena: "Chase Center", coach: "Steve Kerr", titles: 7, description: "Os Warriors revolucionaram o basquete moderno com o arremesso de três pontos e a dinastia liderada por Stephen Curry." },
  { slug: "phoenix-suns", name: "Phoenix Suns", short: "PHX", city: "Phoenix", country: "Estados Unidos", competition: "NBA", color: "#E56020", founded: 1968, arena: "Footprint Center", coach: "Jordan Ott", titles: 0, description: "Time de ataque veloz e torcida apaixonada, os Suns buscam o primeiro título com um elenco estrelado." },
  { slug: "milwaukee-bucks", name: "Milwaukee Bucks", short: "MIL", city: "Milwaukee", country: "Estados Unidos", competition: "NBA", color: "#00471B", founded: 1968, arena: "Fiserv Forum", coach: "Doc Rivers", titles: 2, description: "Liderados por Giannis Antetokounmpo, os Bucks combinam força física e intensidade defensiva." },
  { slug: "denver-nuggets", name: "Denver Nuggets", short: "DEN", city: "Denver", country: "Estados Unidos", competition: "NBA", color: "#0E2240", founded: 1967, arena: "Ball Arena", coach: "David Adelman", titles: 1, description: "Campeões de 2023 com o genial Nikola Jokić, os Nuggets jogam o basquete coletivo mais bonito da liga." },
  { slug: "flamengo", name: "Flamengo Basquete", short: "FLA", city: "Rio de Janeiro", country: "Brasil", competition: "NBB", color: "#C3281E", founded: 1919, arena: "Ginásio do Maracanãzinho", coach: "Gustavo de Conti", titles: 9, description: "Maior campeão do NBB e campeão intercontinental, o Flamengo é a potência do basquete brasileiro." },
  { slug: "franca", name: "Sesi Franca", short: "FRA", city: "Franca", country: "Brasil", competition: "NBB", color: "#1F4E9C", founded: 1959, arena: "Ginásio Pedrocão", coach: "Helinho", titles: 5, description: "A capital do basquete brasileiro respira o esporte. Franca é tradição, formação de talentos e títulos." },
  { slug: "minas", name: "Minas Tênis Clube", short: "MIN", city: "Belo Horizonte", country: "Brasil", competition: "NBB", color: "#0B5394", founded: 1935, arena: "Arena UniBH", coach: "Léo Costa", titles: 1, description: "Com projeto sólido e base forte, o Minas se consolidou entre os grandes do basquete nacional." },
  { slug: "sao-paulo", name: "São Paulo FC Basquete", short: "SPO", city: "São Paulo", country: "Brasil", competition: "NBB", color: "#B3122B", founded: 2018, arena: "Ginásio do Morumbi", coach: "Bruno Savignani", titles: 1, description: "O Tricolor retornou ao basquete de alto nível e rapidamente se tornou protagonista do NBB." },
  { slug: "real-madrid", name: "Real Madrid Baloncesto", short: "RMB", city: "Madrid", country: "Espanha", competition: "EuroLeague", color: "#FEBE10", founded: 1931, arena: "WiZink Center", coach: "Sergio Scariolo", titles: 11, description: "O clube mais vencedor da Europa, com uma coleção de títulos continentais incomparável." },
  { slug: "panathinaikos", name: "Panathinaikos", short: "PAO", city: "Atenas", country: "Grécia", competition: "EuroLeague", color: "#0B6E4F", founded: 1919, arena: "OAKA Arena", coach: "Ergin Ataman", titles: 7, description: "Atmosfera vulcânica em Atenas e tradição de conquistas europeias fazem do Panathinaikos um gigante." },
];

const firstNames = ["Marcus", "Jalen", "André", "Lucas", "Devin", "Tyrese", "Rafael", "Kobe", "Darius", "Bruno", "Nikola", "Luka"];
const lastNames = ["Silva", "Johnson", "Williams", "Costa", "Brown", "Petrović", "Santos", "Davis", "Martins", "Thompson", "Garcia", "Mitchell"];
const positions = ["Armador", "Ala-armador", "Ala", "Ala-pivô", "Pivô", "Armador", "Ala", "Pivô"];

function playersFor(teamIdx: number, teamId: number) {
  return positions.map((pos, i) => ({
    teamId,
    name: `${firstNames[(teamIdx + i) % 12]} ${lastNames[(teamIdx * 3 + i) % 12]}`,
    number: ((teamIdx * 7 + i * 5) % 45) + 1,
    position: pos,
    height: `${(190 + ((teamIdx + i * 3) % 22)) / 100}m`.replace(".", ","),
    age: 20 + ((teamIdx * 5 + i * 3) % 15),
  }));
}

function at(dayOffset: number, hour: number, minute = 0) {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  d.setDate(d.getDate() + dayOffset);
  return d;
}

const g = globalThis as typeof globalThis & { __bbSeeded?: boolean; __bbSeeding?: Promise<void> };

export async function ensureSeeded() {
  if (g.__bbSeeded) return;
  if (!g.__bbSeeding) {
    g.__bbSeeding = seedWithLock()
      .then(() => { g.__bbSeeded = true; })
      .finally(() => { g.__bbSeeding = undefined; });
  }
  return g.__bbSeeding;
}

async function seedWithLock() {
  await db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(84512026)`);
    const [{ count }] = await tx.select({ count: sql<number>`count(*)::int` }).from(products);
    if (count > 0) return;
    await runSeed(tx);
  });
}

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

async function runSeed(db: Tx) {
  await db.insert(products).values(productSeed);
  const insertedTeams = await db.insert(teams).values(teamSeed).returning({ id: teams.id, slug: teams.slug });
  const id = (slug: string) => insertedTeams.find((t) => t.slug === slug)!.id;

  await db.insert(players).values(insertedTeams.flatMap((t, i) => playersFor(i, t.id)));

  await db.insert(games).values([
    // finished
    { homeTeamId: id("los-angeles-lakers"), awayTeamId: id("boston-celtics"), competition: "NBA", startsAt: at(-1, 21, 30), status: "finished", homeScore: 112, awayScore: 108, venue: "Crypto.com Arena" },
    { homeTeamId: id("golden-state-warriors"), awayTeamId: id("phoenix-suns"), competition: "NBA", startsAt: at(-1, 23, 0), status: "finished", homeScore: 104, awayScore: 98, venue: "Chase Center" },
    { homeTeamId: id("flamengo"), awayTeamId: id("franca"), competition: "NBB", startsAt: at(-2, 20, 0), status: "finished", homeScore: 88, awayScore: 84, venue: "Maracanãzinho" },
    { homeTeamId: id("real-madrid"), awayTeamId: id("panathinaikos"), competition: "EuroLeague", startsAt: at(-2, 16, 45), status: "finished", homeScore: 91, awayScore: 79, venue: "WiZink Center" },
    { homeTeamId: id("denver-nuggets"), awayTeamId: id("milwaukee-bucks"), competition: "NBA", startsAt: at(-3, 22, 0), status: "finished", homeScore: 117, awayScore: 121, venue: "Ball Arena" },
    { homeTeamId: id("minas"), awayTeamId: id("sao-paulo"), competition: "NBB", startsAt: at(-3, 19, 30), status: "finished", homeScore: 76, awayScore: 81, venue: "Arena UniBH" },
    { homeTeamId: id("boston-celtics"), awayTeamId: id("milwaukee-bucks"), competition: "NBA", startsAt: at(-4, 21, 0), status: "finished", homeScore: 109, awayScore: 101, venue: "TD Garden" },
    { homeTeamId: id("panathinaikos"), awayTeamId: id("real-madrid"), competition: "EuroLeague", startsAt: at(-6, 15, 0), status: "finished", homeScore: 85, awayScore: 82, venue: "OAKA Arena" },
    // upcoming
    { homeTeamId: id("los-angeles-lakers"), awayTeamId: id("golden-state-warriors"), competition: "NBA", startsAt: at(0, 23, 30), status: "scheduled", homeScore: null, awayScore: null, venue: "Crypto.com Arena" },
    { homeTeamId: id("franca"), awayTeamId: id("minas"), competition: "NBB", startsAt: at(0, 20, 0), status: "scheduled", homeScore: null, awayScore: null, venue: "Ginásio Pedrocão" },
    { homeTeamId: id("boston-celtics"), awayTeamId: id("denver-nuggets"), competition: "NBA", startsAt: at(1, 21, 0), status: "scheduled", homeScore: null, awayScore: null, venue: "TD Garden" },
    { homeTeamId: id("real-madrid"), awayTeamId: id("panathinaikos"), competition: "EuroLeague", startsAt: at(1, 16, 30), status: "scheduled", homeScore: null, awayScore: null, venue: "WiZink Center" },
    { homeTeamId: id("phoenix-suns"), awayTeamId: id("milwaukee-bucks"), competition: "NBA", startsAt: at(2, 22, 0), status: "scheduled", homeScore: null, awayScore: null, venue: "Footprint Center" },
    { homeTeamId: id("sao-paulo"), awayTeamId: id("flamengo"), competition: "NBB", startsAt: at(3, 19, 0), status: "scheduled", homeScore: null, awayScore: null, venue: "Ginásio do Morumbi" },
    { homeTeamId: id("golden-state-warriors"), awayTeamId: id("boston-celtics"), competition: "NBA", startsAt: at(4, 23, 0), status: "scheduled", homeScore: null, awayScore: null, venue: "Chase Center" },
    { homeTeamId: id("milwaukee-bucks"), awayTeamId: id("los-angeles-lakers"), competition: "NBA", startsAt: at(5, 21, 30), status: "scheduled", homeScore: null, awayScore: null, venue: "Fiserv Forum" },
    { homeTeamId: id("flamengo"), awayTeamId: id("minas"), competition: "NBB", startsAt: at(6, 20, 0), status: "scheduled", homeScore: null, awayScore: null, venue: "Maracanãzinho" },
    { homeTeamId: id("denver-nuggets"), awayTeamId: id("phoenix-suns"), competition: "NBA", startsAt: at(9, 22, 0), status: "scheduled", homeScore: null, awayScore: null, venue: "Ball Arena" },
    { homeTeamId: id("panathinaikos"), awayTeamId: id("real-madrid"), competition: "EuroLeague", startsAt: at(12, 15, 0), status: "scheduled", homeScore: null, awayScore: null, venue: "OAKA Arena" },
    { homeTeamId: id("franca"), awayTeamId: id("sao-paulo"), competition: "NBB", startsAt: at(14, 19, 30), status: "scheduled", homeScore: null, awayScore: null, venue: "Ginásio Pedrocão" },
  ]);

  const body = (p: string[]) => p.join("\n\n");
  await db.insert(news).values([
    { slug: "principais-novidades-da-rodada", title: "Confira as principais novidades da rodada", category: "NBA", image: "/images/arena.jpg", author: "Redação Backboard", teamId: id("los-angeles-lakers"), publishedAt: at(0, 9), featured: true, summary: "Lakers vencem clássico contra os Celtics em jogo decidido nos segundos finais e Warriors seguem embalados na Conferência Oeste.", content: body(["A rodada da NBA entregou tudo o que se esperava de um clássico. Na Crypto.com Arena, os Lakers superaram os Celtics por 112 a 108 em uma partida que só foi decidida nos últimos 40 segundos, com uma sequência de lances livres e uma roubada de bola decisiva na defesa.", "Do outro lado do país, os Warriors mantiveram o embalo diante dos Suns. A equipe de San Francisco controlou o ritmo do jogo desde o primeiro quarto e teve novamente o perímetro como principal arma, convertendo 18 bolas de três pontos.", "Com os resultados, a briga pelas primeiras posições da Conferência Oeste segue aberta. Os próximos confrontos diretos prometem redefinir o cenário dos playoffs.", "Acompanhe todos os jogos, horários e resultados na seção de Jogos da Backboard."]) },
    { slug: "mercado-do-basquete-movimenta-as-equipes", title: "Mercado do basquete movimenta as equipes", category: "Mercado", image: IMG.jerseyBlue, author: "Carla Menezes", teamId: id("phoenix-suns"), publishedAt: at(-1, 14), featured: true, summary: "Janela de trocas aquece a liga: franquias buscam reforços no perímetro e times brasileiros anunciam contratações para a temporada do NBB.", content: body(["A janela de transferências está agitada. Diversas franquias da NBA buscam ala-armadores com bom aproveitamento nos arremessos de longa distância, o que tem elevado o preço dos jogadores de perímetro.", "No Brasil, o NBB também vive dias de movimentação intensa. Flamengo e Franca anunciaram renovações importantes, enquanto Minas e São Paulo apostam em nomes com experiência internacional para encorpar seus elencos.", "Especialistas apontam que a tendência é de equipes cada vez mais versáteis, com jogadores capazes de atuar em múltiplas posições e defender em qualquer situação de troca."]) },
    { slug: "destaques-dos-ultimos-jogos", title: "Veja os destaques dos últimos jogos", category: "Jogadores", image: IMG.indoorGame, author: "Pedro Albuquerque", teamId: id("golden-state-warriors"), publishedAt: at(-1, 18), featured: true, summary: "Triplo-duplos, enterradas históricas e um game-winner de meia quadra: reunimos as melhores jogadas da semana.", content: body(["A semana foi generosa em momentos memoráveis. Um triplo-duplo com 30 pontos, uma sequência de sete cestas de três consecutivas e um game-winner de quase meia quadra marcaram os últimos jogos.", "Nos Nuggets, o pivô sérvio voltou a conduzir o ataque com maestria, distribuindo 14 assistências. Já em Milwaukee, a intensidade física do ala grego foi decisiva para a vitória fora de casa.", "Confira a seleção completa das melhores jogadas e vote no destaque da semana na área do usuário."]) },
    { slug: "nbb-define-calendario-dos-playoffs", title: "NBB define calendário dos playoffs e promete temporada histórica", category: "Basquete nacional", image: IMG.groupGame, author: "Redação Backboard", teamId: id("flamengo"), publishedAt: at(-2, 10), featured: false, summary: "Liga Nacional divulga datas e locais das séries decisivas, com ginásios lotados e transmissão ampliada.", content: body(["A Liga Nacional de Basquete divulgou o calendário completo dos playoffs. As séries de quartas de final começam já na próxima semana, com vantagem de mando para as equipes de melhor campanha.", "Flamengo e Franca chegam como favoritos, mas Minas e São Paulo demonstraram força ao longo da fase de classificação e prometem séries equilibradas.", "A expectativa é de recorde de público e de audiência, com transmissões em TV aberta, fechada e streaming."]) },
    { slug: "euroleague-final-four-cenario", title: "EuroLeague: Real Madrid e Panathinaikos duelam pelo topo", category: "Internacional", image: IMG.outdoorGame, author: "Miguel Ortega", teamId: id("real-madrid"), publishedAt: at(-3, 11), featured: false, summary: "Gigantes europeus fazem confronto direto pela liderança da fase regular em série de jogos imperdíveis.", content: body(["O basquete europeu vive um de seus momentos mais competitivos. Real Madrid e Panathinaikos dividem a liderança da EuroLeague e se enfrentam duas vezes nas próximas semanas.", "Em Madri, o time merengue conta com o WiZink Center lotado, enquanto em Atenas o OAKA transforma cada jogo em um caldeirão.", "O confronto é também um duelo de estilos: a organização tática espanhola contra a intensidade emocional grega."]) },
    { slug: "copa-do-mundo-selecao-convocacao", title: "Seleção brasileira divulga pré-lista para as eliminatórias", category: "Competições", image: IMG.playerShot, author: "Ana Beatriz Lima", teamId: id("franca"), publishedAt: at(-4, 9), featured: false, summary: "Comissão técnica aposta em mescla de veteranos e jovens revelações do NBB para a próxima janela FIBA.", content: body(["A Confederação Brasileira de Basketball divulgou a pré-lista de 24 atletas para a próxima janela das eliminatórias da FIBA. A lista mistura nomes experientes que atuam na Europa com jovens destaques do NBB.", "Franca e Flamengo são os clubes com mais representantes. A comissão técnica destacou a evolução física e técnica dos atletas formados no país.", "Os jogos acontecem em setembro, com o Brasil buscando confirmar a classificação com antecedência."]) },
    { slug: "tecnologia-nos-tenis-de-basquete", title: "Como a tecnologia mudou os tênis de basquete", category: "Mercado", image: IMG.shotOutdoor, author: "Redação Backboard", teamId: null, publishedAt: at(-5, 13), featured: false, summary: "Amortecimento inteligente, solados de tração multidirecional e materiais ultraleves: o que realmente faz diferença na quadra.", content: body(["A evolução dos tênis de basquete foi acelerada por novas tecnologias de amortecimento e materiais compostos. Hoje, um par pesa até 30% menos do que há dez anos.", "Solados com padrões de tração multidirecional, cabedais em mesh engenheirado e sistemas de travamento do tornozelo são os principais avanços.", "Na Backboard, você encontra os modelos Court Vision e Fast Break Low, desenvolvidos com essas tecnologias para diferentes estilos de jogo."]) },
    { slug: "jovem-armador-brilha-no-nbb", title: "Jovem armador brilha e chama atenção de olheiros da NBA", category: "Jogadores", image: IMG.player13, author: "Pedro Albuquerque", teamId: id("minas"), publishedAt: at(-6, 16), featured: false, summary: "Com média de 21 pontos e 8 assistências, revelação de 19 anos vira assunto entre franquias norte-americanas.", content: body(["Aos 19 anos, o armador revelado no Minas vem sendo o nome da temporada do NBB. Com médias de 21 pontos, 8 assistências e 2 roubadas por jogo, ele já foi observado por olheiros de pelo menos cinco franquias da NBA.", "Sua leitura de jogo e velocidade em transição são os principais elogios. O próximo passo pode ser o Draft ou uma passagem pela Europa.", "Acompanhe a trajetória do jovem talento na cobertura completa da Backboard."]) },
  ]);
}
