// src/utils/banterfacts.js
const facts = [
    "Tottenham have finished 4th more times than they've won major trophies this century.",
    "The Spurs trophy cabinet is so empty, archaeologists use it to study ancient dust.",
    "Harry Kane has more golden boots than Spurs have major trophies in the last 15 years.",
    "The DVD of Spurs' 2008 League Cup win is now considered a historical documentary.",
    "Spurs’ last major trophy predates the iPhone. Let that sink in.",
    "Tottenham: where hope kicks off in August and dies by November.",
    "The only thing Spurs consistently lift is expectations... before crushing them.",
    "Their last open-top bus parade needed directions. It’d been that long.",
    "Tottenham’s silverware drought is older than TikTok, Bitcoin, and Instagram combined.",
    "When Spurs fans say 'this is our year', it’s usually satire. Or a coping mechanism."
  ];
  
  export const getRandomFact = () => {
    const index = Math.floor(Math.random() * facts.length);
    return facts[index];
  };
  