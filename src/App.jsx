import { useEffect, useState } from 'react';
import './App.css';

let soundIndex = 0; // Global outside function to track which sound is next

const playRandomSound = () => {
  const sounds = [
    "/sounds/sad-violin.mp3",
    "/sounds/sad-trombone.mp3",
    "/sounds/laugh.mp3"
  ];

  const audio = new Audio(sounds[soundIndex]);
  audio.volume = 0.3; // Quieter volume (30%)
  audio.play();

  // Move to next sound in list
  soundIndex = (soundIndex + 1) % sounds.length;
};


function App() {
  
  const [timeSinceTrophy, setTimeSinceTrophy] = useState('');
  const [funnyStat, setFunnyStat] = useState('');
  const [heroImage, setHeroImage] = useState('');

  // ⏱️ Trophy Timer Logic
  useEffect(() => {
    // Random Hero Image
    const imageCount = 7; // Update this if you add more images
    const randomIndex = Math.floor(Math.random() * imageCount) + 1;
    setHeroImage(`/hero-images/${randomIndex}.jpg`);

    const updateTimer = () => {
      const lastTrophyDate = new Date('2008-02-24T17:00:00Z');
      const now = new Date();
      const diff = now - lastTrophyDate;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeSinceTrophy(`${years} years, ${days} days, ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🤡 Funny Stat Logic
  const stats = [
    "Since Spurs last won a trophy, Arsenal have won 9.",
    "Spurs have had 13 managers since their last trophy.",
    "GTA IV, V *and* VI were released since Tottenham lifted a cup.",
    "The iPhone didn't exist the last time Spurs won silverware.",
    "Sol Campbell’s move to Arsenal is still more relevant than any Spurs honour.",
    "Tottenham's trophy drought is older than TikTok users.",
    "Even Leicester and Wigan have lifted trophies since.",
    "Queen Elizabeth was still alive the last time Spurs won a thing.",
    "Beyoncé has released more albums than Spurs have trophies since 2008.",
    "The manager of the team that beat Spurs in Europe was in prison. True story."
  ];
  const [embarrassingResult, setEmbarrassingResult] = useState('');

  const results = [
    {
      score: "Dinamo Zagreb 3-0 Tottenham (3-2 agg)",
      details: "⚽ Oršić (62', 83', 106') | 📆 18 Mar 2021 – Europa League R16",
      link: "https://www.bbc.co.uk/sport/football/56433776"
    },
    {
      score: "NS Mura 2-1 Tottenham",
      details: "📆 25 Nov 2021 – Europa Conference League Group Stage",
      link: "https://www.bbc.co.uk/sport/football/59406834"
    },
    {
      score: "Tottenham 2-3 West Ham",
      details: "⚽ Blew 3-0 lead in 10 mins | 📆 18 Oct 2020 – Premier League",
      link: "https://www.bbc.co.uk/sport/football/41661462"
    },
    {
      score: "Tottenham 1-5 Newcastle",
      details: "⚽ 5 goals in 21 minutes | 📆 23 Apr 2023 – Premier League",
      link: "https://www.bbc.co.uk/sport/football/36240333"
    },
    {
      score: "Tottenham 1-2 Leicester",
      details: "⚽ Leicester come back to beat Spurs | 📆 26 Jan 2025 – Premier League",
      link: "https://www.bbc.co.uk/sport/football/live/c93lypjqvxnt"
    },
    {
      score: "Sheffield Utd 1-0 Tottenham",
      details: "📆 1 Mar 2023 – FA Cup Fifth Round",
      link: "https://www.bbc.co.uk/sport/football/64799766"
    }
  ];
  const [randomSigning, setRandomSigning] = useState(null);

  const signings = [
    {
      name: "Roberto Soldado",
      wiki: "https://en.wikipedia.org/wiki/Roberto_Soldado",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Soldado_Spain.png",
      year: 2013,
      fee: "£26m",
      apps: 76,
      goals: 16,
      assists: 11,
      bio: "Signed for £26m to bring goals. Instead brought vibes and missed pens. Genuinely allergic to one-on-ones. Scored most of his goals from the penalty spot — when allowed."
    },
    {
      name: "Tanguy Ndombele",
      wiki: "https://en.wikipedia.org/wiki/Tanguy_Ndombele",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Tanguy_Ndombele_2024.png",
      year: 2019,
      fee: "£55m",
      apps: 91,
      goals: 10,
      assists: 9,
      bio: "The £55m baller with the engine of a Fiat Punto. Had moments of brilliance followed by long naps mid-match. Still haunted by that walk vs Burnley."
    },
    {
      name: "Paulinho",
      wiki: "https://en.wikipedia.org/wiki/Paulinho_(footballer,_born_July_1988)",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Paulinho_850_1696.jpg/1280px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Paulinho_850_1696.jpg",
      year: 2013,
      fee: "£17m",
      apps: 67,
      goals: 10,
      assists: 4,
      bio: "One of the famed 'Bale Money' buys. Came with Brazilian hype, left with Sunday League output. Highlight? That one goal vs Stoke. Or was it Hull?"
    },
    {
      name: "Vincent Janssen",
      wiki: "https://en.wikipedia.org/wiki/Vincent_Janssen",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/1f/20160604_AUT_NED_8898.jpg",
      year: 2016,
      fee: "£17m",
      apps: 42,
      goals: 6,
      assists: 4,
      bio: "Signed as the next Dutch goal machine. Turned out to be allergic to open play goals. Scored a few pens, ran around a bit. Retired early (spiritually)."
    },
    {
      name: "Emerson Royal",
      wiki: "https://en.wikipedia.org/wiki/Emerson_Royal",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Emerson_Royal_in_2018_for_Atletico_Mineiro_%28cropped%29.jpg",
      year: 2021,
      fee: "£25.8m",
      apps: 93,
      goals: 4,
      assists: 3,
      bio: "Looks like he should be rapid. Isn’t. Spurs fans can’t tell if he’s a full-back or a prank. Better at TikToks than tackles."
    },
    {
      name: "David Bentley",
      wiki: "https://en.wikipedia.org/wiki/David_Bentley",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/93/David_Michael_Bentle_16_09_2012_Rostov_on_Don_stadium_Olimp_2.jpg",
      year: 2008,
      fee: "£15m",
      apps: 62,
      goals: 3,
      assists: 12,
      bio: "The next Beckham… if Beckham hated football. Scored a fluke vs Arsenal, then disappeared into a beard and a bar in Marbella. Retired early to go fishing."
    },
    {
      name: "Sergei Rebrov",
      wiki: "https://en.wikipedia.org/wiki/Serhii_Rebrov",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/44/%D0%9C%D0%B0%D1%82%D1%87_%C2%AB%D0%94%D0%B8%D0%BD%D0%B0%D0%BC%D0%BE%C2%BB_-_%C2%AB%D0%A4%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B2%D0%B0%D1%80%D0%BE%D1%88%C2%BB_1-0._8_%D0%B4%D0%B5%D0%BA%D0%B0%D0%B1%D1%80%D1%8F_2020_%D0%B3%D0%BE%D0%B4%D0%B0_%E2%80%94_1173732_%28%D0%A1%D0%B5%D1%80%D0%B3%D1%96%D0%B9_%D0%A0%D0%B5%D0%B1%D1%80%D0%BE%D0%B2%29.jpg",
      year: 2000,
      fee: "£11m",
      apps: 75,
      goals: 16,
      assists: "?",
      bio: "Big-money signing from Dynamo Kyiv. Was expected to be deadly. Turns out, just deadly to attacking momentum. Still managed more than Janssen."
    },
    {
      name: "Giovani Lo Celso",
      wiki: "https://en.wikipedia.org/wiki/Giovani_Lo_Celso",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/2020-03-10_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League_Achtelfinale%2C_RB_Leipzig_-_Tottenham_Hotspur_1DX_3705_by_Stepro.jpg/330px-2020-03-10_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League_Achtelfinale%2C_RB_Leipzig_-_Tottenham_Hotspur_1DX_3705_by_Stepro.jpg",
      year: 2019,
      fee: "£27m",
      apps: 84,
      goals: 8,
      assists: 6,
      bio: "One week: 'Underrated genius.' Next week: 'Can he pass forward?' Played like he was permanently jet-lagged. Somehow still technically a Spurs player."
    },
    {
      name: "Moussa Sissoko",
      wiki: "https://en.wikipedia.org/wiki/Moussa_Sissoko",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Moussa_Sissoko_cropped.JPG/330px-Moussa_Sissoko_cropped.JPG",
      year: 2016,
      fee: "£30m",
      apps: 202,
      goals: 5,
      assists: 16,
      bio: "Cost £30m, looked like £30. Spent early seasons running fast in the wrong direction. Eventually became 'useful', which is high praise by Spurs standards."
    },
    {
      name: "Richarlison",
      wiki: "https://en.wikipedia.org/wiki/Richarlison",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/07_07_2019_Final_da_Copa_Am%C3%A9rica_2019_%2848226557731%29_%28cropped%29.jpg",
      year: 2022,
      fee: "£60m",
      apps: 66,
      goals: 6,
      assists: 6,
      bio: "£60m striker with a pigeon celebration and goal output to match. Took nearly a year to score in the Prem. Equalised in the 93rd… lost in the 95th."
    },
    {
      name: "Helder Postiga",
      wiki: "https://en.wikipedia.org/wiki/Hélder_Postiga",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/DEP-GET_072_1200_%2815516752520%29.jpg",
      year: 2003,
      fee: "£8.25m",
      apps: 24,
      goals: 2,
      assists: "?",
      bio: "Looked the part, played like the ball was made of lava. Every shot hit Row Z. Quickly returned to Portugal where expectations were lower."
    },
    {
      name: "Andy Booth",
      wiki: "https://en.wikipedia.org/wiki/Andy_Booth",
      image: "https://static.wikia.nocookie.net/tottenham-hotspur/images/f/f3/Andy_Booth.jpg/revision/latest?cb=20200407185406",
      year: 2001,
      fee: "Loan",
      apps: 4,
      goals: 0,
      assists: 0,
      bio: "Emergency loan signing. Played 4 times, scored nothing, probably didn't even know the names of his teammates. Still has better hair than most of the squad."
    },
    {
      name: "Georges-Kévin Nkoudou",
      wiki: "https://en.wikipedia.org/wiki/Georges-Kévin_Nkoudou",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Georges-K%C3%A9vin_Nkoudou_%28cropped%29.jpg",
      year: 2016,
      fee: "£11m",
      apps: 27,
      goals: 1,
      assists: 2,
      bio: "Fast, French, and forgettable. Looked decent in YouTube compilations. Never seen again after one cross vs Fulham. Possibly still on loan somewhere."
    },
    {
      name: "Ryan Sessegnon",
      wiki: "https://en.wikipedia.org/wiki/Ryan_Sessegnon",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/2020-03-10_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League_Achtelfinale%2C_RB_Leipzig_-_Tottenham_Hotspur_1DX_3696_by_Stepro.jpg/1920px-2020-03-10_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League_Achtelfinale%2C_RB_Leipzig_-_Tottenham_Hotspur_1DX_3696_by_Stepro.jpg",
      year: 2019,
      fee: "£25m",
      apps: 56,
      goals: 3,
      assists: 4,
      bio: "Was supposed to be the future of England’s left flank. Ended up as Spurs’ latest fitness experiment. Hamstring has more minutes than him."
    },
    {
      name: "Clinton N’Jie",
      wiki: "https://en.wikipedia.org/wiki/Clinton_N%27Jie",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/NJIE_CLINTON.jpg/1280px-NJIE_CLINTON.jpg",
      year: 2015,
      fee: "£12m",
      apps: 14,
      goals: 0,
      assists: 2,
      bio: "Brought in to be a dynamic winger. Left having achieved cardio and not much else. Stats read like a Championship loanee — harsh but true."
    },
    {
      name: "Bryan Gil",
      wiki: "https://en.wikipedia.org/wiki/Bryan_Gil",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Bryan_Gil_Spain_2021.jpg",
      year: 2021,
      fee: "£22m + Lamela",
      apps: 31,
      goals: 0,
      assists: 1,
      bio: "Hair of a 70s rockstar, body of a teenage librarian. Skillful but weighed about 4kg. Swapped for Lamela, who immediately outscored the entire team."
    },
    {
      name: "Kevin-Prince Boateng",
      wiki: "https://en.wikipedia.org/wiki/Kevin-Prince_Boateng",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Prince_Boateng_%28cropped%29.jpg",
      year: 2007,
      fee: "£5.4m",
      apps: 24,
      goals: 0,
      assists: "?",
      bio: "Before he got cool at AC Milan, he was invisible at Spurs. Looked confused every time he touched the ball. A career that proves good players can still flop hard."
    },
    {
      name: "Reto Ziegler",
      wiki: "https://en.wikipedia.org/wiki/Reto_Ziegler",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Reto_Ziegler_2012.jpg",
      year: 2004,
      fee: "Free",
      apps: 31,
      goals: 1,
      assists: 2,
      bio: "Started brightly, then fell off the radar like he was in witness protection. One of those players you remember only because of Championship Manager 04/05."
    },
    {
      name: "Bongani Khumalo",
      wiki: "https://en.wikipedia.org/wiki/Bongani_Khumalo",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Khumalo_2012.JPG",
      year: 2011,
      fee: "£1.5m",
      apps: 0,
      goals: 0,
      assists: 0,
      bio: "Signed off the back of the 2010 World Cup. Never played a minute for Spurs. Like actually zero. Still made 4x what you do in a year, probably."
    },
    {
      name: "Grzegorz Rasiak",
      wiki: "https://en.wikipedia.org/wiki/Grzegorz_Rasiak",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Grzegorz_Rasiak_2013.JPG",
      year: 2005,
      fee: "Free",
      apps: 8,
      goals: 0,
      assists: 0,
      bio: "The most Championship striker to ever touch Premier League turf. Still cited as a top 5 'why tho?' signing in Spurs history."
    }
  ];
  

const showRandomSigning = () => {
  const randomIndex = Math.floor(Math.random() * signings.length);
  setRandomSigning(signings[randomIndex]);
};

  const showEmbarrassingResult = () => {
    const randomIndex = Math.floor(Math.random() * results.length);
    setEmbarrassingResult(results[randomIndex]);
  };
  
  const showFunnyStat = () => {
    const randomIndex = Math.floor(Math.random() * stats.length);
    setFunnyStat(stats[randomIndex]);
  };

  return (
    <div className="container">
      {heroImage && <img src={heroImage} alt="Spurs Banter" className="hero-img" />}
      <div className="title-bar">
  <div className="title-side">🐓⚽</div>
  <h1 className="title-center">How Long Has It Been Since Spurs Won a Trophy?</h1>
  <div className="title-side">⚽🐓</div>
</div>


      <h2 className="timer">{timeSinceTrophy}</h2>
      <p className="subtext">Spoiler: It’s been a while.</p>
      <a href="/trophy-cabinet" className="trophy-link">
  🏆 Visit Tottenham’s Trophy Cabinet
</a>


      {/* 🎉 Funny Stat Button */}
      <div className="button-stack">
  <button className="stat-button" onClick={() => { showFunnyStat(); playRandomSound(); }}>
    Give me a funny stat
  </button>

      {funnyStat && <p className="stat-text">{funnyStat}</p>}
      <button className="result-button" onClick={() => { showEmbarrassingResult(); playRandomSound(); }}>
    Reveal an embarrassing result
  </button>


{embarrassingResult && (
  <div className="match-box">
    <h3 className="match-score">{embarrassingResult.score}</h3>
    <p className="match-details">{embarrassingResult.details}</p>
    <a
      href={embarrassingResult.link}
      target="_blank"
      rel="noopener noreferrer"
      className="match-link"
    >
      Read more
    </a>
  
  </div>
  
)}
  <button className="signing-button" onClick={() => { showRandomSigning(); playRandomSound(); }}>
    Show me a signing of the season
  </button>
</div> {/* Close the .button-stack div here */}


{randomSigning && (
  <div className="signing-card">
    <img src={randomSigning.image} alt={randomSigning.name} className="signing-img" />
    <h3>
      <a href={randomSigning.wiki} target="_blank" rel="noopener noreferrer">
        {randomSigning.name}
      </a>
    </h3>
    <p>📅 Year Signed: {randomSigning.year}</p>
    <p>💰 Fee: {randomSigning.fee}</p>
    <p>📊 Apps: {randomSigning.apps} | Goals: {randomSigning.goals} | Assists: {randomSigning.assists}</p>
    <p className="signing-bio">"{randomSigning.bio}"</p>
  </div>
)}

    </div>
  );
}

export default App;
