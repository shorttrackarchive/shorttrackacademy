const STORAGE_KEY = "short_track_academy_pm_style_v3_illustrations";
const REGULAR_WEEKS = 48;
const REST_WEEKS = 4;
const TOTAL_WEEKS = 52;

// 9.6: 첫 올림픽 시즌은 2029-30, 세 번째 올림픽 시즌인 2037-38 종료 시 게임 종료.
const FIRST_OLYMPIC_SEASON_START = 2029;
const FINAL_OLYMPIC_SEASON_START = 2037;
const FINAL_OLYMPIC_SEASON_END = 2038;

const STAT_LABELS = {
  reaction:"스타트 반응",
  acceleration:"가속력",
  topSpeed:"최고속도",
  stamina:"지구력",
  cornering:"코너링",
  passing:"추월",
  tactics:"전술",
  mental:"멘탈",
  recovery:"회복력",
  stability:"안정성",
  relay:"계주 센스",
  fighting:"승부욕",
  sportsmanship:"스포츠맨십",
  integrity:"인성"
};

const PERSONALITIES = ["노력형","천재형","침착함","예민함","승부욕 강함","팀플레이형","독립적","기복형"];
const HIDDEN_TRAITS = ["높은 잠재력","강한 부상 내성","큰 경기 체질","빠른 성장 속도","슬럼프 저항력","계주 적응력","대기만성","위험한 천재"];
const NAMES = ["김하린","이서준","박민재","최유나","한지우","윤서아","강도윤","신유찬","오하늘","정다온","Alex Kim","Mia Park","Leo Choi","Sofia Lee"];

const RIVAL_POOLS = {
  youth:["지역 라이벌 민서","스피드형 유망주 지호","겁 없는 꿈나무 유리"],
  junior:["주니어 챔피언 서윤","전국대회 라이벌 도현","계주 에이스 하준"],
  senior:["국가대표 경쟁자 현우","월드투어 강자 에밀리","세계선수권 우승 후보 루카"]
};

const ACTIVITIES = [
  {id:"basic_endurance", cat:"기초 체력", name:"근지구력 훈련", desc:"지구력·회복력 상승. 피로도 증가.", effects:{stamina:2,recovery:1,fatigue:8,condition:-3,injuryRisk:2}},
  {id:"basic_power", cat:"기초 체력", name:"순발력 훈련", desc:"스타트 반응·가속력 상승. 부상 위험이 조금 있습니다.", effects:{reaction:1,acceleration:2,fatigue:9,condition:-3,injuryRisk:3}},
  {id:"ice_sense", cat:"빙상 감각", name:"빙상 감각 훈련", desc:"빙질 적응과 라인 감각을 익혀 안정적인 스케이팅 기반을 만듭니다.", effects:{stability:0.7,cornering:1,reaction:1,fatigue:5,condition:-1,injuryRisk:1}},
  {id:"ice_balance", cat:"빙상 감각", name:"균형 감각 훈련", desc:"안정성·코너링 상승.", effects:{stability:1.2,cornering:1,fatigue:6,condition:-2,injuryRisk:1}},
  {id:"edge_control", cat:"빙상 감각", name:"엣지 컨트롤 훈련", desc:"코너링·안정성·추월 상승.", effects:{cornering:2,stability:0.6,passing:1,fatigue:8,condition:-3,injuryRisk:2}},
  {id:"technical_drill", cat:"기술 훈련", name:"기술 훈련", desc:"자세, 리듬, 무릎 각도와 기본 주법을 다듬는 만능 훈련입니다.", effects:{stability:0.6,cornering:1,topSpeed:1,fatigue:7,condition:-2,injuryRisk:1}},
  {id:"start_reaction", cat:"기술 훈련", name:"스타트 반응 훈련", desc:"500m 초반 자리 선점에 중요합니다.", effects:{reaction:3,acceleration:1,fatigue:9,condition:-3,injuryRisk:3}},
  {id:"accel_zone", cat:"기술 훈련", name:"가속 구간 훈련", desc:"가속력·최고속도 상승.", effects:{acceleration:2,topSpeed:2,fatigue:11,condition:-4,injuryRisk:4}},
  {id:"corner_exit", cat:"기술 훈련", name:"코너 진입·탈출 훈련", desc:"코너링과 추월 연결 능력을 높입니다.", effects:{cornering:3,passing:1,fatigue:10,condition:-4,injuryRisk:3}},
  {id:"inside_pass", cat:"기술 훈련", name:"인코스 추월 훈련", desc:"짧은 라인으로 안쪽을 파고드는 추월 능력을 기릅니다.", effects:{passing:3,tactics:1,fighting:0.6,stability:-1,fatigue:10,condition:-4,injuryRisk:4}},
  {id:"outside_pass", cat:"기술 훈련", name:"아웃코스 추월 훈련", desc:"바깥 라인에서 속도를 유지하며 추월하는 능력을 키웁니다.", effects:{passing:2,topSpeed:1,tactics:1,fighting:0.5,fatigue:10,condition:-4,injuryRisk:4}},
  {id:"pace_control", cat:"전술 훈련", name:"페이스 조절", desc:"1000m·1500m 운영 능력 상승.", effects:{tactics:2,stamina:1,mental:1,fighting:0.6,fatigue:6,condition:-2,injuryRisk:1}},
  {id:"final_lap", cat:"전술 훈련", name:"결승 운영", desc:"멘탈·승부욕·전술 상승.", effects:{mental:1,fighting:2.4,tactics:1,fatigue:7,condition:-2,injuryRisk:1}},
  {id:"rival_analysis", cat:"전술 훈련", name:"상대 분석", desc:"전술 상승. 대회 전 안정적인 선택입니다.", effects:{tactics:3,mental:1,fatigue:4,condition:-1,injuryRisk:0}},
  {id:"relay_touch", cat:"계주 훈련", name:"터치 타이밍", desc:"계주 센스와 안정성 상승.", effects:{relay:3,stability:0.5,fatigue:8,condition:-3,injuryRisk:2}},
  {id:"relay_order", cat:"계주 훈련", name:"순번 적응", desc:"계주 센스·전술 상승.", effects:{relay:2,tactics:2,fatigue:7,condition:-2,injuryRisk:1}},
  {id:"team_sync", cat:"계주 훈련", name:"팀 호흡", desc:"계주 센스·멘탈 상승.", effects:{relay:2,mental:1,condition:1,fatigue:5,injuryRisk:0}},
  {id:"condition_control", cat:"관리", name:"컨디션 조절", desc:"대회 전 컨디션과 안정성을 높입니다.", effects:{condition:8,stability:1,fatigue:-5,injuryRisk:-3}},
  {id:"mental_care", cat:"관리", name:"멘탈 관리", desc:"멘탈 회복과 컨디션 상승.", effects:{mental:1,condition:7,fatigue:-3,injuryRisk:-2}},
  {id:"equipment", cat:"관리", name:"장비 점검", desc:"안정성 상승, 부상 위험 감소.", effects:{stability:1,condition:2,fatigue:-2,injuryRisk:-4}},
  {id:"rehab", cat:"관리", name:"재활 훈련", desc:"부상 회복과 후유증 완화에 좋습니다.", effects:{recovery:2,condition:5,fatigue:-8,injuryRisk:-8,rehab:1}},
  {id:"rest", cat:"관리", name:"휴식", desc:"피로와 부상 위험을 크게 낮춥니다.", effects:{condition:10,fatigue:-16,injuryRisk:-10}},
  {id:"fairplay", cat:"인성", name:"페어플레이 교육", desc:"반칙 유혹을 줄이고 스포츠맨십을 키웁니다.", effects:{sportsmanship:3,integrity:2,mental:1,fatigue:3,condition:1,injuryRisk:-1}},
  {id:"rules_study", cat:"인성", name:"판정·규칙 공부", desc:"페널티 위험을 낮추고 안정적인 경기 운영을 익힙니다.", effects:{sportsmanship:2,tactics:2,stability:1,fatigue:4,injuryRisk:-2}},
  {id:"rival_respect", cat:"인성", name:"상대 존중 훈련", desc:"경쟁자를 존중하며 멘탈과 관계 관리 능력을 키웁니다.", effects:{integrity:3,sportsmanship:1,mental:1,stress:-2}},
  {id:"volunteer", cat:"인성", name:"빙상장 봉사활동", desc:"팬과 가족의 지지를 얻고 인성을 성장시킵니다.", effects:{integrity:2,sportsmanship:1,condition:2,fatigue:4,fame:1,fan:10}},
  {id:"race_prep", cat:"대회 준비", name:"대회 루틴 점검", desc:"정식 대회 전 컨디션·멘탈·안정성을 정돈합니다.", effects:{condition:5,mental:0.6,stability:0.5,fatigue:-2,injuryRisk:-2}},
  {id:"start_check", cat:"대회 준비", name:"스타트 최종 점검", desc:"단거리 대회 전 스타트 감각을 끌어올립니다.", effects:{reaction:2,acceleration:1,condition:1,fatigue:4,injuryRisk:1}},
  {id:"opponent_scout", cat:"대회 준비", name:"상대 분석 미팅", desc:"대회 상대의 레이스 패턴을 분석합니다.", effects:{tactics:3,mental:1,condition:1,fatigue:2}},
  {id:"relay_check", cat:"대회 준비", name:"계주 순번 점검", desc:"계주 출전 가능성을 대비해 순번과 터치를 점검합니다.", effects:{relay:2,tactics:1,stability:0.5,fatigue:4}},
  {id:"time_trial", cat:"실전 감각", name:"자체 기록 측정", desc:"공식 대회는 아니지만 현재 기록을 가볍게 확인합니다.", effects:{topSpeed:1,mental:0.5,condition:-2,fatigue:8,injuryRisk:2}},
  {id:"practice_race", cat:"실전 감각", name:"연습 레이스", desc:"공식 메달·대표 선발과 무관한 실전 감각 훈련입니다.", effects:{passing:1,tactics:1,mental:0.5,condition:-3,fatigue:10,injuryRisk:3}}
];

const INTENSITY = {
  light:{label:"가볍게", stat:0.42, fatigue:0.55, condition:0.55, injury:0.45},
  normal:{label:"보통", stat:0.64, fatigue:1.0, condition:1.0, injury:1.0},
  hard:{label:"강하게", stat:0.88, fatigue:1.55, condition:1.45, injury:1.75}
};

// 6.3 조정: 능력치는 즉시 1~3씩 오르지 않고, 내부 성장 게이지가 쌓인 뒤 1씩 오릅니다.
const TRAINING_GROWTH_SCALE = 0.185;
const DETRAINING_ACTIVITIES = {
  rest: 0.22,
  mental_care: 0.08,
  condition_control: 0.07,
  rehab: 0.10
};
const DETRAINING_STATS = ["reaction","acceleration","topSpeed","stamina","cornering","passing","tactics","relay","fighting"];

// 6.4 조정: 랜덤 이벤트는 덜 자주, 덜 중복되게, 능력치 상승은 성장 게이지 중심으로 반영합니다.
const RANDOM_EVENT_BASE_CHANCE = 0.16;
const RANDOM_EVENT_MIN_GAP_WEEKS = 3;
const RANDOM_EVENT_COOLDOWN_WEEKS = 12;
const RANDOM_EVENT_RECENT_LIMIT = 8;
const RANDOM_EVENT_SEASON_LIMIT = 9;
const EVENT_STAT_GAIN_SCALE = 0.22;
const EVENT_STAT_LOSS_SCALE = 0.42;
const EVENT_REL_GAIN_SCALE = 0.65;
const EVENT_REL_LOSS_SCALE = 1.0;

// 8.7: 멘탈은 단기간에 급상승하지 않도록 별도 성장 보정.
// 스트레스 회복과 컨디션 회복은 즉시 가능하지만, '멘탈 스탯' 자체는 천천히 쌓입니다.
const MENTAL_TRAINING_GAIN_SCALE = 0.44;
const MENTAL_EVENT_GAIN_SCALE = 0.38;
const MENTAL_NEGATIVE_LOSS_SCALE = 0.85;

// 10.2 밸런스: 전체 성장은 조금 늦추고, 승부욕은 훈련·이벤트 체감 성장을 보완합니다.
const FIGHTING_TRAINING_GAIN_SCALE = 1.12;
const FIGHTING_EVENT_GAIN_SCALE = 1.08;

// 10.6: 안정성은 너무 빠르게 만능 스탯이 되지 않도록 별도 성장 보정.
const STABILITY_TRAINING_GAIN_SCALE = 0.50;
const STABILITY_EVENT_GAIN_SCALE = 0.58;
const STAT_PROGRESS_THRESHOLD = 1.18;

const ALBUM = [
  {id:"first_train", icon:"⛸️", title:"첫 훈련"},
  {id:"first_race", icon:"🏟️", title:"첫 대회"},
  {id:"first_medal", icon:"🏅", title:"첫 메달"},
  {id:"first_gold", icon:"🥇", title:"첫 금메달"},
  {id:"rival_win", icon:"🔥", title:"라이벌전 승리"},
  {id:"relay_medal", icon:"🤝", title:"계주 메달"},
  {id:"injury_return", icon:"🩹", title:"부상 복귀"},
  {id:"legend", icon:"👑", title:"레전드 후보"}
];

const EQUIPMENT = {
  basicSuit:{slot:"suit", name:"기본 훈련복", price:0, desc:"기본 복장입니다.", bonus:{}, suitClass:"suit-basic"},
  trainingSuit:{slot:"suit", name:"아카데미 훈련복", price:180, desc:"훈련 효율이 조금 증가합니다.", bonus:{growth:.04}, suitClass:"suit-training"},
  focusSuit:{slot:"suit", name:"집중 보강 슈트", price:360, desc:"자세를 안정적으로 잡아 주는 훈련 슈트입니다.", bonus:{growth:.02,stability:2}, suitClass:"suit-training"},
  nationalSuit:{slot:"suit", name:"국가대표 경기복", price:520, desc:"대회 멘탈과 명성 획득이 증가합니다.", bonus:{race:3,fame:.15}, suitClass:"suit-national"},
  eliteSuit:{slot:"suit", name:"월드투어 슈트", price:900, desc:"스피드 종목 대회 보정이 큽니다.", bonus:{race:5,speedRace:4}, suitClass:"suit-elite"},
  legendSuit:{slot:"suit", name:"레전드 블랙 슈트", price:1500, desc:"레전드를 향한 상징적인 슈트입니다.", bonus:{race:7,fame:.3}, suitClass:"suit-legend"},

  basicSkates:{slot:"skates", name:"기본 스케이트", price:0, desc:"기본 장비입니다.", bonus:{}},
  carbonSkates:{slot:"skates", name:"카본 스케이트", price:420, desc:"가속력과 최고속도 경기 보정이 있습니다.", bonus:{speedRace:5}},
  stableSkates:{slot:"skates", name:"안정형 스케이트", price:380, desc:"넘어짐과 페널티 위험을 줄입니다.", bonus:{stability:6}},
  allroundSkates:{slot:"skates", name:"올라운드 스케이트", price:560, desc:"훈련과 실전 모두 무난한 만능형 세팅입니다.", bonus:{growth:.02,race:2}},
  sprintSkates:{slot:"skates", name:"스프린트 스케이트", price:820, desc:"폭발적인 출발과 짧은 거리 스피드에 강합니다.", bonus:{speedRace:7,race:1}},

  basicBlade:{slot:"blade", name:"기본 날", price:0, desc:"기본 날입니다.", bonus:{}},
  cornerBlade:{slot:"blade", name:"코너 특화 날", price:360, desc:"코너링 경기 보정이 있습니다.", bonus:{cornerRace:5}},
  relayBlade:{slot:"blade", name:"계주 터치 날", price:460, desc:"계주 경기 보정이 있습니다.", bonus:{relayRace:7}},
  tacticalBlade:{slot:"blade", name:"전술 분석 날", price:520, desc:"라인 변화와 운영에 특화된 세팅입니다.", bonus:{race:2,cornerRace:2}},
  safetyBlade:{slot:"blade", name:"세이프티 블레이드", price:610, desc:"실수를 줄이고 안정감을 높여 줍니다.", bonus:{stability:4,race:1,externalSafety:1}},
  overspeedBlade:{slot:"blade", name:"오버스피드 블레이드", price:880, desc:"고속 구간에서 큰 장점을 제공합니다.", bonus:{speedRace:5,cornerRace:2}},

  basicHelmet:{slot:"helmet", name:"기본 헬멧", price:0, desc:"기본 안전 장비입니다.", bonus:{}},
  safetyHelmet:{slot:"helmet", name:"충격 흡수 헬멧", price:650, desc:"충돌 시 큰 부상 가능성을 조금 낮춥니다.", bonus:{externalSafety:4,stability:1}},
  aeroHelmet:{slot:"helmet", name:"에어로 헬멧", price:900, desc:"공기저항을 줄여 단거리 레이스에 유리합니다.", bonus:{speedRace:3,race:1}},
  olympicHelmet:{slot:"helmet", name:"올림픽 카본 헬멧", price:1600, desc:"큰 대회용 프리미엄 헬멧입니다. 안정성과 경기력을 함께 보정합니다.", bonus:{race:3,externalSafety:5,stability:2}},

  basicGloves:{slot:"gloves", name:"기본 장갑", price:0, desc:"기본 장갑입니다.", bonus:{}},
  gripGloves:{slot:"gloves", name:"코너 그립 장갑", price:520, desc:"코너와 접촉 상황에서 자세를 버티는 데 도움을 줍니다.", bonus:{cornerRace:2,stability:2}},
  relayGloves:{slot:"gloves", name:"계주 터치 장갑", price:780, desc:"터치 타이밍과 계주 안정성을 높입니다.", bonus:{relayRace:4,stability:1}},
  guardGloves:{slot:"gloves", name:"충돌 보호 장갑", price:980, desc:"상대 선수와의 접촉 상황에서 손과 팔 부상 위험을 낮춥니다.", bonus:{externalSafety:3,stability:2}},

  basicGuard:{slot:"guard", name:"기본 보호대", price:0, desc:"기본 보호대입니다.", bonus:{}},
  ankleGuard:{slot:"guard", name:"발목 보호대", price:700, desc:"발목 통증과 충돌 여파를 줄이는 장비입니다.", bonus:{injuryGuard:4,externalSafety:2}},
  kneeGuard:{slot:"guard", name:"무릎 보호대", price:760, desc:"넘어짐과 충돌 후 무릎 부상 가능성을 줄입니다.", bonus:{injuryGuard:5,externalSafety:2}},
  eliteGuard:{slot:"guard", name:"엘리트 풀가드 세트", price:1800, desc:"고가의 종합 보호 장비입니다. 실력을 대신하지는 않지만 위험을 줄입니다.", bonus:{injuryGuard:7,externalSafety:5,stability:2}},

  analysisTablet:{slot:"accessory", name:"영상 분석 태블릿", price:1200, desc:"훈련 후 영상 분석으로 전술과 안정성 성장에 도움을 줍니다.", bonus:{growth:.03,race:1}},
  recoveryBoots:{slot:"accessory", name:"회복 부츠", price:1450, desc:"피로 누적과 부상 회복 관리에 도움을 줍니다.", bonus:{recoveryCare:5,injuryGuard:2}},
  proTuningKit:{slot:"accessory", name:"프로 튜닝 키트", price:1700, desc:"경기 전 장비 세팅 완성도를 높입니다.", bonus:{race:2,cornerRace:2,speedRace:2}},
  legendCareSet:{slot:"accessory", name:"레전드 관리 세트", price:2600, desc:"베테랑 시즌을 위한 최고가 관리 장비입니다.", bonus:{growth:.02,recoveryCare:6,injuryGuard:5,externalSafety:3}}
};

function endingMedalTotal(g){
  const m=g.player.medals||{};
  return (m.gold||0)+(m.silver||0)+(m.bronze||0);
}
function endingMedalScore(g){
  const m=g.player.medals||{};
  return (m.gold||0)*28+(m.silver||0)*18+(m.bronze||0)*12;
}
function endingFanScore(g){
  const fan=Math.max(0,g.player.fan||0);
  return Math.sqrt(fan)*11;
}
function endingBestRecordScore(g,event){
  const t=g.player.bestTimes?.[event];
  if(!t) return 0;
  const gender=g.player.gender==="Women"?"Women":"Men";
  const b=timeBenchmark(event, gender);
  if(!b) return 0;
  const gap=Math.max(0, b.rookie-b.wr);
  const close=Math.max(0, Math.min(1, (b.rookie-t)/gap));
  return close*160;
}
function endingOlympicPathBonus(g){
  return (g.player.olympicGold||0)*150 + (g.player.olympicMedals||0)*52;
}
function endingInternationalPathBonus(g){
  return (g.player.internationalCompetitionCount||0)*12 + endingMedalScore(g)*0.65;
}
function endingStoryCount(g, words=[]){
  const logs=(g.logs||[]).map(l=>`${l.title} ${l.text}`).join(" ");
  return words.reduce((n,w)=>n+(logs.includes(w)?1:0),0);
}

function endingNegativeScore(g){
  const p=g.player||{};
  const s=p.stats||{};
  const rel=p.relationships||{};
  const controversy=p.controversy||0;
  const negative=p.negativeChoiceCount||0;
  const warnings=p.warningCount||0;
  const ethicsGap=Math.max(0,42-(s.integrity||55))*3.2 + Math.max(0,42-(s.sportsmanship||55))*2.8;
  const relationGap=Math.max(0,34-(rel.coach||50))*1.1 + Math.max(0,34-(rel.teammates||50))*1.2 + Math.max(0,30-(rel.family||50))*.7 + Math.max(0,28-(rel.rival||50))*.45;
  const stateGap=Math.max(0,(p.stress||0)-75)*.9 + Math.max(0,(p.fatigue||0)-86)*.65 + Math.max(0,(p.injuryRisk||0)-82)*.65;
  const logScore=endingStoryCount(g,["논란","경고","징계","반칙","보복","무시","팀 내 갈등","고립"])*10;
  const objective = ethicsGap + relationGap + stateGap + controversy*16 + warnings*28 + logScore;
  const eligibility = negative>=5 || controversy>=5 || warnings>=1 || ethicsGap>=20 || relationGap>=18 || stateGap>=18;
  return eligibility ? objective + negative*10 : Math.min(45, objective*.18 + negative*2);
}
function endingBurnoutScore(g){
  const p=g.player||{};
  const s=p.stats||{};
  return Math.max(0,(p.stress||0)-50)*2.1 + Math.max(0,(p.injuryRisk||0)-55)*1.8 + (p.aftereffects?.length||0)*32 + Math.max(0,60-(s.recovery||60))*1.2 + Math.max(0,60-(s.mental||60))*1.1 + endingStoryCount(g,["부상","슬럼프","무리","강행","재활"])*12;
}

const ENDINGS = [
  {
    id:"olympic", title:"올림픽 챔피언", icon:"🥇",
    desc:"올림픽 금메달과 큰 경기 멘탈로 정점에 선 선수",
    score:g=>endingOlympicPathBonus(g) + g.player.stats.mental*1.05 + g.player.stats.fighting*.75 + endingMedalScore(g)*.28
  },
  {
    id:"olympicMulti", title:"올림픽 다관왕", icon:"👑",
    desc:"여러 올림픽 종목에서 반복적으로 시상대에 오른 선수",
    score:g=>(g.player.olympicGold||0)>=2 || (g.player.olympicMedals||0)>=3
      ? (g.player.olympicGold||0)*115 + (g.player.olympicMedals||0)*82 + endingMedalScore(g)*.18 + g.player.stats.stability*.45
      : (g.player.olympicMedals||0)*70 + (g.player.olympicGold||0)*95
  },
  {
    id:"olympicNoGoldLegend", title:"올림픽 무관의 레전드", icon:"🌙",
    desc:"올림픽 금메달 없이도 긴 커리어와 국제 성과로 기억되는 선수",
    score:g=>(g.player.olympicGold||0)===0
      ? endingInternationalPathBonus(g)*1.15 + (g.player.medals?.silver||0)*26 + (g.player.medals?.bronze||0)*22 + g.player.stats.mental*.75 + g.player.stats.recovery*.55
      : Math.max(0, 80-(g.player.olympicGold||0)*35)
  },
  {
    id:"nationalAce", title:"대표팀 에이스", icon:"🇰🇷",
    desc:"선발전과 국제대회에서 대표팀의 중심이 된 선수",
    score:g=>{
      const rank=g.player.nationalTeamRank||99;
      const rankBonus=rank<=1?145:rank<=3?125:rank<=6?78:rank<=8?42:0;
      return rankBonus + endingInternationalPathBonus(g) + g.player.stats.mental*.55 + g.player.stats.tactics*.45 + g.player.stats.relay*.35;
    }
  },
  {
    id:"steadyInternational", title:"꾸준한 국제대회 강자", icon:"🌍",
    desc:"한 번의 폭발보다 긴 시즌 동안 안정적으로 성과를 쌓은 선수",
    score:g=>(g.player.internationalCompetitionCount||0)*18 + endingMedalTotal(g)*18 + g.player.stats.stability*1.05 + g.player.stats.recovery*.85 + g.player.stats.tactics*.45
  },
  {
    id:"rivalChampion", title:"라이벌을 넘어선 챔피언", icon:"🔥",
    desc:"라이벌 구도 끝에 승리와 성과를 모두 잡은 선수",
    score:g=>(g.player.rivalWins||0)*48 - (g.player.rivalLosses||0)*13 + g.player.relationships.rival*.95 + endingMedalScore(g)*.35 + g.player.stats.fighting*.75
  },
  {
    id:"eternalRival", title:"영원한 라이벌", icon:"⚔️",
    desc:"승패보다 오래 기억될 라이벌 서사를 남긴 선수",
    score:g=>Math.min(g.player.rivalWins||0,g.player.rivalLosses||0)*62 + Math.max(g.player.rivalWins||0,g.player.rivalLosses||0)*14 + g.player.relationships.rival*1.25 + g.player.stats.sportsmanship*.45
  },
  {
    id:"relayLegend", title:"계주 레전드", icon:"🤝",
    desc:"계주 센스와 팀워크로 팀을 살린 선수",
    score:g=>g.player.stats.relay*1.65 + g.player.relationships.teammates*1.25 + (g.player.bestRelay?105:0) + endingStoryCount(g,["계주","혼성계주"])*24 + endingMedalScore(g)*.22
  },
  {
    id:"worldRecord", title:"세계기록 보유자", icon:"⏱️",
    desc:"기록과 스피드로 시대의 기준을 바꾼 선수",
    score:g=>{
      const recordScore=Math.max(
        endingBestRecordScore(g,"500m"),
        endingBestRecordScore(g,"1000m"),
        endingBestRecordScore(g,"1500m")
      );
      return recordScore + g.player.stats.topSpeed*1.15 + g.player.stats.acceleration*.95 + g.player.stats.reaction*.65;
    }
  },
  {
    id:"comeback", title:"부상 극복의 아이콘", icon:"🩹",
    desc:"부상과 후유증을 견디고 다시 빙판으로 돌아온 선수",
    score:g=>{
      const injuryPath=(g.album?.injury_return?145:0) + (g.player.aftereffects?.length||0)*28 + endingStoryCount(g,["부상","재활","복귀"])*18;
      return injuryPath + g.player.stats.recovery*1.35 + g.player.stats.mental*.95 + Math.max(0,100-(g.player.injuryRisk||0))*.25;
    }
  },
  {
    id:"tactician", title:"빙판의 전략가", icon:"🧠",
    desc:"전술, 추월, 코치와의 신뢰로 경기를 설계한 선수",
    score:g=>g.player.stats.tactics*1.65 + g.player.stats.passing*1.15 + g.player.relationships.coach*.95 + endingStoryCount(g,["전술","분석","추월"])*18 + endingMedalScore(g)*.18
  },
  {
    id:"idol", title:"국민적 스타", icon:"🌟",
    desc:"팬과 명성, 스타성을 함께 얻은 선수",
    score:g=>(g.player.fame||0)*1.05 + endingFanScore(g) + endingMedalScore(g)*.38 + (g.player.score||0)*.035 + g.player.stats.sportsmanship*.55 + g.player.stats.integrity*.45
  },
  {
    id:"taintedAce", title:"논란의 에이스", icon:"⚠️",
    desc:"실력은 뛰어났지만 반칙, 신경전, 팀 내 갈등으로 평가가 갈린 선수",
    score:g=>endingNegativeScore(g)*1.15 + endingMedalScore(g)*.22 + (g.player.stats.fighting||0)*.45 + Math.max(0,(g.player.fame||0)-50)*.35
  },
  {
    id:"isolatedTalent", title:"고립된 천재", icon:"🧊",
    desc:"능력은 있었지만 코치·팀원·라이벌과의 관계가 무너진 선수",
    score:g=>{
      const rel=g.player.relationships||{};
      const isolation=Math.max(0,45-(rel.coach||50))*1.4 + Math.max(0,45-(rel.teammates||50))*1.5 + Math.max(0,40-(rel.family||50))*.8 + Math.max(0,50-(rel.rival||50))*.6;
      return isolation + endingNegativeScore(g)*.75 + (g.player.stats.topSpeed||0)*.35 + (g.player.stats.fighting||0)*.35;
    }
  },
  {
    id:"burnout", title:"무너진 유망주", icon:"🌑",
    desc:"무리한 강행과 부상, 스트레스 누적으로 커리어가 꺾인 선수",
    score:g=>endingBurnoutScore(g)*1.2 + Math.max(0,70-(g.player.stats.stability||70))*1.1 + Math.max(0,70-(g.player.stats.recovery||70))*1.2
  }
];


let game = null;
let candidate = null;
let candidateSignature = null;
let lastWeekSummary = null;

function totalMedals(){
  if(!game || !game.player) return 0;
  const m=game.player.medals; return (m.gold||0)+(m.silver||0)+(m.bronze||0);
}
function adjustRelationship(key, amount){
  ensureGameDefaults();
  game.player.relationships[key]=clamp((game.player.relationships[key]||0)+amount,0,100);
}
function addStoryFlag(flag){
  ensureGameDefaults();
  if(!game.player.storyFlags.includes(flag)) game.player.storyFlags.push(flag);
  if(flag==="romance_started" || flag==="dating_slow"){ game.player.romance.status="dating"; game.player.romance.weeks=0; game.player.romance.cooldown=10; socialName("partner"); }
  if(flag==="romance_declined_good" || flag==="romance_declined_bad"){ game.player.romance.status="none"; game.player.romance.cooldown=18; }
  if(flag==="romance_broke_mature" || flag==="romance_broke_hard"){ game.player.romance.status="none"; game.player.romance.cooldown=24; }
}
function hasStoryFlag(flag){ ensureGameDefaults(); return game.player.storyFlags.includes(flag); }

function isNegativeChoice(choice){
  if(!choice) return false;
  const txt = `${choice.text||""} ${choice.log||""} ${choice.dialogue||""}`;
  // 12.4: '라이벌의 도발을 동력으로 삼는다' 같은 정상 선택은 부정 플레이로 보지 않음.
  // 실제 부정 루트는 보복·반칙·탓하기·무시·거친 신경전·무리한 강행처럼 명백히 나쁜 선택만 누적.
  if(/심판·상대·환경 탓|외부 탓|보복|반칙|함정|거칠게|똑같이 밀어붙|팀 분위기보다 내 기록|겉으로만 사과|억울하다고 항의|더 세게|비난|공격|숨긴다/.test(txt)) return true;
  if(/분노를 억누르지 않고|분노를 훈련 강도로|무리하게 올린다|강행/.test(txt) && choice.status && ((choice.status.injuryRisk||0)>=5 || (choice.status.stress||0)>=5 || (choice.status.fatigue||0)>=6)) return true;
  if(choice.stats && ((choice.stats.integrity||0)<=-2 || (choice.stats.sportsmanship||0)<=-2)) return true;
  if(choice.relationships && Object.values(choice.relationships).some(v=>v<=-5)) return true;
  return false;
}
function registerNegativeChoice(choice){
  if(!game || !game.player || !isNegativeChoice(choice)) return;
  const p=game.player;
  p.negativeChoiceCount=(p.negativeChoiceCount||0)+1;
  p.controversy=clamp((p.controversy||0)+1,0,999);
  if((p.stats.integrity||50)>25) addRecoverableStatLoss("integrity", .45);
  if((p.stats.sportsmanship||50)>25 && chance(.55)) addRecoverableStatLoss("sportsmanship", .35);
  if((p.relationships.coach||50)>10 && chance(.35)) adjustRelationship("coach",-1);
  if((p.relationships.teammates||50)>10 && chance(.40)) adjustRelationship("teammates",-1);
  if(p.negativeChoiceCount===3) addLog("위험한 평판", "거친 선택이 반복되며 코치진과 주변 선수들이 우려하기 시작했습니다.");
  if(p.negativeChoiceCount===6) addLog("논란 누적", "승부욕과 거친 태도가 함께 드러나며 경기장 안팎의 평가가 엇갈리고 있습니다.");
}
function negativeObjectiveBreakdown(){
  const p=game.player;
  const s=p.stats||{};
  const r=p.relationships||{};
  return {
    badEthics: Math.max(0,42-(s.integrity||55)) + Math.max(0,42-(s.sportsmanship||55)),
    badState: Math.max(0,(p.stress||0)-72) + Math.max(0,(p.fatigue||0)-82) + Math.max(0,(p.injuryRisk||0)-78),
    badRelations: Math.max(0,35-(r.coach||50)) + Math.max(0,35-(r.teammates||50)) + Math.max(0,30-(r.family||50)) + Math.max(0,30-(r.rival||50))*.5,
    badPublic: (p.controversy||0)*6 + (p.warningCount||0)*14 + Math.max(0,20-(p.fan||20))*.08,
    negativeChoices: (p.negativeChoiceCount||0)
  };
}
function negativePlayEligible(){
  const p=game.player;
  const b=negativeObjectiveBreakdown();
  const objectiveScore = b.badEthics + b.badState*.55 + b.badRelations*.65 + b.badPublic;
  // 12.4: 정석 성장 중에는 부정 이벤트 금지.
  // 나쁜 선택이 반복되고, 실제 스탯/상태/관계/평판 중 하나 이상이 명확히 망가져야 함.
  const enoughBadChoices = (p.negativeChoiceCount||0) >= 4 || (p.controversy||0) >= 4 || (p.warningCount||0) >= 1;
  const clearlyBroken =
    (p.stats.integrity||55) <= 38 ||
    (p.stats.sportsmanship||55) <= 38 ||
    (p.stress||0) >= 82 ||
    (p.fatigue||0) >= 88 ||
    (p.injuryRisk||0) >= 84 ||
    (p.relationships.coach||50) <= 30 ||
    (p.relationships.teammates||50) <= 30 ||
    (p.controversy||0) >= 5 ||
    objectiveScore >= 18;
  return enoughBadChoices && clearlyBroken;
}
function negativePlayRiskScore(){
  const b=negativeObjectiveBreakdown();
  const objectiveScore = b.badEthics + b.badState*.55 + b.badRelations*.65 + b.badPublic;
  return Math.min(.40, objectiveScore*.012 + (b.negativeChoices||0)*.025);
}
function maybeTriggerNegativePlayEvent(){
  if(!game || document.querySelector(".event-modal.open")) return false;
  ensureGameDefaults();
  const p=game.player;
  if(!negativePlayEligible()) return false;
  const key=`negative_${game.season}_${game.week}`;
  if(game.flags?.[key]) return false;
  const prob=Math.min(.34, .04 + negativePlayRiskScore());
  if(!chance(prob)) return false;
  game.flags[key]=true;

  const rivalOk = ((p.relationships.rival||0)<=20 || (p.relationships.rival||0)>=70) && ((game.eventState?.rivalSeasonCount||0)<2) && (game.week-(game.eventState?.rivalLastWeek??-99)>=14);
  const type = (p.stats.integrity||50)<34 || (p.stats.sportsmanship||50)<34 || (p.controversy||0)>=6 ? "warning" : (p.relationships.teammates||50)<32 || (p.relationships.coach||50)<30 ? "team" : rivalOk ? "rival" : "warning";
  if(type==="warning"){
    p.warningCount=(p.warningCount||0)+1;
    openEvent("심판진의 경고", "반복된 거친 선택과 낮아진 스포츠맨십이 누적되며 심판진과 코치진이 공식적으로 주의를 줬습니다. 계속 같은 방식으로 밀어붙이면 결과보다 평판이 먼저 흔들릴 수 있습니다.", [
      {text:"억울하다고 항의하며 더 세게 나가겠다고 말한다", stats:{fighting:1,integrity:-2,sportsmanship:-2,stability:-1}, status:{stress:7,fame:2,fan:-18}, relationships:{coach:-4,teammates:-3,rival:-2}, logTitle:"논란", log:"심판 경고에 강하게 반발하며 논란이 커졌습니다.", flags:["negative_warning_escalated"]},
      {text:"겉으로만 사과하고 다음 경기에서 갚아 주겠다고 다짐한다", stats:{fighting:1,mental:-1,integrity:-1,sportsmanship:-1}, status:{stress:4,fan:-8}, relationships:{coach:-2,teammates:-1}, logTitle:"불안한 사과", log:"형식적인 사과로 상황은 넘겼지만 속으로는 보복심이 남았습니다.", flags:["negative_fake_apology"]},
      {text:"잘못을 인정하고 레이스 방식을 고치겠다고 약속한다", stats:{integrity:1,sportsmanship:1,stability:0.5}, status:{stress:-5,fan:6}, relationships:{coach:3,teammates:2,rival:1}, logTitle:"태도 교정", log:"거친 레이스를 돌아보고 페어플레이를 다시 다짐했습니다.", noVariance:true}
    ], {speaker:"심판진", role:"official", art:"crowd", icon:"⚠️", tag:"논란", quote:"이건 승부욕이 아니라 위험한 레이스로 보일 수 있습니다.", expression:"angry"});
  }else if(type==="team"){
    openEvent("라커룸의 차가운 공기", "팀원들과의 관계가 크게 나빠지면서 함께 훈련하는 것 자체가 불편해지기 시작했습니다. 실력과 별개로, 라커룸 안의 신뢰가 흔들리고 있습니다.", [
      {text:"팀 분위기보다 내 기록이 먼저라고 말한다", stats:{fighting:1,relay:-2,integrity:-1}, status:{stress:5,fan:-8}, relationships:{teammates:-6,coach:-2}, logTitle:"팀 내 갈등", log:"팀 분위기보다 개인 기록을 우선하며 팀원들과 거리가 생겼습니다.", flags:["negative_team_conflict"]},
      {text:"필요한 말만 하고 혼자 훈련한다", stats:{topSpeed:0.5,mental:-1,relay:-1}, status:{stress:3}, relationships:{teammates:-3,family:-1}, logTitle:"고립", log:"혼자 훈련하는 시간이 늘며 팀 내 고립감이 커졌습니다.", flags:["negative_isolation"]},
      {text:"팀원들에게 사과하고 계주 훈련을 다시 맞춘다", stats:{relay:1,sportsmanship:1,integrity:1}, status:{stress:-4}, relationships:{teammates:5,coach:2}, logTitle:"관계 회복", log:"팀원들과 다시 호흡을 맞추며 갈등을 조금 풀었습니다.", noVariance:true}
    ], {speaker:"팀원", role:"teammate", art:"locker", icon:"🧊", tag:"팀 내 갈등", quote:"너랑 같이 뛰면 우리가 도구가 된 것 같아.", expression:"sad"});
  }else{
    if(game.eventState){
      game.eventState.rivalLastWeek=game.week;
      game.eventState.rivalSeasonCount=(game.eventState.rivalSeasonCount||0)+1;
    }
    openEvent("라이벌과의 위험한 신경전", "라이벌과의 경쟁이 선을 넘기 시작했습니다. 관중은 자극적인 장면에 반응하지만, 작은 접촉 하나가 시즌 전체를 흔들 수도 있습니다.", [
      {text:"다음 경기에서 똑같이 밀어붙인다", stats:{fighting:1,passing:0.5,integrity:-2,sportsmanship:-2,stability:-1}, status:{stress:6,injuryRisk:7,fame:2,fan:-10}, relationships:{rival:-5,coach:-2}, logTitle:"위험한 신경전", log:"라이벌에게 맞서 거칠게 밀어붙이며 논란이 커졌습니다.", flags:["negative_rival_escalation"]},
      {text:"말로는 참지만 훈련 강도를 무리하게 올린다", stats:{fighting:1,recovery:-1,mental:-1}, status:{fatigue:8,injuryRisk:6,stress:5}, relationships:{coach:-1}, logTitle:"무리한 강행", log:"분노를 훈련 강도로 풀며 몸에 무리가 쌓였습니다.", flags:["negative_overtraining"]},
      {text:"라이벌과 선을 정하고 경기로만 붙기로 한다", stats:{mental:1,sportsmanship:1,stability:0.5}, status:{stress:-4,injuryRisk:-2}, relationships:{rival:3,coach:2}, logTitle:"경쟁의 선", log:"라이벌과의 경쟁을 경기 안으로 되돌리기로 했습니다.", noVariance:true}
    ], {speaker:game.rival?.name||"라이벌", role:"rival", art:"rival", icon:"🔥", tag:"위험한 라이벌전", quote:"그 정도로 이기고 싶으면, 어디 한번 끝까지 해 보자.", expression:"angry"});
  }
  return true;
}

function applyRandomChoiceVariance(choice){
  // 같은 이벤트/같은 선택지도 매번 완전히 같은 결과가 나오지 않도록 작은 변동을 줍니다.
  if(!choice || !game || choice.noVariance) return;
  const p=game.player;
  const candidates={
    training:["reaction","acceleration","topSpeed","stamina","cornering","passing","tactics","relay"],
    mental:["mental","fighting","stability","sportsmanship","integrity","recovery"]
  };
  const text=(choice.text||"") + " " + (choice.log||"") + " " + (choice.dialogue||"");
  const risky = /강행|밀어붙|보복|똑같이|공격|도발|무시|우선|거절|그대로/.test(text);
  const careful = /휴식|회복|상담|정중|차분|기초|점검|대화|분석|존중|규정|검사/.test(text);
  let note="";
  if(risky){
    if(chance(.46)){
      const stat=pick(["stability","mental","sportsmanship","integrity","recovery"]);
      addRecoverableStatLoss(stat, 0.50);
      p.fatigue=clamp(p.fatigue+Math.round(rand(1,4)),0,100);
      p.injuryRisk=clamp(p.injuryRisk+Math.round(rand(1,4)),0,100);
      note=`무리한 선택의 부작용으로 ${STAT_LABELS[stat]}이 소폭 하락하고 피로/부상 위험이 늘었습니다.`;
    }else{
      const stat=pick(["fighting","passing","acceleration","tactics"]);
      addStatProgress(stat,.25);
      note=`위험을 감수한 선택이 이번에는 자극이 되어 ${STAT_LABELS[stat]} 성장 게이지가 조금 올랐습니다.`;
    }
  }else if(careful){
    if(chance(.38)){
      const stat=pick(["topSpeed","acceleration","reaction","passing"]);
      if((p.stats[stat]||0)>32) addRecoverableStatLoss(stat, 0.35);
      p.condition=clamp(p.condition+Math.round(rand(1,3)),0,100);
      p.fatigue=clamp(p.fatigue-Math.round(rand(1,3)),0,100);
      note=`신중한 선택으로 몸은 회복됐지만 훈련 자극이 줄어 ${STAT_LABELS[stat]} 감각이 조금 떨어졌습니다.`;
    }else{
      const stat=pick(["mental","stability","recovery","integrity","sportsmanship"]);
      addStatProgress(stat,.25);
      note=`신중한 선택이 좋은 흐름으로 이어져 ${STAT_LABELS[stat]} 성장 게이지가 조금 올랐습니다.`;
    }
  }else if(chance(.28)){
    if(chance(.5)){
      const stat=pick([...candidates.training,...candidates.mental]);
      addStatProgress(stat,.2);
      note=`예상보다 잘 맞아떨어져 ${STAT_LABELS[stat]} 성장 게이지가 조금 올랐습니다.`;
    }else{
      const stat=pick(["reaction","cornering","passing","mental","stability"]);
      addRecoverableStatLoss(stat, 0.40);
      note=`컨디션과 타이밍이 맞지 않아 ${STAT_LABELS[stat]} 감각이 흔들렸습니다.`;
    }
  }
  if(note){
    choice.variationNote=note;
    addLog("선택 변동", note);
  }
}
function applyInjuryStatLoss(severe, hardCount=0, reason='과훈련과 부상'){
  const p=game.player;
  const pool=severe
    ? ["cornering","stability","topSpeed","acceleration","stamina","reaction"]
    : ["stability","stamina","cornering","recovery","reaction"];
  const count=severe ? Math.floor(rand(1,3)) : 1;
  const changed=[];
  const used=new Set();
  for(let i=0;i<count;i++){
    let stat=pick(pool.filter(s=>!used.has(s)));
    if(!stat) break;
    used.add(stat);
    const lossAmount=severe ? (hardCount>=2 ? 0.95 : 0.72) : 0.48;
    const loss=addRecoverableStatLoss(stat, lossAmount);
    if(loss>0) changed.push(`${STAT_LABELS[stat]} -${loss}`);
  }
  if(changed.length){
    addLog("부상으로 인한 능력 저하", `${reason} 여파로 ${changed.join(", ")}.`);
  }else{
    addLog("부상 여파", "능력치가 즉시 크게 떨어지지는 않았지만, 회복 전까지 컨디션과 훈련 효율이 낮아집니다.");
  }
}


function mentalVulnerabilityScore(){
  ensureGameDefaults();
  const p=game.player;
  const s=p.stats || {};
  let v=0;

  // 12.2: 메달 실패만으로 매번 슬럼프가 오지 않도록 멘탈 취약도 가중치를 완화.
  // 슬럼프는 낮은 멘탈·높은 스트레스·큰 기대치가 겹칠 때 주로 발생합니다.
  v += Math.max(0, 62-(s.mental||50)) * 0.007;
  v += Math.max(0, 52-(s.integrity||50)) * 0.0035;
  v += Math.max(0, 52-(s.sportsmanship||50)) * 0.0035;
  v += Math.max(0, 55-(s.stability||50)) * 0.0025;
  v += Math.max(0,(p.stress||0)-45) * 0.0045;
  v += Math.max(0,(p.fatigue||0)-65) * 0.0024;
  v += Math.max(0,(p.injuryRisk||0)-60) * 0.0016;
  if(p.fame>=120) v += .05;
  if(p.fame>=200) v += .05;
  if(p.fan>=260) v += .05;
  if(p.fan>=450) v += .05;
  if(p.slump) v += .12;
  v -= Math.max(0,(s.recovery||50)-68) * 0.0035;
  v -= Math.max(0,(s.mental||50)-76) * 0.004;
  if(p.hidden?.includes("슬럼프 저항력")) v -= .18;
  if(p.personality?.includes("침착함")) v -= .08;
  if(p.personality?.includes("예민함")) v += .05;
  return Math.max(0, Math.min(.65, v));
}
function isMentallyFragile(){
  const s=game.player.stats||{};
  const p=game.player;
  return (s.mental||50)<58 ||
         (p.stress||0)>70 ||
         (p.fatigue||0)>82 ||
         !!p.slump;
}
function applySlumpStatPenalty(severity){
  const p=game.player;
  const pool = severity>=3 ? ["mental","stability","fighting","reaction","passing","tactics"] : ["mental","stability","fighting","recovery"];
  const count = severity>=3 ? 2 : 1;
  const changed=[];
  const used=new Set();
  for(let i=0;i<count;i++){
    const candidates=pool.filter(k=>!used.has(k));
    if(!candidates.length) break;
    const stat=pick(candidates);
    used.add(stat);
    const lossAmount = severity>=3 ? 0.82 : 0.55;
    const loss = addRecoverableStatLoss(stat, lossAmount);
    if(loss>0) changed.push(`${STAT_LABELS[stat]} -${loss}`);
  }
  if(changed.length) addLog("슬럼프 능력 저하", changed.join(", "));
  else addLog("슬럼프 영향", "능력치가 즉시 크게 떨어지지는 않았지만, 훈련 효율과 경기 집중력에 부담이 생겼습니다.");
}
function enterSlump(reason, severity=2){
  ensureGameDefaults();
  const p=game.player;
  const weeks = severity>=3 ? Math.floor(rand(4,6)) : Math.floor(rand(2,4));
  p.slump = {weeks, severity, reason};
  p.stress=clamp((p.stress||0)+8+severity*3,0,100);
  p.condition=clamp(p.condition-3-severity,0,100);
  p.fatigue=clamp(p.fatigue+3+severity,0,100);
  applySlumpStatPenalty(severity);
  addLog("슬럼프", `${reason} 때문에 ${weeks}주 동안 슬럼프에 빠졌습니다. 훈련 성장과 대회 집중력이 떨어집니다.`);
  game.lastSpeaker=game.player.name;
  game.lastDialogue="괜찮다고 생각했는데, 빙판 위에 서면 몸보다 마음이 먼저 굳어 버린다.";
  game.scene="rest";
}
function triggerPostResultNegativeEvent(context){
  const p=game.player;
  const title = context.kind==="selection" ? "선발전 이후의 흔들림" : "아쉬운 결과 이후의 정리";
  const body = context.kind==="selection"
    ? `${context.label} 결과가 기대에 미치지 못했습니다. 대한민국 대표 선발 실패는 충분히 흔들릴 수 있는 사건입니다.`
    : `${context.label}에서 메달권에 들지 못했습니다. 평범한 실패는 지나갈 수 있지만, 멘탈이 약하거나 압박이 누적된 상태라면 결과를 정리하는 과정이 필요합니다.`;
  openEvent(title, body, [
    {text:"결과를 인정하고 원인을 기록한다", stats:{mental:1,integrity:1,tactics:1}, status:{stress:-5,condition:2}, relationships:{coach:2}, dialogueSpeaker:"코치", dialogue:"좋아. 결과를 보는 태도가 다음 결과를 만든다.", log:"결과를 차분히 분석하며 멘탈 회복의 실마리를 찾았습니다.", noVariance:true},
    {text:"혼자 삭이며 훈련장에 남는다", stats:{fighting:1,mental:-1,stability:-1}, status:{stress:6,fatigue:5,injuryRisk:3}, dialogueSpeaker:p.name, dialogue:"괜찮아. 더 하면 돼. 더 하면… 될 거야.", log:"분한 마음을 훈련에 쏟았지만 마음의 부담이 커졌습니다."},
    {text:"심판·상대·환경 탓을 한다", stats:{integrity:-2,sportsmanship:-2,mental:-1}, status:{fame:-2,fan:-8,stress:4}, relationships:{coach:-3,rival:3,hostileAthlete:4}, dialogueSpeaker:"코치", dialogue:"그 말이 습관이 되면, 네 레이스도 멈춘다.", log:"결과를 외부 탓으로 돌리며 인성과 스포츠맨십이 떨어졌습니다.", noVariance:true}
  ], {speaker:p.name, role:"player", art:"night", icon:"🌧️", tag:"부정 이벤트", quote:"이번 결과를 어떻게 받아들여야 하지?", expression:"sad"});
}

function expectedResultPressure(){
  const p=game.player;
  let e=0;
  if((p.fame||0)>=60) e+=1;
  if((p.fame||0)>=120) e+=1;
  if((p.fan||0)>=140) e+=1;
  if((p.fan||0)>=280) e+=1;
  if(p.nationalTeamSelected) e+=1;
  if((p.nationalTeamRank||99)<=3) e+=1;
  if((p.medals?.gold||0)>=3) e+=1;
  return e;
}
function postResultDisappointmentScore(context){
  const p=game.player;
  const pressure=expectedResultPressure();
  let d=0;

  if(context.kind==="race"){
    // 12.2: 메달을 못 땄다고 매번 슬럼프가 오지는 않음.
    // 4~6위는 큰 대회/높은 기대/낮은 멘탈이 겹칠 때만 흔들림 후보가 됩니다.
    if(context.medal) return 0;

    if(context.rank>=4) d+=0.25;
    if(context.rank>=6) d+=0.75;
    if(context.rank>=8) d+=1.25;
    if(context.rank>=10) d+=1.25;
    if(context.major && context.rank>=6) d+=0.75;
    if(context.major && context.rank>=9) d+=0.5;
    d += Math.min(1.25, pressure*.35);
  }else if(context.kind==="selection"){
    // 12.1: 대한민국 대표 선발은 매우 어렵기 때문에, 선발 성공 자체는 슬럼프 원인이 되지 않음.
    // 1~3위는 물론 4~8위 대표권/예비권도 '아쉽다'는 이유만으로 부진 이벤트를 발생시키지 않습니다.
    if(!context.failed) return 0;

    if(context.failed) d+=4;
    if(context.major) d+=1;
    d += Math.min(2, pressure);
  }
  return d;
}

function medalAftermathPressureScore(context){
  if(context.kind!=="race" || !context.medal) return 0;
  const pressure=expectedResultPressure();
  let score=0;
  if(context.medal==="silver" || context.rank===2) score+=2;   // 잘했지만 결승에서 진 아쉬움
  if(context.medal==="bronze" || context.rank===3) score+=1;   // 메달은 땄지만 더 높은 목표
  if(context.major) score+=1;
  score += Math.min(3, pressure);
  if((game.player.relationships?.rival||0)>55 && context.rank>=2) score+=1;
  return score;
}
function triggerMedalAftermathEvent(context){
  const p=game.player;
  const medalName = context.medal==="gold" ? "금메달" : context.medal==="silver" ? "은메달" : "동메달";
  let title="메달 이후의 마음";
  let body=`${context.label}에서 ${medalName}을 따냈습니다. 분명히 좋은 결과지만, 시상식이 끝난 뒤에는 다음 목표와 주변의 기대가 더 크게 느껴집니다.`;
  let quote="메달은 기쁜데, 이제 더 잘해야 한다는 말도 같이 들려.";
  if(context.rank===2){
    title="결승에서 만난 벽";
    body=`${context.label}에서 은메달을 따냈습니다. 좋은 결과였지만, 마지막 순간 앞선 선수를 넘지 못했다는 아쉬움도 남습니다.`;
    quote="졌다는 사실보다, 다음엔 어떻게 넘을지가 더 중요해.";
  }else if(context.rank===3){
    title="메달과 다음 목표";
    body=`${context.label}에서 동메달을 따냈습니다. 시상대에 오른 기쁨은 분명하지만, 더 높은 자리로 가고 싶다는 마음도 커집니다.`;
    quote="오늘은 기뻐하자. 그리고 내일부터 다시 올라가자.";
  }else if(context.medal==="gold" && expectedResultPressure()>=3){
    title="금메달 이후의 기대";
    body=`${context.label}에서 금메달을 따냈습니다. 기쁨이 크지만, 팬과 주변의 기대도 함께 커지고 있습니다.`;
    quote="이제 다들 다음 금메달을 당연하게 생각하는 걸까?";
  }
  openEvent(title, body, [
    {text:"오늘의 메달을 충분히 기뻐한다", stats:{mental:0.5,integrity:1}, status:{stress:-5,condition:2}, relationships:{family:2,teammates:1}, dialogueSpeaker:"코치", dialogue:"맞아. 기뻐할 줄 아는 선수는 다시 도전할 힘도 생긴다.", log:`${medalName}의 의미를 받아들이며 마음을 회복했습니다.`, noVariance:true},
    {text:"부족한 부분을 기록하고 다음 훈련 목표를 세운다", stats:{tactics:1,fighting:1,mental:0.3}, status:{stress:1,fatigue:1}, relationships:{coach:2}, dialogueSpeaker:p.name, dialogue:"좋은 결과였지만, 아직 더 줄일 수 있는 구간이 있어.", log:"메달의 기쁨과 아쉬움을 다음 훈련 목표로 바꾸었습니다.", noVariance:true},
    {text:"커진 기대가 부담스럽다고 솔직히 말한다", stats:{mental:0.5,integrity:1}, status:{stress:-3,condition:1}, relationships:{coach:1,family:1}, dialogueSpeaker:"코치", dialogue:"부담을 말로 꺼내는 것도 훈련이야. 숨기지 말자.", log:"커진 기대를 혼자 짊어지지 않기로 했습니다.", noVariance:true}
  ], {speaker:p.name, role:"player", art:"victory", icon:"🏅", tag:"메달 이후", quote, expression:"soft"});
}
function maybeHandleMedalAftermath(context){
  if(context.kind!=="race" || !context.medal) return false;
  const score=medalAftermathPressureScore(context);
  if(score<=0) return false;
  const prob=Math.min(.58, .10 + score*.09);
  if(!chance(prob)) return false;
  triggerMedalAftermathEvent(context);
  return true;
}

function handlePostCompetitionMentalOutcome(context){
  ensureGameDefaults();
  const p=game.player;
  if(context.kind==="race" && context.medal) return maybeHandleMedalAftermath(context);
  if(context.kind==="selection" && !context.failed) return false;

  const disappointment = postResultDisappointmentScore(context);
  if(disappointment<=0) return false;

  const vulnerability = mentalVulnerabilityScore();
  const fragile = isMentallyFragile();
  const isRace = context.kind==="race";
  const isMinorRaceMiss = isRace && (context.rank||99) <= 6 && !context.major;

  // 12.2: 일반 대회 4~6위 정도는 슬럼프 이벤트를 거의 띄우지 않음.
  if(isMinorRaceMiss && !fragile) return false;

  const weeksSinceSlump = game.week - (p.lastSlumpWeek ?? -99);
  const slumpCooldown = weeksSinceSlump < 12;

  let prob;
  if(isRace){
    prob = 0.025 + vulnerability*.22 + Math.max(0, disappointment-1.2)*.035;
    if(context.major) prob += .035;
    if((context.rank||99)>=8) prob += .025;
    if((context.rank||99)>=10) prob += .025;
    if(!fragile) prob *= .35;
  }else{
    // 선발 실패는 여전히 꽤 큰 충격이지만, 이것도 무조건 슬럼프는 아님.
    prob = 0.10 + vulnerability*.36 + Math.max(0, disappointment-3)*.045;
    if(context.failed) prob += .08;
    if(!fragile && vulnerability<.18) prob *= .65;
  }
  if(slumpCooldown) prob *= .28;
  prob = Math.max(0, Math.min(.48, prob));

  if(!chance(prob)) return false;

  const badSelection = context.kind==="selection" && context.failed;
  const severity =
    badSelection ? 3 :
    (context.rank||99)>=10 ? 3 :
    ((context.rank||99)>=8 || disappointment>=3.5) ? 2 : 1;

  // 슬럼프는 더 드물게, 부정 이벤트는 상대적으로 가볍게.
  const slumpChance = slumpCooldown ? 0 : Math.min(.42, .10 + vulnerability*.30 + Math.max(0, severity-1)*.08);
  if(severity>=2 && chance(slumpChance)){
    enterSlump(`${context.label} 결과 부진`, severity);
    p.lastSlumpWeek = game.week;
    openEvent("슬럼프의 시작", `${context.label} 이후 마음이 무겁게 가라앉았습니다. 다만 한 번의 메달 실패가 곧바로 슬럼프를 뜻하지는 않습니다. 이번에는 낮은 멘탈과 누적된 압박이 함께 작용했습니다.`, [
      {text:"코치와 상담하고 루틴을 다시 세운다", stats:{mental:1,recovery:1,integrity:1}, status:{stress:-8,condition:4,fatigue:-3}, relationships:{coach:4}, dialogueSpeaker:"코치", dialogue:"무너진 걸 인정하는 게 회복의 시작이다.", log:"상담을 통해 슬럼프 회복의 방향을 잡았습니다.", noVariance:true},
      {text:"잠시 대회 결과를 보지 않고 쉬어 간다", stats:{topSpeed:-1,reaction:-1,recovery:2}, status:{stress:-10,fatigue:-8,condition:6}, relationships:{family:2}, dialogueSpeaker:p.name, dialogue:"지금은 기록표보다 내 호흡을 먼저 봐야겠다.", log:"휴식을 선택해 회복했지만 실전 감각이 조금 떨어졌습니다.", noVariance:true},
      {text:"분노를 억누르지 않고 훈련에 쏟는다", stats:{fighting:1,mental:-2,stability:-1}, status:{stress:7,fatigue:8,injuryRisk:6}, dialogueSpeaker:p.name, dialogue:"가만히 있으면 더 무너질 것 같아.", log:"분노를 훈련에 쏟으며 승부욕은 올랐지만 슬럼프가 깊어질 위험이 커졌습니다."}
    ], {speaker:p.name, role:"player", art:"night", icon:"🌧️", tag:"슬럼프", quote:"빙판이 전보다 차갑게 느껴진다.", expression:"sad"});
  }else{
    triggerPostResultNegativeEvent(context);
  }
  return true;
}
function tickSlump(){
  ensureGameDefaults();
  const p=game.player;
  if(!p.slump) return;
  p.slump.weeks--;
  p.stress=clamp((p.stress||0)+1,0,100);
  if(p.slump.weeks<=0){
    addLog("슬럼프 회복", `${p.slump.reason}에서 조금씩 벗어나고 있습니다.`);
    p.slump=null;
    p.condition=clamp(p.condition+5,0,100);
    p.stress=clamp((p.stress||0)-8,0,100);
    game.lastDialogue="아직 완벽하진 않지만, 다시 빙판을 보고 싶어졌다.";
  }
}

function applyChoicePayload(choice){
  if(!choice || !game) return;
  ensureGameDefaults();
  const p=game.player;
  if(choice.stats){ Object.entries(choice.stats).forEach(([k,v])=>{
    if(p.stats[k]!=null){
      if(v>0){
        let gainScale = k==="mental" ? EVENT_STAT_GAIN_SCALE * MENTAL_EVENT_GAIN_SCALE : EVENT_STAT_GAIN_SCALE;
        if(k==="fighting") gainScale *= FIGHTING_EVENT_GAIN_SCALE;
        if(k==="stability") gainScale *= STABILITY_EVENT_GAIN_SCALE;
        if(typeof addStatProgress === "function") addStatProgress(k, v * gainScale);
        else p.stats[k]=clamp(p.stats[k]+Math.max(1,Math.round(v*gainScale)),1,100);
      }else if(v<0){
        const lossScale = k==="mental" ? EVENT_STAT_LOSS_SCALE * MENTAL_NEGATIVE_LOSS_SCALE : EVENT_STAT_LOSS_SCALE;
        addRecoverableStatLoss(k, Math.abs(v) * lossScale);
      }
    }
  }); }
  if(choice.status){
    if(choice.status.condition!=null) p.condition=clamp(p.condition+choice.status.condition,0,100);
    if(choice.status.fatigue!=null) p.fatigue=clamp(p.fatigue+choice.status.fatigue,0,100);
    if(choice.status.injuryRisk!=null) p.injuryRisk=clamp(p.injuryRisk+choice.status.injuryRisk,0,100);
    if(choice.status.money!=null) p.money=Math.max(0,(p.money||0)+choice.status.money);
    if(choice.status.fame!=null) p.fame=clamp((p.fame||0)+choice.status.fame,0,9999);
    if(choice.status.fan!=null) p.fan=clamp((p.fan||0)+choice.status.fan,0,999999);
    if(choice.status.stress!=null) p.stress=clamp((p.stress||0)+choice.status.stress,0,100);
    if(choice.status.score!=null) p.score=Math.max(0,(p.score||0)+choice.status.score);
    if(choice.status.controversy!=null) p.controversy=clamp((p.controversy||0)+choice.status.controversy,0,999);
    if(choice.status.warningCount!=null) p.warningCount=Math.max(0,(p.warningCount||0)+choice.status.warningCount);
    if(choice.status.suspensionWeeks!=null) p.suspensionWeeks=Math.max(0,(p.suspensionWeeks||0)+choice.status.suspensionWeeks);
  }
  if(choice.relationships){ Object.entries(choice.relationships).forEach(([k,v])=>{
    const scaled = v>0 ? Math.max(1, Math.round(v*EVENT_REL_GAIN_SCALE)) : Math.round(v*EVENT_REL_LOSS_SCALE);
    adjustRelationship(k, scaled);
  }); }
  if(choice.aftereffects){ choice.aftereffects.forEach(e=>p.aftereffects.push(e)); }
  if(choice.flags){ choice.flags.forEach(addStoryFlag); }
  if(choice.album) unlockAlbum(choice.album);
  if(choice.scene) game.scene = choice.scene;
  if(choice.dialogue){ game.lastDialogue = choice.dialogue; game.lastSpeaker = choice.speaker || choice.dialogueSpeaker || game.lastSpeaker || '코치'; }
  if(choice.log){ addLog(choice.logTitle || '이벤트', choice.log); }
  if(choice.rivalPower){ game.rival.power += choice.rivalPower; }
  applyRandomChoiceVariance(choice);
}

function socialName(type){
  ensureGameDefaults();
  const p=game.player;
  if(!p.social) p.social = {};
  const pool = {
    good:["정직한 라이벌 서하","성실한 경쟁자 민준","페어플레이어 유진"],
    bad:["거친 라이벌 태오","도발형 선수 리안","위험한 경쟁자 카이"],
    friendly:["따뜻한 동료 하늘","우호 선수 나윤","훈련 파트너 준서"],
    hostile:["까칠한 선수 레오","적대 선수 미카","충돌이 잦은 선수 유안"],
    partner:["아이스댄스장 옆 선수 은우","스피드스케이팅 선수 서율","타국 쇼트트랙 선수 노아","주니어 시절 친구 이안"]
  };
  if(type==="goodRival" && !p.social.goodRival) p.social.goodRival=pick(pool.good);
  if(type==="badRival" && !p.social.badRival) p.social.badRival=pick(pool.bad);
  if(type==="friendlyAthlete" && !p.social.friendlyAthlete) p.social.friendlyAthlete=pick(pool.friendly);
  if(type==="hostileAthlete" && !p.social.hostileAthlete) p.social.hostileAthlete=pick(pool.hostile);
  if(type==="partner" && !p.romance.partnerName) p.romance.partnerName=pick(pool.partner);
  return type==="partner" ? p.romance.partnerName : p.social[type];
}
function sportsmanshipLabel(v){ if(v>=85) return "모범 선수"; if(v>=70) return "페어플레이어"; if(v>=55) return "평범"; if(v>=40) return "주의 필요"; return "위험"; }
function ethicsTone(v){ return v>=70 ? "good" : v<45 ? "bad" : "warn"; }
function romanceAllowed(){
  ensureGameDefaults();
  const p=game.player;
  if(p.age < 18) return false;
  if(p.romance.cooldown > 0) return false;
  return true;
}

const PORTRAIT_ASSETS = {
  Men: {
    basic: "assets/images/img_0007_47020ad3aa54.png",
    happy: "assets/images/img_0008_125186f4f4a6.png",
    focus: "assets/images/img_0009_399581ac014f.png",
    tired: "assets/images/img_0010_79ef11e0dccd.png",
    sad: "assets/images/img_0011_fba556a57383.png",
    blush: "assets/images/img_0012_02a41b1c691f.png",
    angry: "assets/images/img_0013_c9673a3046f6.png",
    injured: "assets/images/img_0014_1f0f78afa093.png"
  },
  Women: {
    basic: "assets/images/img_0015_03a67bbca71f.png",
    happy: "assets/images/img_0016_642cca3c2b20.png",
    focus: "assets/images/img_0017_feec552daf2f.png",
    tired: "assets/images/img_0018_b482fa85d245.png",
    sad: "assets/images/img_0019_045828aae4ce.png",
    blush: "assets/images/img_0020_bbf7bc020114.png",
    angry: "assets/images/img_0021_859a1ad9cb20.png",
    injured: "assets/images/img_0022_2e6c5cb2ce1d.png"
  }
};
const TRAINING_IMAGES = {"Men": {"basic_endurance": "assets/images/img_0023_8407120a8a8a.png", "basic_power": "assets/images/img_0024_7728a6d173cd.png", "ice_sense": "assets/images/img_0025_569e3e7b8dbc.png", "ice_balance": "assets/images/img_0026_16db27243674.png", "edge_control": "assets/images/img_0027_a350012d32ef.png", "technical_drill": "assets/images/img_0028_05ab1bb5be1e.png", "start_reaction": "assets/images/img_0029_3d454256a794.png", "accel_zone": "assets/images/img_0030_216dc52fb41c.png", "corner_exit": "assets/images/img_0031_26134f3d80e3.png", "inside_pass": "assets/images/img_0032_0b65a51f2062.png", "outside_pass": "assets/images/img_0033_f5d1199195eb.png", "pace_control": "assets/images/img_0034_3c69889c9a6a.png", "final_lap": "assets/images/img_0035_c28268a829a9.png", "rival_analysis": "assets/images/img_0036_9a4dcc1a4d68.png", "relay_touch": "assets/images/img_0037_ec4607509b40.png", "relay_order": "assets/images/img_0038_b86484921287.png", "team_sync": "assets/images/img_0039_26802f38d2bb.png", "condition_control": "assets/images/img_0040_fc9824726266.png", "mental_care": "assets/images/img_0041_5bed2c833d48.png", "equipment": "assets/images/img_0042_6d0caa19d266.png", "rehab": "assets/images/img_0043_214eb990e64e.png", "rest": "assets/images/img_0044_48e1ba1146ee.png", "fairplay": "assets/images/img_0045_c649259d275c.png", "rules_study": "assets/images/img_0046_3eac74064194.png", "rival_respect": "assets/images/img_0047_f4364e05ab52.png", "volunteer": "assets/images/img_0048_046f3ff8cc5e.png", "race_prep": "assets/images/img_0049_7f5f94276613.png", "start_check": "assets/images/img_0050_96c52fdc17e2.png", "opponent_scout": "assets/images/img_0051_2909d4d18b62.png", "relay_check": "assets/images/img_0052_10426c071893.png", "time_trial": "assets/images/img_0053_29e5a9bddb94.png", "practice_race": "assets/images/img_0054_aa9562b34a77.png"}, "Women": {"basic_endurance": "assets/images/img_0055_f39414200fdc.png", "basic_power": "assets/images/img_0056_b585b6711ba7.png", "ice_sense": "assets/images/img_0057_0019dc4f91f2.png", "ice_balance": "assets/images/img_0058_de567a779526.png", "edge_control": "assets/images/img_0059_6cf0aa9a187f.png", "technical_drill": "assets/images/img_0060_28fc7cd10551.png", "start_reaction": "assets/images/img_0061_aae336e1a07b.png", "accel_zone": "assets/images/img_0062_851b00cfa36b.png", "corner_exit": "assets/images/img_0063_56561b8a7372.png", "inside_pass": "assets/images/img_0064_1e0ff238a5e7.png", "outside_pass": "assets/images/img_0065_66699bae9265.png", "pace_control": "assets/images/img_0066_28f1409d56bc.png", "final_lap": "assets/images/img_0067_576253dee8c7.png", "rival_analysis": "assets/images/img_0068_b11116e68c02.png", "relay_touch": "assets/images/img_0069_4337bdd1638e.png", "relay_order": "assets/images/img_0070_de0c59f9bb4d.png", "team_sync": "assets/images/img_0071_5425ccc9c65d.png", "condition_control": "assets/images/img_0072_723421d6c9e4.png", "mental_care": "assets/images/img_0073_7d5a56f058a7.png", "equipment": "assets/images/img_0074_630a13eb38df.png", "rehab": "assets/images/img_0075_2e929ce90a45.png", "rest": "assets/images/img_0076_5a6631d039cc.png", "fairplay": "assets/images/img_0077_41a8680b388f.png", "rules_study": "assets/images/img_0078_16ed16f6e7d3.png", "rival_respect": "assets/images/img_0079_e5731e9d71fb.png", "volunteer": "assets/images/img_0080_32f099299425.png", "race_prep": "assets/images/img_0081_a6a02e02bc47.png", "start_check": "assets/images/img_0082_1d7f1137655d.png", "opponent_scout": "assets/images/img_0083_9b85f35ed5cb.png", "relay_check": "assets/images/img_0084_62135d520dd4.png", "time_trial": "assets/images/img_0085_98ebfa28594f.png", "practice_race": "assets/images/img_0086_6de34d1bfde3.png"}};
function currentGenderForImages(){
  if(game && game.player && game.player.gender) return game.player.gender;
  const picker = document.getElementById("newGender");
  return (picker && picker.value) || (candidate && candidate.gender) || "Men";
}
function getTrainingImage(activityId, gender){
  const g = gender==="Women" ? "Women" : "Men";
  return (TRAINING_IMAGES[g] && TRAINING_IMAGES[g][activityId]) || "";
}
function itemBonusText(item){
  const labels = {
    growth:"훈련 성장", race:"대회 종합", speedRace:"단거리 경기", cornerRace:"코너 경기", relayRace:"계주 경기",
    fame:"명성 획득", stability:"안정성 판정", externalSafety:"외부 충돌 보호", injuryGuard:"부상 보호", recoveryCare:"회복 관리"
  };
  const entries = Object.entries((item && item.bonus) || {});
  if(!entries.length) return "보너스 없음";
  return entries.map(([k,v])=>{
    const name = labels[k] || k;
    const value = (typeof v==="number" && v<1 && v>0) ? "+" + Math.round(v*100) + "%" : "+" + v;
    return name + " " + value;
  }).join(" · ");
}
function renderActivityPreviewGrid(){
  // 6.6: 초기 화면에는 훈련 이미지를 표시하지 않습니다.
  // 훈련 이미지는 주간 결과 모달에서만 보여 줍니다.
}


function buildWeekActivitySummary(schedule){
  const gender = currentGenderForImages();
  return schedule.map((item, idx)=>{
    const a=item.act;
    if(!a) return null;
    const image=getTrainingImage(a.id, gender);
    return {
      slot:idx+1,
      id:a.id,
      name:a.name,
      cat:a.cat,
      desc:a.desc,
      intensity:item.intensity,
      intensityLabel:INTENSITY[item.intensity]?.label || "보통",
      image
    };
  }).filter(Boolean);
}
function buildWeekTrainingCards(activities){
  const list = activities || [];
  if(!list.length) return "";
  return `<div class="week-training-grid">` + list.map(a=>{
    const visual = a.image
      ? `<img src="${a.image}" alt="${a.name}">`
      : `<div class="empty-image"></div>`;
    return `
    <div class="week-training-card">
      ${visual}
      <div class="content">
        <div class="week-training-badge">일정 ${a.slot}</div>
        <strong>${a.name}</strong>
        <div class="meta">[${a.cat}] ${a.desc}<br>강도: ${a.intensityLabel}</div>
      </div>
    </div>`;
  }).join("") + `</div>`;
}

const PORTRAIT_LABELS = {
  basic:"기본", happy:"기쁨", focus:"집중", tired:"지침/피곤",
  sad:"슬럼프/우울", blush:"부끄러움/당황", angry:"분노/오기", injured:"부상/통증"
};
function getPortraitGender(gender){ return gender==="Women" ? "Women" : "Men"; }
function portraitSet(gender){ return PORTRAIT_ASSETS[getPortraitGender(gender)] || PORTRAIT_ASSETS.Men; }
function currentExpression(){
  return currentExpressionState().expr;
}
function currentExpressionState(){
  ensureGameDefaults();
  const p=game.player;
  if(p.injury){
    return {
      expr:"injured",
      label:"부상/통증",
      tone:"injured",
      reason:`${p.injury.name} 회복 중입니다. 남은 회복 기간은 ${p.injury.weeks}주입니다.`,
      advice:"이번 주는 재활·휴식·컨디션 조절을 우선하는 편이 좋습니다."
    };
  }
  if(p.injuryRisk >= 80){
    return {
      expr:"injured",
      label:"부상/통증",
      tone:"injured",
      reason:`부상 위험이 ${p.injuryRisk}까지 올라 몸이 경고 신호를 보내고 있습니다.`,
      advice:"지금은 강훈련보다 재활 훈련이나 장비 점검, 휴식이 안전합니다."
    };
  }
  if(p.slump){
    return {
      expr:"sad",
      label:"슬럼프/우울",
      tone:"sad",
      reason:`${p.slump.reason} 때문에 슬럼프 상태입니다. 남은 기간은 ${p.slump.weeks}주입니다.`,
      advice:"컨디션 수치가 좋아도 심리 리듬이 흔들린 상태입니다. 멘탈 케어, 휴식, 가벼운 루틴 회복을 추천합니다."
    };
  }
  if((p.stress||0) >= 70){
    return {
      expr:"sad",
      label:"슬럼프/우울",
      tone:"sad",
      reason:`스트레스가 ${p.stress}까지 올라 마음이 많이 지쳐 있습니다.`,
      advice:"대회 준비를 무리하게 밀어붙이기보다 멘탈 케어와 가족·코치 관계 회복이 도움이 됩니다."
    };
  }
  if(p.fatigue >= 78){
    return {
      expr:"tired",
      label:"지침/피곤",
      tone:"tired",
      reason:`피로도가 ${p.fatigue}로 높아 몸의 반응이 둔해질 수 있습니다.`,
      advice:"휴식이나 컨디션 조절을 넣지 않으면 부상 위험과 부정 이벤트 가능성이 커집니다."
    };
  }
  if(p.condition <= 28){
    return {
      expr:"tired",
      label:"지침/피곤",
      tone:"tired",
      reason:`컨디션이 ${p.condition}까지 떨어져 훈련 효율이 낮습니다.`,
      advice:"가벼운 훈련 또는 회복 일정을 먼저 넣는 편이 좋습니다."
    };
  }
  if(p.condition <= 45 && p.fatigue >= 60){
    return {
      expr:"sad",
      label:"슬럼프/우울",
      tone:"sad",
      reason:`컨디션은 낮고 피로는 높아 훈련 리듬이 무너지고 있습니다.`,
      advice:"지금은 기록보다 회복 루틴을 되찾는 것이 먼저입니다."
    };
  }
  if(p.condition >= 82 && (p.fatigue < 45) && (p.stress||0) < 50){
    return {
      expr:"happy",
      label:"기쁨",
      tone:"happy",
      reason:"몸 상태와 심리 상태가 모두 안정적입니다.",
      advice:"중요 대회나 강도 높은 핵심 훈련을 준비하기 좋은 흐름입니다."
    };
  }
  return {
    expr:"basic",
    label:"기본",
    tone:"basic",
    reason:"특별한 이상 신호는 없습니다.",
    advice:"이번 주 일정을 균형 있게 구성하면 됩니다."
  };
}
function getMainCardDialogue(){
  ensureGameDefaults();
  const st=currentExpressionState();
  const recent=game.lastDialogue || "이번 주 일정을 정해 보자. 무리하면 빨리 성장하지만, 부상 위험도 커진다.";
  if(st.expr==="basic"){
    return escapeHtml(recent);
  }
  return `<span class="state-line ${safeClassToken(st.tone)}">현재 표정 · ${escapeHtml(st.label)}</span><div class="state-reason">${escapeHtml(st.reason)}<br>${escapeHtml(st.advice)}</div><span class="state-recent">최근 상황: ${escapeHtml(recent)}</span>`;
}
function inferEventExpression(meta={}, title="", body=""){
  const all = `${title} ${meta.tag||""} ${meta.quote||""} ${body||""} ${meta.note||""}`.toLowerCase();
  const contains = (...keys)=>keys.some(k=>all.includes(k.toLowerCase()));
  if(meta.expression && portraitSet(game?.player?.gender || "Men")[meta.expression]) return meta.expression;
  if(contains("부상","통증","재활","전조","회복")) return "injured";
  if(contains("고백","연애","헤어짐","부끄","당황","팬 미팅")) return "blush";
  if(contains("도발","갈등","신경전","함정","반칙","분노","적대")) return "angry";
  if(contains("슬럼프","우울","서운","눈물","양심","혼잣말")) return "sad";
  if(contains("피로","지침","휴식","거울")) return "tired";
  if(contains("메달","우승","기쁨","화보","팬")) return "happy";
  if(contains("대회","선발전","훈련","특훈","코치","분석","경쟁","전술")) return "focus";
  return currentExpression();
}
function getSafePortraitExpression(expression, gender){
  // 11.7: 남자 injured 원본 이미지가 분노/오기 표정처럼 보여 부상·통증 상태와 어긋났음.
  // 남자 선수의 부상/통증 표시는 피곤/통증에 가까운 tired 이미지로 대체하고, 라벨은 그대로 부상/통증으로 유지.
  if(gender !== "Women" && expression === "injured") return "tired";
  return expression;
}
function getPlayerPortrait(expression){
  const gender = game?.player?.gender || "Men";
  const set = portraitSet(gender);
  const safeExpression = getSafePortraitExpression(expression, gender);
  return set[safeExpression] || set[expression] || set.basic;
}
function updatePortraitDisplays(){
  if(!game || !game.player) return;
  const expr = currentExpression();
  const label = PORTRAIT_LABELS[expr] || "기본";
  const src = getPlayerPortrait(expr);
  const sceneImg = document.getElementById("scenePortrait");
  const profileImg = document.getElementById("profilePortrait");
  const labelEl = document.getElementById("expressionLabel");
  const descEl = document.getElementById("profilePortraitDesc");
  if(sceneImg) sceneImg.src = src;
  if(profileImg) profileImg.src = src;
  if(labelEl) labelEl.textContent = `현재 표정 · ${label}`;
  if(descEl){
    const st=currentExpressionState();
    descEl.innerHTML = `현재 표정은 <strong>${escapeHtml(st.label)}</strong> 상태입니다.<br>${escapeHtml(st.reason)}`;
  }
}

const EVENT_SCENE_IMAGES = {"Men": {"family_dinner": "assets/images/img_0087_8d91e240ff88.png", "가족의 저녁 식사 초대": "assets/images/img_0087_8d91e240ff88.png", "family_hurt": "assets/images/img_0088_30cdeb686f31.png", "가족의 서운함": "assets/images/img_0088_30cdeb686f31.png", "sports_counseling": "assets/images/img_0089_d016c3a7dcdb.png", "스포츠 심리 상담": "assets/images/img_0089_d016c3a7dcdb.png", "slump_shadow": "assets/images/img_0090_8460c401cfe6.png", "슬럼프의 그림자": "assets/images/img_0090_8460c401cfe6.png", "dawn_monologue": "assets/images/img_0091_4e98485093bb.png", "새벽 훈련장의 혼잣말": "assets/images/img_0091_4e98485093bb.png", "mirror_monologue": "assets/images/img_0092_8be5b8332fb9.png", "거울 앞의 혼잣말": "assets/images/img_0092_8be5b8332fb9.png", "looking_medal": "assets/images/img_0093_db81d9f2ab0a.png", "메달을 바라보며": "assets/images/img_0093_db81d9f2ab0a.png", "voice_of_conscience": "assets/images/img_0094_7447953fb523.png", "양심의 소리": "assets/images/img_0094_7447953fb523.png", "school_training_conflict": "assets/images/img_0095_77a632ac768e.png", "학업과 훈련의 충돌": "assets/images/img_0095_77a632ac768e.png", "부상 전조 신호": "assets/images/img_0096_4c29d4f4f798.png", "injury_warning": "assets/images/img_0096_4c29d4f4f798.png", "얼음 상태 이상": "assets/images/img_0097_e586277a8a5b.png", "ice_condition_issue": "assets/images/img_0097_e586277a8a5b.png", "비공개 야간 빙질 테스트": "assets/images/img_0098_c021f2803130.png", "night_ice_test": "assets/images/img_0098_c021f2803130.png", "성장기 변화": "assets/images/img_0099_6d9d0a0b2fd3.png", "growth_spurt": "assets/images/img_0099_6d9d0a0b2fd3.png", "라이벌의 도발": "assets/images/img_0100_df5605491289.png", "rival_taunt": "assets/images/img_0100_df5605491289.png", "착한 라이벌의 조언": "assets/images/img_0101_cc0da8648e85.png", "good_rival_advice": "assets/images/img_0101_cc0da8648e85.png", "나쁜 라이벌의 함정": "assets/images/img_0102_927ab875ae2a.png", "bad_rival_trap": "assets/images/img_0102_927ab875ae2a.png", "계주 순번 갈등": "assets/images/img_0103_726cd0dbc74e.png", "relay_order_conflict": "assets/images/img_0103_726cd0dbc74e.png", "팀원과의 비밀 특훈": "assets/images/img_0104_b0a76698a540.png", "secret_team_training": "assets/images/img_0104_b0a76698a540.png", "넘어진 경쟁자를 도울 것인가": "assets/images/img_0105_aa27e54aabad.png", "help_fallen_competitor": "assets/images/img_0105_aa27e54aabad.png", "스폰서 화보 제안": "assets/images/img_0106_b01deff959e6.png", "sponsor_photoshoot_offer": "assets/images/img_0106_b01deff959e6.png", "팬 미팅 초대": "assets/images/img_0107_5b612db83396.png", "fan_meeting_invite": "assets/images/img_0107_5b612db83396.png", "기자회견 질문": "assets/images/img_0108_068a2feed1a6.png", "press_conference_question": "assets/images/img_0108_068a2feed1a6.png", "원정 이동 피로": "assets/images/img_0109_6b96df6b71fb.png", "away_trip_fatigue": "assets/images/img_0109_6b96df6b71fb.png", "적대 국가와의 신경전": "assets/images/img_0110_58b386115588.png", "hostile_nation_tension": "assets/images/img_0110_58b386115588.png"}, "Women": {"family_dinner": "assets/images/img_0111_a59da827990b.png", "가족의 저녁 식사 초대": "assets/images/img_0111_a59da827990b.png", "family_hurt": "assets/images/img_0112_58b80e555c0b.png", "가족의 서운함": "assets/images/img_0112_58b80e555c0b.png", "sports_counseling": "assets/images/img_0113_2955be0c2bcb.png", "스포츠 심리 상담": "assets/images/img_0113_2955be0c2bcb.png", "slump_shadow": "assets/images/img_0114_86864749c5a4.png", "슬럼프의 그림자": "assets/images/img_0114_86864749c5a4.png", "dawn_monologue": "assets/images/img_0115_58c9d269d00e.png", "새벽 훈련장의 혼잣말": "assets/images/img_0115_58c9d269d00e.png", "mirror_monologue": "assets/images/img_0116_d4ae39164f50.png", "거울 앞의 혼잣말": "assets/images/img_0116_d4ae39164f50.png", "looking_medal": "assets/images/img_0117_c9d1af1270dc.png", "메달을 바라보며": "assets/images/img_0117_c9d1af1270dc.png", "voice_of_conscience": "assets/images/img_0118_ca387de40af6.png", "양심의 소리": "assets/images/img_0118_ca387de40af6.png", "school_training_conflict": "assets/images/img_0119_2b7869c5b49c.png", "학업과 훈련의 충돌": "assets/images/img_0119_2b7869c5b49c.png", "부상 전조 신호": "assets/images/img_0120_4779bb65146a.png", "injury_warning": "assets/images/img_0120_4779bb65146a.png", "얼음 상태 이상": "assets/images/img_0121_5e3f0863e7a7.png", "ice_condition_issue": "assets/images/img_0121_5e3f0863e7a7.png", "비공개 야간 빙질 테스트": "assets/images/img_0122_4658f3327a97.png", "night_ice_test": "assets/images/img_0122_4658f3327a97.png", "성장기 변화": "assets/images/img_0123_042cad901d1f.png", "growth_spurt": "assets/images/img_0123_042cad901d1f.png", "라이벌의 도발": "assets/images/img_0124_a41f55b392bd.png", "rival_taunt": "assets/images/img_0124_a41f55b392bd.png", "착한 라이벌의 조언": "assets/images/img_0125_7ec308ca9cff.png", "good_rival_advice": "assets/images/img_0125_7ec308ca9cff.png", "나쁜 라이벌의 함정": "assets/images/img_0126_6d1e00e614be.png", "bad_rival_trap": "assets/images/img_0126_6d1e00e614be.png", "계주 순번 갈등": "assets/images/img_0127_51b683f21cf2.png", "relay_order_conflict": "assets/images/img_0127_51b683f21cf2.png", "팀원과의 비밀 특훈": "assets/images/img_0128_ff9c590f1782.png", "secret_team_training": "assets/images/img_0128_ff9c590f1782.png", "넘어진 경쟁자를 도울 것인가": "assets/images/img_0129_31898a91490e.png", "help_fallen_competitor": "assets/images/img_0129_31898a91490e.png", "스폰서 화보 제안": "assets/images/img_0130_81a98ff9dfc3.png", "sponsor_photoshoot_offer": "assets/images/img_0130_81a98ff9dfc3.png", "팬 미팅 초대": "assets/images/img_0131_5ba65cdd5141.png", "fan_meeting_invite": "assets/images/img_0131_5ba65cdd5141.png", "기자회견 질문": "assets/images/img_0132_fbec21856eb8.png", "press_conference_question": "assets/images/img_0132_fbec21856eb8.png", "원정 이동 피로": "assets/images/img_0133_ac479a120f11.png", "away_trip_fatigue": "assets/images/img_0133_ac479a120f11.png", "적대 국가와의 신경전": "assets/images/img_0134_283c4aba21d4.png", "hostile_nation_tension": "assets/images/img_0134_283c4aba21d4.png"}};

// v8.4: 연애/반칙 유혹 관련 이벤트 상황 이미지 추가
Object.assign(EVENT_SCENE_IMAGES.Men, {
  "반칙 유혹": "assets/images/img_0135_b989c45a9640.png",
  "연애": "assets/images/img_0136_647f84c32fdb.png",
  "이성 선수의 고백": "assets/images/img_0137_79f2bc2af8d8.png",
  "연애와 훈련의 균형": "assets/images/img_0138_4ad5c85d4e95.png",
  "헤어짐의 갈림길": "assets/images/img_0139_9387ce7db8bc.png",
});
Object.assign(EVENT_SCENE_IMAGES.Women, {
  "반칙 유혹": "assets/images/img_0140_0e74d3a09921.png",
  "연애": "assets/images/img_0141_e520624c108c.png",
  "이성 선수의 고백": "assets/images/img_0142_6831017e1375.png",
  "연애와 훈련의 균형": "assets/images/img_0143_f46d02f29860.png",
  "헤어짐의 갈림길": "assets/images/img_0144_474e6c81365f.png",
});

Object.assign(EVENT_SCENE_IMAGES.Men, {
  "부상 발생": "assets/images/img_0145_4421bf20d1c2.webp",
  "부상 발생 연출": "assets/images/img_0145_4421bf20d1c2.webp"
});
Object.assign(EVENT_SCENE_IMAGES.Women, {
  "부상 발생": "assets/images/img_0145_4421bf20d1c2.webp",
  "부상 발생 연출": "assets/images/img_0145_4421bf20d1c2.webp"
});

const UI_ILLUSTRATIONS = {
  competition: {
    seniorTrial1: "assets/images/img_0146_c9d2f59ead8b.webp",
    seniorTrial2: "assets/images/img_0147_00380e1dd1ff.webp",
    juniorSelection: "assets/images/img_0148_9e7ec0d7ce59.webp",
    domestic: "assets/images/img_0149_ce78184ad6aa.webp",
    worldJunior: "assets/images/img_0150_1d13b3cc5c0c.webp",
    worldTour: "assets/images/img_0151_71b89233834c.webp",
    olympics: "assets/images/img_0152_a78e0907d38c.webp",
    worlds: "assets/images/img_0153_4999ff4b1c0b.webp"
  },
  result: {
    gold: "assets/images/img_0154_ae0c0773ed66.webp",
    silver: "assets/images/img_0155_d3ae34b7e78a.webp",
    bronze: "assets/images/img_0156_88782e784854.webp",
    noMedal: "assets/images/img_0157_d81f36a515f2.webp"
  },
  special: {
    selectionSuccess: "assets/images/img_0158_031cc199d1fd.webp",
    selectionFail: "assets/images/img_0159_39588b8175be.webp",
    autoSelection: "assets/images/img_0160_815a61132e54.webp",
    injury: "assets/images/img_0145_4421bf20d1c2.webp",
    seasonEnd: "assets/images/img_0161_178704887fee.webp",
    legendEnding: "assets/images/img_0162_06cf88834319.webp"
  }
};

function getCompetitionVisualImage(comp){
  const raw = typeof comp === 'string'
    ? comp
    : [comp?.kind, comp?.base, comp?.name].filter(Boolean).join(' ');
  if(!raw) return '';
  if(/자동\s*선발/.test(raw)) return UI_ILLUSTRATIONS.competition.seniorTrial2;
  if(/seniorTrial1|senior_trial1|국가대표\s*1차/.test(raw)) return UI_ILLUSTRATIONS.competition.seniorTrial1;
  if(/seniorTrial2|senior_trial2|국가대표\s*2차|최종/.test(raw)) return UI_ILLUSTRATIONS.competition.seniorTrial2;
  if(/juniorSelection|junior_selection|주니어\s*대표\s*선발전/.test(raw)) return UI_ILLUSTRATIONS.competition.juniorSelection;
  if(/junior_events|senior_domestic_open|senior_winter_cup|전국\s*종별|전국동계체육대회/.test(raw)) return UI_ILLUSTRATIONS.competition.domestic;
  if(/junior_worlds|세계\s*주니어\s*선수권/.test(raw)) return UI_ILLUSTRATIONS.competition.worldJunior;
  if(/wt[1-6]|월드투어/.test(raw)) return UI_ILLUSTRATIONS.competition.worldTour;
  if(/olympics|동계올림픽/.test(raw)) return UI_ILLUSTRATIONS.competition.olympics;
  if(/worlds|세계선수권/.test(raw)) return UI_ILLUSTRATIONS.competition.worlds;
  return '';
}
function classifyResultMedal(results=[]){
  const pool = Array.isArray(results) ? results : [results];
  const medals = pool.map(r=>r?.medal).filter(Boolean);
  if(medals.includes('gold')) return 'gold';
  if(medals.includes('silver')) return 'silver';
  if(medals.includes('bronze')) return 'bronze';
  return 'noMedal';
}
function buildVisualCard(src, caption, extraClass=''){
  if(!src) return '';
  return `<div class="result-visual-card ${extraClass}"><img src="${src}" alt="${caption}"><div class="caption">${caption}</div></div>`;
}
function buildCompetitionCardVisual(comp){
  const src = getCompetitionVisualImage(comp);
  if(!src) return '';
  const name = typeof comp === 'string' ? comp : (comp?.name || '대회');
  return `<div class="competition-visual-thumb"><img src="${src}" alt="${name} 대표 이미지"><div class="caption">${name} 대표 일러스트</div></div>`;
}
function getSelectionOutcomeImage(title, rank){
  if(/자동\s*선발/.test(title||'')) return UI_ILLUSTRATIONS.special.autoSelection;
  if(/1차/.test(title||'')) return '';
  if(/주니어/.test(title||'')) return rank<=3 ? UI_ILLUSTRATIONS.special.selectionSuccess : UI_ILLUSTRATIONS.special.selectionFail;
  return rank<=8 ? UI_ILLUSTRATIONS.special.selectionSuccess : UI_ILLUSTRATIONS.special.selectionFail;
}
function buildCompetitionResultVisuals(comp, results=[]){
  const compSrc = getCompetitionVisualImage(comp);
  const resultKey = classifyResultMedal(results);
  const resultSrc = UI_ILLUSTRATIONS.result[resultKey];
  const captionMap = {gold:'금메달 결과 화면', silver:'은메달 결과 화면', bronze:'동메달 결과 화면', noMedal:'노메달/아쉬운 결과 화면'};
  const cards = [];
  if(compSrc) cards.push(buildVisualCard(compSrc, `${comp?.name || '대회'} 대표 이미지`, 'competition'));
  if(resultSrc) cards.push(buildVisualCard(resultSrc, captionMap[resultKey], 'result'));
  return cards.length ? `<div class="result-visual-stack">${cards.join('')}</div>` : '';
}
function buildSelectionVisuals(title, rank){
  const cards = [];
  const compSrc = getCompetitionVisualImage(title);
  const statusSrc = getSelectionOutcomeImage(title, rank);
  if(compSrc) cards.push(buildVisualCard(compSrc, `${title} 대표 이미지`, 'competition'));
  if(statusSrc){
    const cap = /자동\s*선발/.test(title||'') ? '자동 선발 확정 연출' : (/주니어/.test(title||'') ? (rank<=3 ? '국가대표 선발 성공' : '국가대표 탈락') : (rank<=8 ? '국가대표 선발 성공' : '국가대표 탈락'));
    cards.push(buildVisualCard(statusSrc, cap, 'special'));
  }
  return cards.length ? `<div class="result-visual-stack">${cards.join('')}</div>` : '';
}
function getEndingVisualCards(ending){
  const id = ending?.id || "";
  const cards = [];
  const add=(src, caption, cls="ending")=>{
    if(src) cards.push(buildVisualCard(src, caption, cls));
  };
  if(id==="olympic" || id==="olympicMulti"){
    add(UI_ILLUSTRATIONS.competition.olympics, "올림픽 무대", "competition");
    add(UI_ILLUSTRATIONS.result.gold, "올림픽 금메달 엔딩", "result");
  }else if(id==="olympicNoGoldLegend"){
    add(UI_ILLUSTRATIONS.competition.olympics, "올림픽 무대", "competition");
    add(UI_ILLUSTRATIONS.result.silver, "올림픽 무관의 레전드", "result");
  }else if(id==="nationalAce"){
    add(UI_ILLUSTRATIONS.competition.seniorTrial2, "국가대표 선발전", "competition");
    add(UI_ILLUSTRATIONS.special.selectionSuccess, "대표팀 에이스", "special");
  }else if(id==="steadyInternational"){
    add(UI_ILLUSTRATIONS.competition.worldTour, "월드투어 무대", "competition");
    add(UI_ILLUSTRATIONS.result.bronze, "꾸준한 국제대회 강자", "result");
  }else if(id==="rivalChampion" || id==="eternalRival"){
    add(UI_ILLUSTRATIONS.competition.worlds, "라이벌과 맞붙은 큰 무대", "competition");
    add(UI_ILLUSTRATIONS.result.gold, id==="rivalChampion" ? "라이벌을 넘어선 챔피언" : "영원한 라이벌", "result");
  }else if(id==="relayLegend"){
    add(UI_ILLUSTRATIONS.competition.worlds, "세계선수권 계주 무대", "competition");
    add(UI_ILLUSTRATIONS.result.gold, "계주 레전드", "result");
  }else if(id==="worldRecord"){
    add(UI_ILLUSTRATIONS.competition.worlds, "기록이 나온 국제 무대", "competition");
    add(UI_ILLUSTRATIONS.special.legendEnding, "세계기록 보유자", "special");
  }else if(id==="comeback"){
    add(UI_ILLUSTRATIONS.special.injury, "부상과 재활", "special");
    add(UI_ILLUSTRATIONS.special.legendEnding, "부상 극복의 아이콘", "special");
  }else if(id==="tactician"){
    add(UI_ILLUSTRATIONS.competition.worldTour, "전술이 빛난 레이스", "competition");
    add(UI_ILLUSTRATIONS.result.gold, "빙판의 전략가", "result");
  }else if(id==="idol"){
    add(UI_ILLUSTRATIONS.special.legendEnding, "국민적 스타", "special");
    add(UI_ILLUSTRATIONS.result.gold, "팬들이 기억한 시상대", "result");
  }else if(id==="taintedAce"){
    add(UI_ILLUSTRATIONS.result.noMedal, "논란이 남은 커리어", "result");
    add(UI_ILLUSTRATIONS.competition.worlds, "평가가 갈린 큰 무대", "competition");
  }else if(id==="isolatedTalent"){
    add(UI_ILLUSTRATIONS.result.noMedal, "고립된 천재", "result");
    add(UI_ILLUSTRATIONS.special.selectionFail, "관계가 무너진 라커룸", "special");
  }else if(id==="burnout"){
    add(UI_ILLUSTRATIONS.special.injury, "부상과 번아웃", "special");
    add(UI_ILLUSTRATIONS.result.noMedal, "무너진 유망주", "result");
  }else{
    add(UI_ILLUSTRATIONS.special.legendEnding, "최종 엔딩", "special");
  }
  return cards.length ? `<div class="result-visual-stack ending-visual-stack">${cards.join("")}</div>` : "";
}
function buildEndingVisualBlock(){
  const ending = finalCareerEnding();
  return getEndingVisualCards(ending);
}
function buildSeasonEndVisualBlock(ended){
  if(ended) return buildEndingVisualBlock();
  const src = UI_ILLUSTRATIONS.special.seasonEnd;
  const caption = '시즌 종료 평가 화면';
  if(!src) return '';
  return `<div class="season-end-visual"><img src="${src}" alt="${caption}"><div class="caption">${caption}</div></div>`;
}

function getEventSceneImage(meta={}, title=""){
  const gender = (game?.player?.gender || "Men");
  const bucket = EVENT_SCENE_IMAGES[gender] || {};
  const key = meta.imageKey || title || meta.title || "";
  if(bucket[key]) return bucket[key];
  return null;
}

function buildEventArt(body, meta={}){
  const role = meta.role || 'coach';
  const art = meta.art || 'training';
  const icon = meta.icon || '✨';
  const speaker = meta.speaker || '알림';
  const tag = meta.tag || '이벤트';
  const quote = meta.quote ? `<div class="event-quote">“${escapeHtml(meta.quote)}”</div>` : '';
  const note = meta.note ? `<div class="branch-note">${safeLineBreakHtml(meta.note)}</div>` : '';
  const expr = inferEventExpression(meta, meta.title || "", body || "");
  const portraitSrc = getPlayerPortrait(expr);
  const exprLabel = PORTRAIT_LABELS[expr] || "기본";
  const sceneSrc = getEventSceneImage(meta, meta.title || "");
  const sceneHtml = sceneSrc ? `<div class="event-scene-wrap"><img class="event-scene-image" src="${sceneSrc}" alt="이벤트 상황 이미지"><div class="event-scene-caption">상황 일러스트</div></div>` : '';
  return `<div class="event-art art-${safeClassToken(art)} event-role-${safeClassToken(role)}">
    <div class="event-portrait">
      <div class="event-badge">${escapeHtml(icon)}</div>
      <div class="event-portrait-image-wrap">
        <img class="event-portrait-image" src="${portraitSrc}" alt="선수 표정 이미지">
        <div class="event-portrait-note">주인공 반응 · ${escapeHtml(exprLabel)}</div>
      </div>
      <div class="event-speaker">${escapeHtml(speaker)}</div>
    </div>
    <div class="event-copy"><div class="speech-tag">${escapeHtml(tag)}</div>${quote}${sceneHtml}<div class="event-body-text">${safeLineBreakHtml(body)}</div>${note}</div>
  </div>`;
}



function clamp(n,min=0,max=100){ return Math.max(min, Math.min(max, Math.round(n))); }
function rand(min,max){ return Math.random()*(max-min)+min; }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function chance(p){ return Math.random() < p; }
function escapeHtml(value){
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  }[ch]));
}
function safeLineBreakHtml(value){
  return escapeHtml(value).replace(/&lt;br\s*\/?&gt;/gi, "<br>");
}
function safeClassToken(value){
  return String(value ?? "").replace(/[^a-zA-Z0-9_-]/g, "") || "default";
}
function sanitizeLogHtml(value){
  return escapeHtml(value).replace(/&lt;span class=&quot;log-tag&quot;&gt;([\s\S]*?)&lt;\/span&gt;/g, '<span class="log-tag">$1</span>');
}
function normalizeText(value, maxLength=200){
  return String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").slice(0, maxLength);
}
function isPlainObject(value){
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function normalizeLoadedGameData(data){
  if(!isPlainObject(data) || !isPlainObject(data.player)){
    throw new Error("invalid save data");
  }
  const p=data.player;
  if(!isPlainObject(p.stats)) p.stats={};
  if(!isPlainObject(p.statProgress)) p.statProgress={};
  if(!isPlainObject(p.statDecay)) p.statDecay={};
  if(!isPlainObject(p.medals)) p.medals={gold:0,silver:0,bronze:0};
  ["gold","silver","bronze"].forEach(k=>p.medals[k]=Math.max(0, Math.floor(Number(p.medals[k])||0)));
  if(!isPlainObject(p.bestTimes)) p.bestTimes={"500m":null,"1000m":null,"1500m":null};
  if(!isPlainObject(p.equipment)) p.equipment={};
  if(!Array.isArray(p.ownedEquipment)) p.ownedEquipment=[];
  if(!isPlainObject(p.relationships)) p.relationships={};
  if(!isPlainObject(p.social)) p.social=null;
  if(!Array.isArray(p.personality)) p.personality=[pick(PERSONALITIES)];
  if(!Array.isArray(p.hidden)) p.hidden=[pick(HIDDEN_TRAITS)];
  if(!Array.isArray(p.storyFlags)) p.storyFlags=[];
  if(!Array.isArray(p.aftereffects)) p.aftereffects=[];
  if(p.injury && !isPlainObject(p.injury)) p.injury=null;
  if(p.slump && !isPlainObject(p.slump)) p.slump=null;
  if(!isPlainObject(data.rival)) data.rival={};
  if(!Array.isArray(data.logs)) data.logs=[];
  if(!isPlainObject(data.album)) data.album={};
  if(!isPlainObject(data.flags)) data.flags={};
  if(!isPlainObject(data.competitionResults)) data.competitionResults={};
  if(!isPlainObject(data.opportunities)) data.opportunities={};
  if(!isPlainObject(data.competitionAlerts)) data.competitionAlerts={};
  if(!isPlainObject(data.eventState)) data.eventState={season:data.season||1,lastWeek:-99,recent:[],cooldowns:{},seasonalCount:0,rivalLastWeek:-99,rivalSeasonCount:0};

  p.name=normalizeText(p.name || pick(NAMES), 40);
  p.gender=p.gender==="Men" ? "Men" : "Women";
  p.country=normalizeText(p.country || "KOR", 12);
  p.age=clamp(Number(p.age)||15, 8, 45);
  p.personality=p.personality.map(v=>normalizeText(v, 30)).filter(Boolean).slice(0,3);
  p.hidden=p.hidden.map(v=>normalizeText(v, 30)).filter(Boolean).slice(0,3);
  if(!p.personality.length) p.personality=[pick(PERSONALITIES)];
  if(!p.hidden.length) p.hidden=[pick(HIDDEN_TRAITS)];
  p.storyFlags=p.storyFlags.map(v=>normalizeText(v, 80)).filter(Boolean).slice(0,120);
  p.ownedEquipment=p.ownedEquipment.map(v=>normalizeText(v, 40)).filter(id=>EQUIPMENT[id]).slice(0, Object.keys(EQUIPMENT).length);
  Object.keys(p.equipment).forEach(slot=>{
    const id=normalizeText(p.equipment[slot], 40);
    if(!EQUIPMENT[id]) delete p.equipment[slot];
    else p.equipment[slot]=id;
  });
  if(p.social){
    Object.keys(p.social).forEach(k=>p.social[k]=normalizeText(p.social[k], 50));
  }
  if(p.romance && isPlainObject(p.romance)){
    p.romance.status=normalizeText(p.romance.status, 20);
    p.romance.partnerName=normalizeText(p.romance.partnerName, 50);
  }
  if(p.injury) p.injury.name=normalizeText(p.injury.name, 80);
  if(p.slump) p.slump.reason=normalizeText(p.slump.reason, 120);

  data.rival.name=normalizeText(data.rival.name || "라이벌", 50);
  data.rival.type=normalizeText(data.rival.type || "fair", 30);
  data.rival.typeLabel=normalizeText(data.rival.typeLabel || "라이벌", 40);
  data.lastSpeaker=normalizeText(data.lastSpeaker || "코치", 40);
  data.lastDialogue=normalizeText(data.lastDialogue || "이번 주 일정을 정해 보자. 무리하면 빨리 성장하지만, 부상 위험도 커진다.", 600);
  data.logs=data.logs.slice(0,120).map(l=>({
    season:Math.max(1, Math.floor(Number(l?.season)||1)),
    week:Math.max(1, Math.floor(Number(l?.week)||1)),
    title:normalizeText(l?.title || "로그", 80),
    text:normalizeText(l?.text || "", 1200)
  }));
  return data;
}
function fmtTime(sec){
  if(!sec && sec!==0) return "-";
  const m = Math.floor(sec/60);
  const s = sec-m*60;
  if(m>0) return `${m}:${String(s.toFixed(3)).padStart(6,"0")}`;
  return s.toFixed(3);
}
function grade(v){
  if(v>=95) return "SS"; if(v>=90) return "S"; if(v>=80) return "A"; if(v>=70) return "B";
  if(v>=60) return "C"; if(v>=50) return "D"; if(v>=40) return "E"; return "F";
}
function gradeClass(g){ return g.toLowerCase(); }

function getStage(age){
  if(age < 15) return "youth";
  if(age < 18) return "junior";
  return "senior";
}
function stageLabel(){
  const age = game?.player?.age || 15;
  if(age < 15) return "꿈나무";
  if(age < 18) return "주니어";
  return "국가대표 후보";
}

function ensureGameDefaults(){
  if(!game || !game.player) return;
  const p=game.player;
  if(p.money == null) p.money = 300;
  if(p.fame == null) p.fame = 0;
  if(p.fan == null) p.fan = 0;
  if(!p.stats) p.stats = {};
  if(!p.statProgress) p.statProgress = {};
  if(!p.statDecay) p.statDecay = {};
  if(p.stats.sportsmanship == null) p.stats.sportsmanship = 55;
  if(p.stats.integrity == null) p.stats.integrity = 55;
  rebalanceEarlyStartingStatsIfNeeded();
  if(p.stress == null) p.stress = 15;
  if(p.slump === undefined) p.slump = null;
  if(!p.equipment) p.equipment = {suit:"basicSuit", skates:"basicSkates", blade:"basicBlade"};
  if(!p.ownedEquipment) p.ownedEquipment = ["basicSuit","basicSkates","basicBlade"];
  if(!p.relationships) p.relationships = {coach:50,rival:0,family:60,teammates:45};
  if(p.relationships.friendlyAthlete == null) p.relationships.friendlyAthlete = 45;
  if(p.relationships.hostileAthlete == null) p.relationships.hostileAthlete = 20;
  if(p.relationships.partner == null) p.relationships.partner = 0;
  if(!p.social) p.social = {goodRival:"착한 라이벌", badRival:"나쁜 라이벌", friendlyAthlete:"우호 선수", hostileAthlete:"적대 선수", hostileCountry:pick(["CHN","NED","CAN","ITA","HUN","USA"].filter(c=>c!==p.country))};
  if(p.romance == null) p.romance = {status:"none", weeks:0, cooldown:0, partnerName:null};
  if(!p.storyFlags) p.storyFlags = [];
  if(!game.album) game.album = {};
  if(game.seasonStartYear == null) game.seasonStartYear = 2026 + ((game.season||1)-1);
  if(!game.competitionResults) game.competitionResults = {};
  if(!game.opportunities) game.opportunities = {};
  if(!game.eventState) game.eventState = {season:game.season||1,lastWeek:-99,recent:[],cooldowns:{},seasonalCount:0,rivalLastWeek:-99,rivalSeasonCount:0};
  if(!game.statEventHistory) game.statEventHistory = {};
  if(!game.stateEventHistory) game.stateEventHistory = {};
  if(!game.relationshipEventHistory) game.relationshipEventHistory = {};
  if(game.eventState.season !== (game.season||1)){
    game.eventState = {season:game.season||1,lastWeek:-99,recent:[],cooldowns:{},seasonalCount:0,rivalLastWeek:-99,rivalSeasonCount:0};
  }
  if(!game.competitionAlerts) game.competitionAlerts = {};
  if(game.careerEnded === undefined) game.careerEnded = false;
  ensureRivalDefaults();
  if(!p.equipment) p.equipment = {suit:"basicSuit", skates:"basicSkates", blade:"basicBlade"};
  if(!p.ownedEquipment) p.ownedEquipment = ["basicSuit","basicSkates","basicBlade"];
  const defaultEquipment = {helmet:"basicHelmet", gloves:"basicGloves", guard:"basicGuard"};
  Object.entries(defaultEquipment).forEach(([slot,id])=>{
    if(!p.equipment[slot]) p.equipment[slot]=id;
    if(!p.ownedEquipment.includes(id)) p.ownedEquipment.push(id);
  });
  if(!p.lastReadiness) p.lastReadiness = null;
  if(!game.lastSpeaker) game.lastSpeaker = "코치";
  if(!p.bestTimes) p.bestTimes={"500m":null,"1000m":null,"1500m":null};
  normalizeBestTimesForRealisticModel();
  if(p.nationalTeamRank === undefined) p.nationalTeamRank = null;
  if(p.nationalTeamSelected === undefined) p.nationalTeamSelected = false;
  if(p.nationalTeamAuto === undefined) p.nationalTeamAuto = false;
  if(p.autoSelectedNextSeason === undefined) p.autoSelectedNextSeason = false;
  if(p.juniorNationalSelected === undefined) p.juniorNationalSelected = false;
  if(p.juniorNationalRank === undefined) p.juniorNationalRank = null;
  if(p.selectionRank1 === undefined) p.selectionRank1 = null;
  if(p.substituteStarts === undefined) p.substituteStarts = 0;
  if(p.olympicAppearances === undefined) p.olympicAppearances = 0;
  if(p.olympicMedals === undefined) p.olympicMedals = 0;
  if(p.olympicGold === undefined) p.olympicGold = 0;
  if(p.rivalWins === undefined) p.rivalWins = 0;
  if(p.rivalLosses === undefined) p.rivalLosses = 0;
  if(p.officialCompetitionCount === undefined) p.officialCompetitionCount = 0;
  if(p.internationalCompetitionCount === undefined) p.internationalCompetitionCount = 0;
  if(p.lastOfficialCompetitionWeek === undefined) p.lastOfficialCompetitionWeek = 0;
  if(p.negativeChoiceCount === undefined) p.negativeChoiceCount = 0;
  if(p.controversy === undefined) p.controversy = 0;
  if(p.warningCount === undefined) p.warningCount = 0;
  if(p.suspensionWeeks === undefined) p.suspensionWeeks = 0;
  if(p.lastSlumpWeek === undefined) p.lastSlumpWeek = -99;
}

function getEquipped(slot){
  ensureGameDefaults();
  const id = game.player.equipment?.[slot];
  return EQUIPMENT[id] || Object.values(EQUIPMENT).find(e=>e.slot===slot && e.price===0);
}
function getSuitClass(){ return getEquipped("suit")?.suitClass || "suit-basic"; }
function equipmentBonus(kind){
  ensureGameDefaults();
  return Object.values(game.player.equipment || {}).map(id=>EQUIPMENT[id]).filter(Boolean).reduce((sum,item)=>sum+(item.bonus?.[kind]||0),0);
}
function relationshipLabel(v){ if(v>=80) return "매우 좋음"; if(v>=60) return "좋음"; if(v>=40) return "보통"; if(v>=20) return "불안"; return "나쁨"; }
const STARTING_STAT_MODEL_VERSION = "12.9-difficulty-start-stats";
function difficultyLabel(difficulty){
  return difficulty==="hard" ? "하드" : difficulty==="easy" ? "이지" : "노말";
}
function startingStatRange(age, difficulty="normal"){
  // 12.9: 난이도별 초기 스탯.
  // 하드 = 기존 낮은 초기 스탯 / 노말 = 12.8 상향안 / 이지 = 노말보다 조금 더 상향.
  const d = difficulty || "normal";
  if(d==="hard"){
    if(age <= 12) return [32,48];
    if(age <= 15) return [42,60];
    return [55,72];
  }
  if(d==="easy"){
    if(age <= 12) return [44,60];
    if(age <= 15) return [56,74];
    return [68,84];
  }
  if(age <= 12) return [38,54];
  if(age <= 15) return [50,68];
  return [62,78];
}
function startingEthicsRange(age, difficulty="normal"){
  const d = difficulty || "normal";
  if(d==="hard"){
    if(age <= 12) return [44,62];
    if(age <= 15) return [48,66];
    return [52,70];
  }
  if(d==="easy"){
    if(age <= 12) return [52,70];
    if(age <= 15) return [58,76];
    return [64,82];
  }
  if(age <= 12) return [48,66];
  if(age <= 15) return [54,72];
  return [58,76];
}
function makeStats(age, difficulty="normal"){
  const range = startingStatRange(age, difficulty);
  const stats = {};
  Object.keys(STAT_LABELS).forEach(k => stats[k] = Math.round(rand(range[0],range[1])));

  // 어린 선수일수록 인성·스포츠맨십은 기술보다 조금 더 안정적으로 시작하게 조정.
  const ethics = startingEthicsRange(age, difficulty);
  stats.sportsmanship = Math.max(stats.sportsmanship || 0, Math.round(rand(ethics[0],ethics[1])));
  stats.integrity = Math.max(stats.integrity || 0, Math.round(rand(ethics[0],ethics[1])));
  return stats;
}
function rebalanceEarlyStartingStatsIfNeeded(){
  if(!game || !game.player) return;
  const p=game.player;
  if(p.startingStatModelVersion === STARTING_STAT_MODEL_VERSION) return;
  // 이미 오래 키운 세이브는 건드리지 않고, 시작 직후 캐릭터만 너무 낮은 초기값을 보정합니다.
  if((game.season||1)===1 && (game.week||1)<=8){
    const [min] = startingStatRange(p.age || 15, p.difficulty || "normal");
    const floor = Math.max(1, min-2);
    Object.keys(STAT_LABELS).forEach(k=>{
      if((p.stats[k]||0) < floor) p.stats[k] = floor + Math.round(rand(0,4));
    });
    addLog("초기 스탯 밸런스 조정", "초기 스탯이 지나치게 낮던 문제를 완화하기 위해 시작 능력치를 새 기준으로 보정했습니다.");
  }
  p.startingStatModelVersion = STARTING_STAT_MODEL_VERSION;
}

function getNewGameFormValues(){
  return {
    name: document.getElementById("newName").value.trim(),
    gender: document.getElementById("newGender").value,
    country: document.getElementById("newCountry").value,
    age: Number(document.getElementById("newAge").value),
    difficulty: document.getElementById("newDifficulty")?.value || "normal"
  };
}
function getNewGameSignature(){
  const v=getNewGameFormValues();
  return JSON.stringify(v);
}
function buildCandidateFromCurrentForm(){
  const v=getNewGameFormValues();
  const name = v.name || pick(NAMES);
  const gender = v.gender;
  const country = v.country;
  const age = v.age;
  const difficulty = v.difficulty || "normal";
  const personality = [pick(PERSONALITIES), pick(PERSONALITIES.filter(p=>true))].filter((v,i,a)=>a.indexOf(v)===i).slice(0,2);
  const hidden = [pick(HIDDEN_TRAITS), pick(HIDDEN_TRAITS)].filter((v,i,a)=>a.indexOf(v)===i).slice(0,2);
  const stats = makeStats(age, difficulty);
  applyHiddenStatBonus(stats, personality, hidden);
  return {name, gender, country, age, difficulty, personality, hidden, stats};
}
function refreshCandidateFromForm(){
  candidate = buildCandidateFromCurrentForm();
  candidateSignature = getNewGameSignature();
  return candidate;
}
function invalidateCandidatePreview(){
  candidate = null;
  candidateSignature = null;
  const box=document.getElementById("generatedPreview");
  if(box) box.innerHTML = "[선수 생성 미리보기] 버튼을 누르거나 바로 시작하면 현재 설정으로 선수가 생성됩니다.";
}

function previewCandidate(){
  const c = refreshCandidateFromForm();
  document.getElementById("generatedPreview").innerHTML =
    `<strong>${escapeHtml(c.name)}</strong> / ${c.gender==="Women"?"여자":"남자"} / ${escapeHtml(c.country)} / ${c.age}세 / ${escapeHtml(difficultyLabel(c.difficulty))} 모드<br>`+
    `초기 스탯 범위: ${startingStatRange(c.age, c.difficulty).join("~")} · 인성/스포츠맨십 ${startingEthicsRange(c.age, c.difficulty).join("~")}<br>`+
    `성격: ${c.personality.map(escapeHtml).join(" + ")}<br>`+
    `숨은 특성: ${c.hidden.map(escapeHtml).join(" / ")}<br>`+
    `초기 강점: ${getTopStats(c.stats).map(escapeHtml).join(", ")}<br>`+
    `※ 하드는 기존 초기 스탯, 노말은 기본 추천, 이지는 초반 답답함을 줄인 모드입니다. 난이도는 초기 스탯에만 영향을 주며, 이후 성장과 대회 구조는 동일합니다.`;
}
function applyHiddenStatBonus(stats, personality, hidden){
  if(personality.includes("승부욕 강함")) stats.fighting += 4;
  if(personality.includes("침착함")) { stats.mental += 4; stats.stability += 3; }
  if(personality.includes("팀플레이형")) stats.relay += 4;
  if(personality.includes("노력형")) stats.recovery += 3;
  if(hidden.includes("큰 경기 체질")) stats.mental += 4;
  if(hidden.includes("계주 적응력")) stats.relay += 5;
  if(hidden.includes("강한 부상 내성")) { stats.recovery += 4; stats.stability += 3; }
  Object.keys(stats).forEach(k => stats[k]=clamp(stats[k],1,100));
}
function startNewGame(){
  if(!candidate || candidateSignature !== getNewGameSignature()) previewCandidate();
  game = {
    season:1, seasonStartYear:2026, week:1, scene:"training", careerEnded:false, lastSpeaker:"코치", lastDialogue:"이번 주 일정을 정해 보자. 무리하면 빨리 성장하지만, 부상 위험도 커진다.",
    player:{
      ...candidate,
      condition:76, fatigue:18, injuryRisk:8, injury:null, aftereffects:[], statProgress:{}, statDecay:{},
      coach:"기본 코치", team:"개인 훈련", relayOrder:"미정",
      medals:{gold:0,silver:0,bronze:0},
      bestTimes:{"500m":null,"1000m":null,"1500m":null}, timingModelVersion:"8.9-level-calibrated-records",
      bestRelay:null,
      score:0, raceCount:0,
      nationalTeamRank:null, nationalTeamSelected:false, nationalTeamAuto:false, autoSelectedNextSeason:false,
      juniorNationalSelected:false, juniorNationalRank:null, selectionRank1:null, substituteStarts:0, olympicAppearances:0, olympicMedals:0, olympicGold:0, rivalWins:0, rivalLosses:0, officialCompetitionCount:0, internationalCompetitionCount:0, lastOfficialCompetitionWeek:0,
      money:300, fame:0, fan:0, stress:15, slump:null, lastReadiness:null, startingStatModelVersion:STARTING_STAT_MODEL_VERSION,
      equipment:{suit:"basicSuit", skates:"basicSkates", blade:"basicBlade", helmet:"basicHelmet", gloves:"basicGloves", guard:"basicGuard"},
      ownedEquipment:["basicSuit","basicSkates","basicBlade","basicHelmet","basicGloves","basicGuard"],
      relationships:{coach:50,rival:0,family:60,teammates:45,friendlyAthlete:45,hostileAthlete:20,partner:0},
      storyFlags:[], romance:{status:"none", weeks:0, cooldown:0, partnerName:null}, social:null,
      negativeChoiceCount:0, controversy:0, warningCount:0, suspensionWeeks:0
    },
    rival: makeRival(candidate.age),
    logs:[], album:{}, flags:{}, statEventHistory:{}, stateEventHistory:{}, relationshipEventHistory:{}, pendingRaceEffect:null
  };
  unlockAlbum("first_train");
  addLog("입단", `${game.player.name} 선수가 쇼트트랙 아카데미에 들어왔습니다.`);
  closeNewGameModal();
  populateActivities();
  render();
  saveGame(false);
  openTutorialModal();
  toast("새 선수 육성을 시작했습니다.");
}
const RIVAL_TYPES = {
  fair:{label:"정정당당형", desc:"서로 존중하며 안정적으로 성장", growth:.92, volatility:2, relationBias:2},
  provocateur:{label:"도발형", desc:"도발과 기복이 큰 라이벌", growth:.96, volatility:7, relationBias:-2},
  genius:{label:"천재형", desc:"초반부터 강한 벽 같은 존재", growth:.82, volatility:3, startBonus:8, relationBias:-1},
  effort:{label:"노력형", desc:"후반으로 갈수록 빠르게 성장", growth:1.08, volatility:2, lateBonus:3, relationBias:1}
};
function makeRival(age){
  const pool = RIVAL_POOLS[getStage(age)];
  const typeKey=pick(Object.keys(RIVAL_TYPES));
  const t=RIVAL_TYPES[typeKey];
  return {name:pick(pool), type:typeKey, typeLabel:t.label, power:(age<=12?42:age<=15?58:72)+(t.startBonus||0), relationship:0, wins:0, losses:0};
}
function ensureRivalDefaults(){
  if(!game.rival) game.rival=makeRival(game.player?.age||15);
  if(!game.rival.type){
    const typeKey=pick(Object.keys(RIVAL_TYPES));
    game.rival.type=typeKey;
    game.rival.typeLabel=RIVAL_TYPES[typeKey].label;
  }
  if(game.rival.wins===undefined) game.rival.wins=0;
  if(game.rival.losses===undefined) game.rival.losses=0;
}
function growRivalForNewSeason(){
  ensureRivalDefaults();
  const t=RIVAL_TYPES[game.rival.type] || RIVAL_TYPES.fair;
  const late = (game.season||1)>=5 ? (t.lateBonus||0) : 0;
  game.rival.power = clamp((game.rival.power||60) + 3*t.growth + late + rand(-t.volatility,t.volatility), 35, 105);
}
function getTopStats(stats){
  return Object.entries(stats).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k,v])=>`${STAT_LABELS[k]} ${v}`);
}
const EVENT_PERFORMANCE_WEIGHTS = {
  "500m": {
    label:"500m형",
    core:["reaction","acceleration","topSpeed","cornering"],
    weights:{
      reaction:.20, acceleration:.19, topSpeed:.18, cornering:.13,
      stability:.06, mental:.05, fighting:.04, tactics:.04,
      stamina:.03, passing:.03, recovery:.02,
      sportsmanship:.012, integrity:.012, relay:.006
    },
    desc:"스타트 반응, 가속력, 최고속도, 코너링이 가장 중요하지만 모든 스탯이 보조 반영됩니다."
  },
  "1000m": {
    label:"1000m형",
    core:["topSpeed","stamina","passing","tactics"],
    weights:{
      topSpeed:.15, stamina:.15, passing:.145, tactics:.145,
      cornering:.09, mental:.08, acceleration:.06, stability:.05,
      fighting:.04, reaction:.035, recovery:.02,
      sportsmanship:.015, integrity:.015, relay:.005
    },
    desc:"최고속도, 지구력, 추월, 전술 운영이 핵심이지만 모든 스탯이 보조 반영됩니다."
  },
  "1500m": {
    label:"1500m형",
    core:["stamina","tactics","mental","fighting"],
    weights:{
      stamina:.185, tactics:.165, mental:.12, passing:.12,
      fighting:.10, stability:.06, topSpeed:.06,
      recovery:.04, cornering:.04, acceleration:.03,
      sportsmanship:.025, integrity:.025, reaction:.02, relay:.01
    },
    desc:"지구력, 전술, 멘탈, 승부욕이 후반 운영을 좌우하지만 모든 스탯이 보조 반영됩니다."
  },
  "Relay": {
    label:"계주 핵심형",
    core:["relay","stability","topSpeed","tactics"],
    weights:{
      relay:.19, stability:.14, topSpeed:.12, tactics:.11,
      mental:.08, cornering:.06, acceleration:.055, stamina:.055,
      fighting:.05, passing:.04, recovery:.03,
      sportsmanship:.025, integrity:.025, reaction:.02
    },
    desc:"계주 센스, 안정성, 최고속도, 전술 이해도가 핵심이지만 모든 스탯이 보조 반영됩니다."
  }
};
function weightedStatScore(weights, stats=game.player.stats){
  return Object.entries(weights).reduce((sum,[k,w])=>sum+(stats[k]||0)*w,0);
}
function topWeightText(def, count=6){
  return Object.entries(def.weights)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,count)
    .map(([k,w])=>`${STAT_LABELS[k]} ${Math.round(w*100)}%`)
    .join(", ");
}
function getProfileDetails(){
  const stats = game.player.stats;
  const list = Object.entries(EVENT_PERFORMANCE_WEIGHTS).map(([event,def])=>({
    event,
    label:def.label,
    score:weightedStatScore(def.weights, stats),
    core:def.core,
    desc:def.desc,
    weightText:topWeightText(def)
  })).sort((a,b)=>b.score-a.score);
  const top=list[0];
  const second=list[1];
  const coreText=top.core.map(k=>STAT_LABELS[k]).join(", ");
  return {
    top,
    second,
    label:top.label,
    detail:`핵심 스탯: ${coreText}. ${top.desc}<br>주요 반영 비율: ${top.weightText}<br>현재 ${top.label} 점수 ${top.score.toFixed(1)} / 2순위 ${second.label} ${second.score.toFixed(1)}`
  };
}
function getProfile(){
  return getProfileDetails().label;
}

function populateActivities(){
  for(let i=1;i<=3;i++){
    const sel = document.getElementById(`activity${i}`);
    const acts=availableActivities();
    sel.innerHTML = acts.map(a => `<option value="${a.id}">[${a.cat}] ${a.name}</option>`).join("");
    if(i===1) sel.value=hasSevereInjury()?"rehab":"basic_endurance";
    if(i===2) sel.value=hasSevereInjury()?"mental_care":"edge_control";
    if(i===3) sel.value=hasSevereInjury()?"rest":"mental_care";
    renderCategoryButtons(i);
  }
  updateActivityHelp();
}
function hasSevereInjury(){
  return !!(game?.player?.injury && game.player.injury.severe);
}
function isRecoveryActivityDuringSevereInjury(a){
  if(!a) return false;
  if(!hasSevereInjury()) return true;
  return a.cat==="관리" || a.cat==="인성";
}
function availableActivities(){
  return ACTIVITIES.filter(isRecoveryActivityDuringSevereInjury);
}
function normalizeScheduleForSevereInjury(){
  if(!hasSevereInjury()) return;
  const fallback=["rehab","mental_care","rest"];
  for(let i=1;i<=3;i++){
    const sel=document.getElementById(`activity${i}`);
    if(!sel) continue;
    const current=ACTIVITIES.find(a=>a.id===sel.value);
    if(!isRecoveryActivityDuringSevereInjury(current)){
      sel.value=fallback[i-1] || "rehab";
      const intensity=document.getElementById(`intensity${i}`);
      if(intensity) intensity.value=i===1?"normal":"light";
    }
  }
}
function maybeDowngradeSevereInjury(reason="회복 단계 진입"){
  const p=game?.player;
  if(!p?.injury || !p.injury.severe) return false;
  if(p.injury.weeks<=2){
    p.injury.severe=false;
    p.injury.name = p.injury.name.replace(/^큰 부상 후 /,"");
    p.injury.name = `경미해진 ${p.injury.name}`;
    p.condition=clamp(p.condition+4,0,100);
    p.injuryRisk=clamp(p.injuryRisk-8,0,100);
    addLog("큰 부상 완화", `${reason}으로 큰 부상이 경미한 부상 단계로 내려왔습니다. 이제 물리적 훈련을 다시 선택할 수 있지만 무리하면 재발 위험이 있습니다.`);
    game.lastSpeaker="트레이너";
    game.lastDialogue="큰 고비는 넘겼어. 그래도 바로 강훈련으로 돌아가면 다시 다칠 수 있어.";
    return true;
  }
  return false;
}
function getActivityCategories(){
  return [...new Set(availableActivities().map(a=>a.cat))];
}
function renderCategoryButtons(slot){
  const box=document.getElementById(`categoryButtons${slot}`);
  if(!box) return;
  box.innerHTML=getActivityCategories().map(cat=>`<button type="button" class="cat-btn" onclick="openActivityCategory(${slot}, '${cat}')">${cat}</button>`).join("");
}
function openActivityCategory(slot, cat){
  const menu=document.getElementById(`activityMenu${slot}`);
  if(!menu) return;
  const current=document.getElementById(`activity${slot}`).value;
  document.querySelectorAll(`#categoryButtons${slot} .cat-btn`).forEach(btn=>{
    btn.classList.toggle("active", btn.textContent===cat);
  });
  const list=availableActivities().filter(a=>a.cat===cat);
  menu.innerHTML=list.map(a=>`
    <button type="button" class="activity-option ${a.id===current?'selected':''}" onclick="chooseActivity(${slot}, '${a.id}')">
      <strong>${a.name}</strong>
      <span>${a.desc}</span>
    </button>`).join("");
  menu.classList.remove("hidden");
}
function chooseActivity(slot, id){
  const sel=document.getElementById(`activity${slot}`);
  sel.value=id;
  const menu=document.getElementById(`activityMenu${slot}`);
  if(menu) menu.classList.add("hidden");
  document.querySelectorAll(`#categoryButtons${slot} .cat-btn`).forEach(btn=>btn.classList.remove("active"));
  updateActivityHelp();
}
function updateActivityPickerDisplay(){
  for(let i=1;i<=3;i++){
    const sel=document.getElementById(`activity${i}`);
    const chosen=document.getElementById(`chosenActivity${i}`);
    if(!sel || !chosen) continue;
    const a=ACTIVITIES.find(x=>x.id===sel.value);
    chosen.textContent=a ? `[${a.cat}] ${a.name}` : "일정 선택";
  }
}
function updateActivityHelp(){
  normalizeScheduleForSevereInjury();
  for(let i=1;i<=3;i++){
    const sel=document.getElementById(`activity${i}`);
    if(sel){
      const current=sel.value;
      const acts=availableActivities();
      const optionValues=[...sel.options].map(o=>o.value);
      const activityValues=acts.map(a=>a.id);
      if(optionValues.join("|") !== activityValues.join("|")){
        sel.innerHTML = acts.map(a => `<option value="${a.id}">[${a.cat}] ${a.name}</option>`).join("");
        sel.value = activityValues.includes(current) ? current : (i===1?"rehab":i===2?"mental_care":"rest");
      }
    }
    renderCategoryButtons(i);
  }
  const ids=[1,2,3].map(i=>document.getElementById(`activity${i}`).value);
  const descs=ids.map(id=>ACTIVITIES.find(a=>a.id===id)).filter(Boolean).map(a=>`<strong>${a.name}</strong>: ${a.desc}`);
  const severeNotice=hasSevereInjury() ? `<strong>큰 부상 회복 중</strong>: 물리적 훈련은 비활성화됩니다. 재활·회복·멘탈·인성 관련 일정만 선택할 수 있습니다.<br>` : "";
  document.getElementById("activityHelp").innerHTML = severeNotice + descs.join("<br>");
  updateActivityPickerDisplay();
}
function autoPlan(type){
  const set=(i,a,inten="normal")=>{document.getElementById(`activity${i}`).value=a;document.getElementById(`intensity${i}`).value=inten;}
  if(hasSevereInjury()){
    set(1,"rehab","normal"); set(2,"mental_care","light"); set(3,"rest","normal");
    updateActivityHelp();
    toast("큰 부상 회복 중에는 재활·멘탈·휴식 중심으로만 일정을 구성할 수 있습니다.");
    return;
  }
  if(type==="balanced"){
    set(1,"basic_endurance"); set(2,"ice_sense"); set(3,"pace_control");
  }else if(type==="race"){
    set(1,"condition_control","light"); set(2,"opponent_scout","normal"); set(3,"race_prep","normal");
  }else{
    set(1,"rest","normal"); set(2,"equipment","light"); set(3, game?.player?.injury?"rehab":"mental_care","normal");
  }
  updateActivityHelp();
}

function advanceWeek(){
  if(!game){ openNewGameModal(); return; }
  if(isCareerEnded()){
    toast("커리어가 종료되었습니다. 최종 엔딩을 확인하세요.");
    renderSeasonEndBox();
    return;
  }
  tickEventCooldowns();
  if(game.week > TOTAL_WEEKS){ nextSeason(); return; }
  if(hasUnhandledCurrentCompetition()){
    showCompetitionWeekAlertIfNeeded(true);
    if(!confirm("이번 주에 아직 처리하지 않은 대회가 있습니다. 참가하거나 포기하지 않고 다음 주로 넘어갈까요?")) return;
  }
  normalizeScheduleForSevereInjury();
  const schedule=[1,2,3].map(i=>({
    act:ACTIVITIES.find(a=>a.id===document.getElementById(`activity${i}`).value),
    intensity:document.getElementById(`intensity${i}`).value
  }));
  if(hasSevereInjury() && schedule.some(s=>s.act && !isRecoveryActivityDuringSevereInjury(s.act))){
    toast("큰 부상 회복 중에는 물리적 훈련을 진행할 수 없습니다.");
    normalizeScheduleForSevereInjury();
    updateActivityHelp();
    return;
  }
  let weekMessages=[];
  let raceResults=[];
  let scene = game.week > REGULAR_WEEKS ? "rest" : "training";
  schedule.forEach((item, idx)=>{
    const a = item.act;
    if(!a) return;
    if(a.race){
      const res = simulateRace(a.race, item.intensity);
      raceResults.push(res);
      weekMessages.push(`${a.race} 대회 참가: ${res.summary}`);
      scene = res.medal ? "podium" : "race";
    }else{
      applyActivity(a, item.intensity);
      weekMessages.push(`${a.name}(${INTENSITY[item.intensity].label}) 진행`);
      if(a.id==="rest") scene="rest";
      if(a.id==="rehab") scene="clinic";
    }
  });

  handleInjuryAndRecovery(schedule);
  handleRandomEvent();
  maybeTriggerNegativePlayEvent();
  if(game.week === 20 && getStage(game.player.age)!=="youth") unlockCoachSystem();

  const title = `${game.season}년 차 ${game.week}주`;
  addLog(title, weekMessages.join(" / "));
  game.lastDialogue = makeWeeklyDialogue(schedule, raceResults);
  game.scene = scene;
  game.week++;
  tickSlump();
  if(game.player.romance){
    if(game.player.romance.cooldown>0) game.player.romance.cooldown--;
    if(game.player.romance.status==="dating"){
      game.player.romance.weeks++;
      if(chance(.08)) triggerRomanceMaintenanceEvent();
    }
  }
  if(game.week === REGULAR_WEEKS+1){
    addLog("정규 시즌 종료", "이제 4주간 휴식·정비 기간입니다. 재활, 장비 점검, 휴식을 잘 활용하세요.");
    game.lastDialogue = "정규 시즌이 끝났어. 남은 4주는 다음 시즌을 위한 몸 관리가 중요하다.";
  }
  if(game.week > TOTAL_WEEKS){
    endSeason();
  }
  lastWeekSummary = {title, messages:weekMessages, races:raceResults, scene:game.scene, activities:buildWeekActivitySummary(schedule)};
  render();
  openWeekModal(lastWeekSummary);
  saveGame(false);
}

function ageGrowthMultiplier(){
  const age = game?.player?.age || 15;
  if(age <= 12) return 0.96;   // 꿈나무도 장기 육성에 맞게 성장 속도를 낮춤
  if(age <= 15) return 0.84;   // 유망주는 균형형
  if(age <= 18) return 0.72;   // 국가대표 후보는 즉전감이지만 성장 여지는 조금 적음
  if(age <= 24) return 0.62;   // 성인 초반부터 성장 속도는 둔화
  return 0.50;                 // 20대 중반 이후에는 유지·관리 중심
}
function addStatProgress(stat, amount){
  const p=game.player;
  if(!p.statProgress) p.statProgress={};
  p.statProgress[stat]=(p.statProgress[stat]||0)+amount;
  const whole=Math.floor(p.statProgress[stat]);
  if(whole>0){
    p.stats[stat]=clamp((p.stats[stat]||1)+whole,1,100);
    p.statProgress[stat]-=whole;
    return whole;
  }
  return 0;
}
function addRecoverableStatLoss(stat, amount){
  // 9.5: 이벤트/부상/슬럼프의 능력치 하락은 즉시 크게 깎지 않고
  // 내부 하락 게이지에 누적해, 훈련으로 회복 가능한 수준으로 조정합니다.
  const p=game.player;
  if(!STAT_LABELS[stat]) return 0;
  const current=p.stats?.[stat] ?? 50;
  if(current<=32) return 0; // 너무 낮은 스탯은 더 무너뜨리지 않음
  const resistance =
    (stat==="mental" ? statLinkFactor("mental",60,.20) : 0) +
    (["stability","cornering","reaction","acceleration","topSpeed","stamina","passing"].includes(stat) ? statLinkFactor("recovery",60,.12) : 0) +
    (stat==="stability" ? statLinkFactor("stability",60,.10) : 0);
  const adjusted = Math.max(0.10, Math.abs(amount) * (1-resistance));
  return addStatDecay(stat, adjusted);
}

function addStatDecay(stat, amount){
  const p=game.player;
  if(!p.statDecay) p.statDecay={};
  p.statDecay[stat]=(p.statDecay[stat]||0)+amount;
  const whole=Math.floor(p.statDecay[stat]);
  if(whole>0){
    p.stats[stat]=clamp((p.stats[stat]||1)-whole,1,100);
    p.statDecay[stat]-=whole;
    return whole;
  }
  return 0;
}
function applyDetraining(activityId, intensityKey){
  const p=game.player;
  const base=DETRAINING_ACTIVITIES[activityId];
  if(!base) return [];
  const mult = intensityKey==="light" ? 0.72 : intensityKey==="hard" ? 1.18 : 1.0;
  const targets = [...DETRAINING_STATS]
    .filter(k => (p.stats[k]||0) > 32)
    .sort((a,b)=>(p.stats[b]||0)-(p.stats[a]||0))
    .slice(0,2);
  const changed=[];
  targets.forEach((k,idx)=>{
    const loss=addStatDecay(k, base*mult*(idx===0?1:0.62));
    if(loss>0) changed.push(`${STAT_LABELS[k]} -${loss}`);
  });
  if(changed.length){
    addLog("훈련 감각 저하", `${ACTIVITIES.find(a=>a.id===activityId)?.name || "휴식"}으로 회복은 되었지만 훈련 공백 때문에 ${changed.join(", ")}.`);
  }
  return changed;
}


function isTrainingActivity(a){
  if(!a) return false;
  return ["기초 체력","빙상 감각","기술 훈련","전술 훈련","계주 훈련","대회 준비","실전 감각"].includes(a.cat);
}
function trainingReadinessMultiplier(){
  const p=game.player;
  let m=1;
  if(p.condition>=85) m+=.18;
  else if(p.condition>=72) m+=.10;
  else if(p.condition<30) m-=.28;
  else if(p.condition<45) m-=.16;

  if(p.fatigue<=18) m+=.12;
  else if(p.fatigue>=82) m-=.30;
  else if(p.fatigue>=65) m-=.17;

  if(p.injuryRisk<=12) m+=.08;
  else if(p.injuryRisk>=75) m-=.26;
  else if(p.injuryRisk>=55) m-=.14;

  if((p.stress||0)<=18) m+=.08;
  else if((p.stress||0)>=78) m-=.24;
  else if((p.stress||0)>=58) m-=.12;

  if(p.injury) m-=.45;
  if(p.slump) m-=.12;
  return Math.max(.25, Math.min(1.35, m));
}
function trainingReadinessLabel(mult){
  if(mult>=1.18) return "최상";
  if(mult>=1.05) return "좋음";
  if(mult>=.85) return "보통";
  if(mult>=.60) return "나쁨";
  return "위험";
}
function applyInjuredTrainingPenalty(a, intensityKey){
  const p=game.player;
  if(!p.injury || !isTrainingActivity(a)) return;
  const severe = intensityKey==="hard";
  const pool = ["reaction","acceleration","topSpeed","stamina","cornering","passing","stability","recovery"];
  const count = severe ? 2 : intensityKey==="normal" ? 1 : 0;
  const changed=[];
  const used=new Set();
  for(let i=0;i<count;i++){
    const stat=pick(pool.filter(k=>!used.has(k)));
    if(!stat) break;
    used.add(stat);
    const lossAmount = severe ? 0.85 : 0.45;
    const loss = addRecoverableStatLoss(stat, lossAmount);
    if(loss>0) changed.push(`${STAT_LABELS[stat]} -${loss}`);
  }
  p.condition=clamp(p.condition-(severe?8:4),0,100);
  p.fatigue=clamp(p.fatigue+(severe?10:5),0,100);
  p.injuryRisk=clamp(p.injuryRisk+(severe?12:5),0,100);
  if(severe) p.injury.weeks += 1;
  const statText = changed.length ? `${changed.join(", ")}. ` : "능력치가 즉시 크게 떨어지지는 않았습니다. ";
  addLog("부상 중 훈련 악화", `${a.name}을 부상 상태에서 ${INTENSITY[intensityKey].label} 진행했습니다. ${statText}${severe?"회복 기간도 1주 늘었습니다.":""}`);
}


function statLinkFactor(stat, highStart=60, maxBonus=.25){
  const v=(game?.player?.stats?.[stat] ?? 50);
  return Math.max(0, Math.min(maxBonus, (v-highStart)/(100-highStart)*maxBonus));
}
function fatigueLoadMultiplier(activity=null, intensityKey="normal", baseFatigue=0){
  const p=game.player;
  if(baseFatigue<=0) return 1;
  let m=1;
  // 근지구력이 높을수록 훈련 피로 누적 감소. 강훈련일수록 체감이 큽니다.
  const staminaBonus = statLinkFactor("stamina",55, intensityKey==="hard"?.34:intensityKey==="normal"?.24:.14);
  const recoveryBonus = statLinkFactor("recovery",55, intensityKey==="hard"?.18:intensityKey==="normal"?.14:.10);
  m -= staminaBonus + recoveryBonus;
  if(activity && ["basic_endurance","pace_control","final_lap","practice_race"].includes(activity.id)){
    m -= statLinkFactor("stamina",65,.07);
  }
  if(p.hidden?.includes("강한 부상 내성")) m -= .04;
  return Math.max(.48, m);
}
function fatigueRecoveryMultiplier(){
  let m=1;
  m += statLinkFactor("recovery",55,.32);
  m += statLinkFactor("stamina",65,.12);
  if(game.player.hidden?.includes("강한 부상 내성")) m += .08;
  return m;
}
function injuryLoadMultiplier(activity=null, intensityKey="normal", baseRisk=0){
  if(baseRisk<=0) return 1;
  let m=1;
  // 안정성은 기술 실수/접촉 위험, 회복력은 과부하 누적, 코너링은 빙상 기술 훈련 부상위험을 줄입니다.
  m -= statLinkFactor("stability",55, intensityKey==="hard"?.22:.14);
  m -= statLinkFactor("recovery",55, intensityKey==="hard"?.18:.12);
  if(activity && ["ice_sense","ice_balance","edge_control","corner_exit","inside_pass","outside_pass","technical_drill"].includes(activity.id)){
    m -= statLinkFactor("cornering",60,.10);
  }
  if(game.player.hidden?.includes("강한 부상 내성")) m -= .10;
  if(game.player.personality?.includes("예민함")) m += .06;
  return Math.max(.45, m);
}
function injuryRecoveryMultiplier(){
  let m=1;
  m += statLinkFactor("recovery",55,.36);
  m += statLinkFactor("stability",65,.12);
  if(game.player.hidden?.includes("강한 부상 내성")) m += .14;
  return m;
}
function conditionDrainMultiplier(activity=null, intensityKey="normal", baseCondition=0){
  if(baseCondition>=0) return 1;
  let m=1;
  m -= statLinkFactor("stamina",60, intensityKey==="hard"?.18:.10);
  m -= statLinkFactor("recovery",60, intensityKey==="hard"?.12:.08);
  if(game.player.stats?.mental>=75) m -= .04;
  return Math.max(.55, m);
}
function stressGainMultiplier(reason="training"){
  let m=1;
  m -= statLinkFactor("mental",60,.28);
  m -= statLinkFactor("recovery",65,.08);
  if(game.player.hidden?.includes("슬럼프 저항력")) m -= .12;
  if(game.player.personality?.includes("침착함")) m -= .08;
  if(game.player.personality?.includes("예민함")) m += .10;
  return Math.max(.48, m);
}
function raceLoadMultiplier(event){
  let m=fatigueLoadMultiplier(null,"normal",10);
  if(event==="1500m") m -= statLinkFactor("stamina",55,.12);
  if(event==="1000m") m -= statLinkFactor("stamina",65,.06);
  return Math.max(.45,m);
}
function raceInjuryLoadMultiplier(event){
  let m=injuryLoadMultiplier(null,"normal",5);
  if(event==="500m") m -= statLinkFactor("reaction",70,.04);
  if(event==="Relay" || event==="Mixed Relay") m -= statLinkFactor("relay",65,.05);
  return Math.max(.45,m);
}
function raceConditionDrainMultiplier(event){
  let m=conditionDrainMultiplier(null,"normal",-5);
  if(event==="1500m") m -= statLinkFactor("stamina",60,.08);
  return Math.max(.55,m);
}

function applyActivity(a, intensityKey){
  const p=game.player;
  const mult=INTENSITY[intensityKey];
  const readiness = trainingReadinessMultiplier();
  const readinessLabel = trainingReadinessLabel(readiness);
  const physicalTraining = isTrainingActivity(a);

  Object.entries(a.effects).forEach(([k,v])=>{
    let amount=v;
    if(STAT_LABELS[k]){
      const readinessFactor = physicalTraining && v>0 ? readiness : 1;
      const injuryFactor = p.injury && physicalTraining && v>0 ? (intensityKey==="hard" ? 0.05 : 0.35) : 1;
      amount = v * mult.stat * growthBonus(k) * TRAINING_GROWTH_SCALE * ageGrowthMultiplier() * readinessFactor * injuryFactor;
      if(k==="mental" && amount>0) amount *= MENTAL_TRAINING_GAIN_SCALE;
      if(k==="fighting" && amount>0) amount *= FIGHTING_TRAINING_GAIN_SCALE;
      if(k==="stability" && amount>0) amount *= STABILITY_TRAINING_GAIN_SCALE;
      if(amount >= 0){
        addStatProgress(k, amount);
      }else{
        p.stats[k]=clamp((p.stats[k]||1)+amount,1,100);
      }
    }else if(k==="fatigue"){
      const badReadinessFatigue = physicalTraining && readiness<.8 && v>0 ? 1.15 : 1;
      const loadFactor = v>0 ? fatigueLoadMultiplier(a, intensityKey, v) : fatigueRecoveryMultiplier();
      p.fatigue=clamp(p.fatigue + v*mult.fatigue*badReadinessFatigue*loadFactor,0,100);
    }else if(k==="condition"){
      const factor = v<0 ? mult.condition : 1;
      const drainFactor = v<0 ? conditionDrainMultiplier(a, intensityKey, v) : 1;
      p.condition=clamp(p.condition + v*factor*drainFactor,0,100);
    }else if(k==="injuryRisk"){
      const factor = v>0 ? mult.injury : 1;
      const badReadinessRisk = physicalTraining && readiness<.8 && v>0 ? 1.2 : 1;
      const riskFactor = v>0 ? injuryLoadMultiplier(a, intensityKey, v) : injuryRecoveryMultiplier();
      p.injuryRisk=clamp(p.injuryRisk + v*factor*badReadinessRisk*riskFactor,0,100);
    }else if(k==="stress"){
      p.stress=clamp((p.stress||0)+v,0,100);
    }else if(k==="fame"){
      p.fame=clamp((p.fame||0)+v,0,9999);
    }else if(k==="fan"){
      p.fan=clamp((p.fan||0)+v,0,999999);
    }else if(k==="money"){
      p.money=Math.max(0,(p.money||0)+v);
    }else if(k==="score"){
      p.score=Math.max(0,(p.score||0)+v);
    }else if(k==="rehab" && p.injury){
      p.injury.weeks = Math.max(0, p.injury.weeks-1);
      if(p.injury.weeks===0) recoverInjury(true);
      else maybeDowngradeSevereInjury("재활 훈련");
    }
  });

  if(physicalTraining){
    p.lastReadiness = {week:game.week, value:readiness, label:readinessLabel, activity:a.name};
    if(readiness>=1.18) addLog("훈련 효율 상승", `${a.name}: 컨디션·피로·부상위험·스트레스 관리가 좋아 성장 효율이 높아졌습니다. (${readinessLabel})`);
    if(readiness<.70) addLog("훈련 효율 저하", `${a.name}: 몸 상태와 스트레스가 좋지 않아 성장 효율이 낮아졌습니다. (${readinessLabel})`);
  }

  applyInjuredTrainingPenalty(a, intensityKey);

  if(intensityKey==="hard") p.stress=clamp((p.stress||0)+7*stressGainMultiplier("hardTraining"),0,100);
  if(intensityKey==="light") p.stress=clamp((p.stress||0)-2,0,100);
  if(["rest","mental_care","condition_control"].includes(a.id)) p.stress=clamp((p.stress||0)-8,0,100);
  applyDetraining(a.id, intensityKey);
  if(a.cat==="계주 훈련") p.relationships.teammates=clamp(p.relationships.teammates+2,0,100);
  if(a.cat==="전술 훈련") p.relationships.coach=clamp(p.relationships.coach+1,0,100);
  if(a.cat==="관리") p.relationships.family=clamp(p.relationships.family+1,0,100);
  if(a.cat==="인성") { p.relationships.coach=clamp(p.relationships.coach+1,0,100); p.relationships.friendlyAthlete=clamp(p.relationships.friendlyAthlete+1,0,100); p.stress=clamp((p.stress||0)-1,0,100); }
  p.fatigue = clamp(p.fatigue - (p.stats.recovery/50 + p.stats.stamina/95),0,100);
}
function growthBonus(stat){
  let b=1;
  const p=game.player;
  if(p.hidden.includes("높은 잠재력")) b+=.10;
  if(p.hidden.includes("빠른 성장 속도")) b+=.12;
  if(p.hidden.includes("대기만성") && p.age>=18) b+=.12;
  if(p.personality.includes("노력형")) b+=.05;
  b += equipmentBonus("growth");
  if(p.fatigue>70) b-=.16;
  if(p.condition<35) b-=.10;
  if((p.stress||0)>70) b-=.08;
  if(p.injury) b-=.12;
  if(p.slump) b-=0.10 + (p.slump.severity||1)*0.04;
  const current = p.stats?.[stat] ?? 50;
  if(current < 45) b += .10;       // 낮은 스탯 보정도 더 완만하게 조정
  else if(current < 55) b += .05;
  else if(current < 65 && p.age>=18) b += .02;
  if(stat==="fighting" && current<72) b += .07;
  if(p.age>=25 && current<58) b += .025;  // 베테랑은 부족한 부분을 노련하게 보완할 여지가 있음
  p.aftereffects.forEach(e=>{ if(e.stat===stat) b-=e.penalty; });
  return Math.max(.22,b);
}
function maybeShortTrackFinalChaosMedal(event, rank, adjusted, accident, context={}){
  if(!["500m","1000m","1500m"].includes(event)) return {rank, log:null};
  if(rank<4 || rank>6) return {rank, log:null}; // Final A권/결승권 선수만
  if(accident?.type==="penalty" || accident?.type==="fall" || accident?.type==="externalFall") return {rank, log:null};

  const p=game.player;
  const s=p.stats||{};
  let prob = rank===4 ? .16 : rank===5 ? .09 : .045;

  // 쇼트트랙 변수: 전술·안정성·멘탈이 좋으면 앞선 선수의 접촉/실수 속에서 기회를 잡을 수 있음.
  prob += Math.max(0,(s.tactics||50)-68)*.0022;
  prob += Math.max(0,(s.stability||50)-68)*.0018;
  prob += Math.max(0,(s.mental||50)-70)*.0015;
  prob += Math.max(0,(s.passing||50)-70)*.0012;

  if(context.grade==="올림픽") prob += .025;
  else if(context.international || context.grade==="세계선수권") prob += .018;
  if(event==="500m") prob += .015;        // 단거리일수록 자리싸움 변수가 큼
  if(event==="1500m") prob += .006;       // 장거리도 결승 운영 변수는 있음
  if((p.stats.integrity||50)>=72 && (p.stats.sportsmanship||50)>=72) prob += .008; // 무리한 반칙보다 좋은 위치 선정
  if((p.fatigue||0)>80 || (p.injuryRisk||0)>75) prob *= .65;
  if(adjusted < 70) prob *= .55;          // 결승권이라도 경기력이 너무 낮으면 드묾

  prob = Math.max(0, Math.min(.30, prob));
  if(!chance(prob)) return {rank, log:null};

  const newRank = rank===4
    ? (chance(.22) ? 2 : 3)
    : 3;
  const log = rank===4
    ? "결승 막판 앞선 선수들의 접촉과 라인 변화 속에서 기회를 잡아 개인전 메달권으로 올라섰습니다. 쇼트트랙은 기록만으로 끝나는 종목이 아닙니다."
    : "결승권에서 끝까지 자리를 지키던 중 앞선 선수의 실수와 자리싸움이 겹치며 극적으로 동메달권에 진입했습니다.";
  return {rank:newRank, log};
}

function simulateRace(event, intensityKey, context={}){
  const p=game.player;
  unlockAlbum("first_race");
  const perf = calculatePerformance(event, context);
  const accident = checkRaceIncident(event, perf, context);
  const variance = context.grade==="올림픽" ? 10 : (context.international || context.grade==="세계선수권") ? 8 : (context.grade==="지역" || context.grade==="전국") ? 5 : 7;
  let adjusted = perf.score + rand(-variance,variance);
  const pendingRaceEffect = game.pendingRaceEffect || null;
  if(pendingRaceEffect?.scoreDelta) adjusted += pendingRaceEffect.scoreDelta;
  let logs = [];
  logs.push(...perf.logs);
  if(pendingRaceEffect?.log) logs.push(pendingRaceEffect.log);
  if(accident.type){
    logs.push(accident.log);
    adjusted += accident.delta;
    if(applyRaceCollisionInjury(accident, context)){
      logs.push(accident.external ? "상대 선수에 의한 충돌 여파로 부상까지 발생했습니다." : "넘어짐의 여파로 몸 상태를 확인해야 합니다.");
    }
  }

  let time=null;
  if(["500m","1000m","1500m"].includes(event)){
    time = makeTime(event, adjusted, context);
  }

  let rank = rankFromScore(adjusted, event, context, time);
  if(pendingRaceEffect?.rankShift){
    rank = Math.max(1, Math.min(12, rank + pendingRaceEffect.rankShift));
    logs.push(pendingRaceEffect.rankShift < 0 ? "경기 중 선택이 순위 상승으로 이어졌습니다." : "경기 중 선택이 순위 손실로 이어졌습니다.");
  }
  game.pendingRaceEffect = null;

  // 12.5: 쇼트트랙은 기록 경쟁이 아니라 순위 경쟁입니다.
  // 메달권 기록 기준을 절대 장벽으로 사용하지 않고, 결승권 선수는 변수 속에서 메달을 딸 수 있습니다.
  const chaosMedal = maybeShortTrackFinalChaosMedal(event, rank, adjusted, accident, context);
  if(chaosMedal.rank !== rank){
    rank = chaosMedal.rank;
    if(chaosMedal.log) logs.push(chaosMedal.log);
  }

  const limit = medalTimeLimit(event, context);
  if(time!=null && rank<=3 && time > limit){
    logs.push(`측정 기록은 ${fmtTime(time)}로 기준 기록(${fmtTime(limit)})보다 느렸지만, 결승 운영과 자리싸움 속에서 순위로 메달을 만들어 냈습니다.`);
  }

  if(context.grade==="올림픽" && rank===1){
    // 올림픽 금메달은 여전히 정말 잘 키운 선수에게 유리하지만, 기록 장벽이 아니라 결승 수행력 기준으로 판정.
    const goldPerformanceLine = 100 + ((event==="500m") ? 1.2 : event==="1000m" ? .8 : .4);
    if(adjusted < goldPerformanceLine && chance(.62)){
      logs.push("올림픽 결승에서 금메달까지는 한 끗이 모자랐지만, 마지막까지 시상대 경쟁을 이어갔습니다.");
      rank = chance(.55) ? 2 : 3;
    }
  }

  const medal = rank===1?"gold":rank===2?"silver":rank===3?"bronze":null;
  if(medal){
    p.medals[medal]++;
    if(context.grade==="올림픽"){
      p.olympicMedals=(p.olympicMedals||0)+1;
      if(medal==="gold") p.olympicGold=(p.olympicGold||0)+1;
    }
    if(medal==="gold") unlockAlbum("first_gold");
    unlockAlbum("first_medal");
    if(event.includes("Relay")) unlockAlbum("relay_medal");
  }
  if(context.grade==="올림픽") p.olympicAppearances=(p.olympicAppearances||0)+1;
  const rivalLine = (game.rival.power||60) + rand(-5,8);
  if(adjusted > rivalLine) {
    game.rival.relationship += 1;
    game.rival.losses=(game.rival.losses||0)+1;
    p.rivalWins=(p.rivalWins||0)+1;
    const fairBonus=((p.stats.sportsmanship||50)+(p.stats.integrity||50))>=140 ? 2 : 0;
    p.relationships.rival=clamp((p.relationships.rival||0)+4+fairBonus+(RIVAL_TYPES[game.rival.type]?.relationBias||0),0,100);
    if(chance(.25)) unlockAlbum("rival_win");
  }else if(context.international || context.grade==="올림픽" || chance(.35)){
    game.rival.wins=(game.rival.wins||0)+1;
    p.rivalLosses=(p.rivalLosses||0)+1;
    p.relationships.rival=clamp((p.relationships.rival||0)+1-(game.rival.type==="provocateur"?2:0),0,100);
    logs.push(`${game.rival.name}이 이번 경기에서 더 앞선 흐름을 보였습니다.`);
  }
  p.raceCount++;
  const scoreGain = medal==="gold"?120:medal==="silver"?80:medal==="bronze"?50:Math.max(5,22-rank*2);
  p.score += scoreGain;
  const baseFame = medal==="gold"?24:medal==="silver"?16:medal==="bronze"?10:rank<=6?4:rank<=9?1:0;
  let fameGain = Math.round(baseFame * (1+equipmentBonus("fame")));
  let fanGain = medal==="gold"?60:medal==="silver"?40:medal==="bronze"?26:rank<=6?10:rank<=9?3:0;
  if((p.stats.sportsmanship||0)>=75 && rank<=6) fanGain += 6;
  if((p.stats.integrity||0)>=75 && accident.type==="contact") fanGain += 4;
  if(accident.type==="penalty"){
    fameGain -= (p.stats.sportsmanship||50)<55 ? 5 : 2;
    fanGain -= (p.stats.integrity||50)<55 ? 14 : 6;
  }
  if(rank>=9 && (p.fame||0)>60){
    fameGain -= 2;
    fanGain -= 8;
  }
  p.fame = clamp((p.fame||0)+fameGain,0,9999);
  p.fan = clamp((p.fan||0)+fanGain,0,999999);
  p.money = Math.max(0, (p.money||0) + (medal==="gold"?160:medal==="silver"?110:medal==="bronze"?70:20));
  p.fatigue=clamp(p.fatigue + (event==="1500m"?18:14)*INTENSITY[intensityKey].fatigue*raceLoadMultiplier(event),0,100);
  p.condition=clamp(p.condition - 5*INTENSITY[intensityKey].condition*raceConditionDrainMultiplier(event),0,100);
  p.injuryRisk=clamp(p.injuryRisk + 5*INTENSITY[intensityKey].injury*raceInjuryLoadMultiplier(event),0,100);

  if(["500m","1000m","1500m"].includes(event)){
    const old=p.bestTimes[event];
    if(!old || time<old) p.bestTimes[event]=time;
    const bench=timeBenchmark(event, p.gender);
    const skill=eventRecordSkill(event);
    const potential=eventRecordPotential(event, adjusted);
    if(bench && time <= stageTimeLimit(event, p.gender, "internationalMedal")){
      addLog("국제 메달권 기록", `${event} ${fmtTime(time)}. 핵심 스탯 ${skill.toFixed(1)}, 기록 잠재치 ${potential.toFixed(1)}로 국제대회 메달권 페이스입니다.`);
    }
    if(bench && time <= stageTimeLimit(event, p.gender, "worldRecord")){
      addLog("세계신기록 근접", `${event} ${fmtTime(time)}. 세계신기록에 매우 근접한 레전드급 기록입니다.`);
    }
  }else{
    const result = `${rank}위`;
    if(!p.bestRelay || rank < p.bestRelay.rank) p.bestRelay={rank,result,event};
  }

  const roundText = makeRoundLog(event, rank, logs, accident);
  addLog("대회 결과", `<span class="log-tag">${event}</span>${roundText}`);
  return {
    event, rank, medal, time,
    summary:`${rank}위${medal?` · ${medal==="gold"?"금":medal==="silver"?"은":"동"}메달`:''}${time?` · ${fmtTime(time)}`:''}`,
    logs:roundText
  };
}
function calculatePerformance(event, context={}){
  const s=game.player.stats;
  const key = ["500m","1000m","1500m"].includes(event) ? event : "Relay";
  const def = EVENT_PERFORMANCE_WEIGHTS[key];
  let score=weightedStatScore(def.weights, s);
  let logs=[];

  if(key==="500m"){
    logs.push(s.reaction>75?"스타트 반응이 좋아 초반 위치를 잡았습니다.":"초반 스타트에서 약간 밀렸습니다.");
    logs.push(`500m 핵심 영향: ${def.core.map(k=>STAT_LABELS[k]).join(", ")}. 그 외 모든 스탯도 소량 반영됩니다.`);
  }else if(key==="1000m"){
    logs.push(s.tactics>75?"중반 레이스 운영이 안정적이었습니다.":"중반 자리싸움에서 고민이 많았습니다.");
    logs.push(`1000m 핵심 영향: ${def.core.map(k=>STAT_LABELS[k]).join(", ")}. 그 외 모든 스탯도 소량 반영됩니다.`);
  }else if(key==="1500m"){
    logs.push(s.stamina>75?"후반까지 페이스가 잘 유지되었습니다.":"후반 체력 부담이 보였습니다.");
    logs.push(`1500m 핵심 영향: ${def.core.map(k=>STAT_LABELS[k]).join(", ")}. 그 외 모든 스탯도 소량 반영됩니다.`);
  }else{
    logs.push(s.relay>75?"터치 타이밍이 매끄러웠습니다.":"계주 터치에서 아직 호흡을 맞춰야 합니다.");
    logs.push(`계주 핵심 영향: ${def.core.map(k=>STAT_LABELS[k]).join(", ")}. 그 외 모든 스탯도 소량 반영됩니다.`);
  }

  score += game.player.condition*.18 - game.player.fatigue*.16 - game.player.injuryRisk*.08 - (game.player.stress||0)*.05;
  if(context.grade==="올림픽") score += (s.mental-50)*.13 + (s.fighting-50)*.04 - 2.5;
  else if(context.international || context.grade==="세계선수권") score += (s.mental-50)*.075;
  else if(context.grade==="선발전") score += (s.mental-50)*.055;
  score += equipmentBonus("race");
  score += 0.8; // 12.6: 전체 플레이 난이도 아주 조금 완화
  if(event==="500m" || event==="1000m") score += equipmentBonus("speedRace");
  if(event==="500m" || event==="1500m") score += equipmentBonus("cornerRace");
  if(event.includes("Relay")) score += equipmentBonus("relayRace");
  if(game.player.hidden.includes("큰 경기 체질")) score += 5;
  if(game.player.personality.includes("승부욕 강함")) score += 3;
  if(game.player.slump) score -= 4 + (game.player.slump.severity||1)*2;

  return {score, logs};
}
function applyRaceCollisionInjury(accident, context={}){
  if(!accident || !accident.injuryChance) return false;
  const p=game.player;
  let chanceValue = accident.injuryChance;
  if(accident.external) chanceValue += .035;
  if(context.grade==="올림픽") chanceValue += .018;
  else if(context.international || context.grade==="세계선수권") chanceValue += .012;
  chanceValue += Math.max(0,(p.fatigue||0)-70)*.001;
  chanceValue += Math.max(0,(p.injuryRisk||0)-55)*.0012;
  chanceValue -= Math.max(0,(p.stats.recovery||50)-70)*.0007;
  chanceValue -= equipmentBonus("injuryGuard")*.006;
  chanceValue -= equipmentBonus("externalSafety")*.0035;
  if(p.hidden?.includes("강한 부상 내성")) chanceValue -= .035;
  chanceValue = Math.max(.006, Math.min(.34, chanceValue));
  if(!chance(chanceValue)) return false;

  const severeChance = Math.max(.04, Math.min(.28,
    (accident.external ? .11 : .05)
    + (context.grade==="올림픽" ? .04 : 0)
    + Math.max(0,(p.injuryRisk||0)-70)*.002
    - equipmentBonus("injuryGuard")*.01
  ));
  const severe = chance(severeChance);
  const injury = severe ? pick(["충돌성 무릎 인대 손상","충돌성 발목 인대 손상","어깨 타박과 허리 통증"]) : pick(["충돌성 타박상","발목 염좌","무릎 타박"]);
  const weeks = severe ? Math.floor(rand(4,8)) : Math.floor(rand(1,4));
  p.injury={name:injury,weeks,severe};
  p.condition=clamp(p.condition-(severe?22:12),0,100);
  p.injuryRisk=clamp(p.injuryRisk+(severe?16:8),0,100);
  applyInjuryStatLoss(severe, 0, accident.external ? "상대 선수 접촉" : "경기 중 충돌");
  addLog(severe ? "큰 부상" : (accident.external ? "상대 접촉 부상" : "경기 중 부상"), `${injury} 발생. 예상 회복 ${weeks}주. ${severe?"큰 부상 동안에는 물리적 훈련이 비활성화되고 재활·회복·멘탈·인성 일정만 진행할 수 있습니다. ":""}쇼트트랙은 좋은 주행을 해도 외부 변수에 휘말릴 수 있습니다.`);
  game.scene="clinic";
  game.lastSpeaker="트레이너";
  game.lastDialogue=accident.external ? "네 잘못이 아니어도 다칠 수 있는 게 쇼트트랙이야. 지금은 회복부터 보자." : "넘어진 뒤 몸 상태를 먼저 확인해야 해.";
  return true;
}

function checkRaceIncident(event, perf, context={}){
  const p=game.player;
  let risk = (100-(p.stats.stability+equipmentBonus("stability")))*.0018
    + (100-(p.stats.sportsmanship||50))*.00115
    + (100-(p.stats.integrity||50))*.00075
    + (100-(p.stats.recovery||50))*.00045
    + (100-(p.stats.mental||50))*.00035
    + p.fatigue*.0018 + p.injuryRisk*.0019;
  if(event==="500m") risk += (100-p.stats.reaction)*.00055;
  if(event==="1000m" || event==="1500m") risk += (100-p.stats.tactics)*.00025;
  if(event==="Relay" || event==="Mixed Relay") risk += (100-p.stats.relay)*.00055;
  if(p.hidden?.includes("강한 부상 내성")) risk-=.025;
  if(p.personality.includes("침착함")) risk-=.018;
  if(p.personality.includes("예민함")) risk+=.03;
  if(context.grade==="올림픽") risk*=1.27;
  else if(context.international || context.grade==="세계선수권") risk*=1.16;
  else if(context.grade==="지역" || context.grade==="전국") risk*=0.90;

  // 쇼트트랙 특성: 내가 안정적으로 타도 상대 접촉·넘어진 선수 회피 실패는 낮은 확률로 발생.
  const externalBase = context.grade==="올림픽" ? .028 : (context.international || context.grade==="세계선수권") ? .023 : .016;
  let externalRisk = externalBase;
  externalRisk += event==="500m" ? .006 : (event==="1000m" ? .004 : .003);
  if(event==="Relay" || event==="Mixed Relay") externalRisk += .005;
  externalRisk -= Math.max(0,(p.stats.tactics||50)-70)*.00008;
  externalRisk -= Math.max(0,(p.stats.stability||50)-75)*.00006;
  externalRisk -= equipmentBonus("externalSafety")*.0012;
  externalRisk = Math.max(.004, externalRisk);

  risk=Math.max(.01,risk);
  if(chance(risk + externalRisk)){
    const isExternal = chance(externalRisk / (risk + externalRisk));
    const types = isExternal ? [
      {type:"externalContact", delta:-32, external:true, injuryChance:.14, log:"상대 선수의 무리한 진입에 휘말려 라인이 크게 무너졌습니다."},
      {type:"externalFall", delta:-48, external:true, injuryChance:.22, log:"앞에서 넘어진 선수를 피하지 못해 함께 넘어졌습니다."},
      {type:"bladeContact", delta:-38, external:true, injuryChance:.18, log:"접촉 과정에서 스케이트 날이 걸리며 균형을 잃었습니다."}
    ] : [
      {type:"penalty", delta:-35, log:"무리한 추월 과정에서 페널티를 받았습니다."},
      {type:"fall", delta:-45, injuryChance:.06, log:"코너에서 중심이 흔들리며 넘어졌습니다."},
      {type:"contact", delta:-22, injuryChance:.05, log:"상대와 접촉해 속도가 크게 줄었습니다."}
    ];
    return pick(types);
  }
  let advChance = p.stats.tactics*.0011 + p.stats.stability*.001 + p.stats.mental*.00035 - p.fatigue*.00045;
  if(event==="Relay" || event==="Mixed Relay") advChance += p.stats.relay*.00035;
  if(chance(advChance*1.08)){
    return {type:"adv", delta:12, log:"앞선 선수들의 접촉 속에서도 좋은 위치를 지켜 어드밴스 기회를 얻었습니다."};
  }
  return {type:null, delta:0, log:""};
}
function rankFromScore(score,event,context={},time=null){
  const age=game.player.age;
  let base = age<15 ? 57 : age<18 ? 67 : 76.8;
  if(context.base==="junior_worlds") base += 4.5;
  if(context.international) base += 7.2;
  if(context.grade==="세계선수권") base += 1.7;
  if(context.grade==="올림픽") base += 6;
  if(event.includes("Relay")) base -= 3;
  const diff = score-base;
  if(diff>18) return 1;
  if(diff>11) return 2;
  if(diff>5) return 3;
  if(diff>0) return 4;
  if(diff>-8) return 5;
  if(diff>-16) return 6;
  return Math.floor(rand(7,12));
}
const REALISTIC_TIME_MODEL_VERSION = "8.9-level-calibrated-records";
const TIME_BENCHMARKS = {
  Women:{
    "500m":  {rookie:54.5, regional:48.0, juniorNational:44.4, seniorNational:43.6, internationalMedal:42.75, olympicGold:42.25, wr:41.90},
    "1000m": {rookie:114.0, regional:100.0, juniorNational:91.2, seniorNational:90.0, internationalMedal:88.0, olympicGold:87.0, wr:86.40},
    "1500m": {rookie:188.0, regional:160.0, juniorNational:145.5, seniorNational:143.5, internationalMedal:141.5, olympicGold:138.0, wr:134.50}
  },
  Men:{
    "500m":  {rookie:51.5, regional:45.0, juniorNational:41.8, seniorNational:40.8, internationalMedal:40.45, olympicGold:40.10, wr:39.80},
    "1000m": {rookie:109.0, regional:94.0, juniorNational:85.6, seniorNational:84.5, internationalMedal:84.0, olympicGold:82.2, wr:80.60},
    "1500m": {rookie:180.0, regional:154.0, juniorNational:138.8, seniorNational:138.2, internationalMedal:132.5, olympicGold:130.0, wr:127.50}
  }
};
function lerp(a,b,t){ return a + (b-a)*Math.max(0, Math.min(1, t)); }
function timeBenchmark(event, gender){
  return TIME_BENCHMARKS[gender==="Women"?"Women":"Men"][event];
}
function eventRecordSkill(event){
  const key = ["500m","1000m","1500m"].includes(event) ? event : null;
  if(!key || !game?.player?.stats) return 0;
  const def = EVENT_PERFORMANCE_WEIGHTS[key];
  return weightedStatScore(def.weights, game.player.stats);
}
function eventRecordPotential(event, score){
  // 11.8: 기록은 현실적으로 유지하되, 해당 종목 핵심 스탯이 최상위권이면 WR권까지 접근.
  const skill = eventRecordSkill(event);
  const key = ["500m","1000m","1500m"].includes(event) ? event : null;
  const def = key ? EVENT_PERFORMANCE_WEIGHTS[key] : null;
  const coreAvg = def ? def.core.reduce((sum,k)=>sum+(game.player.stats[k]||0),0) / def.core.length : skill;
  const raceBonus = Math.max(-6, Math.min(8, (score - skill) / 4.6));
  const eliteSkillBonus = Math.max(0, skill - 90) * .42;
  const eliteCoreBonus = Math.max(0, coreAvg - 92) * .55;
  return Math.max(1, Math.min(118, skill + raceBonus + eliteSkillBonus + eliteCoreBonus));
}
function eventGapScale(event){
  if(event==="500m") return {junior:.45, senior:.30, international:.22, nearWR:.16};
  if(event==="1000m") return {junior:1.30, senior:.90, international:.55, nearWR:.35};
  return {junior:3.00, senior:2.30, international:1.40, nearWR:.90};
}
function raceTimeRandomRange(event, context={}){
  let base = event==="500m" ? .46 : event==="1000m" ? 1.25 : 3.10;
  if(context.grade==="올림픽") base *= 1.18;
  else if(context.international || context.grade==="세계선수권") base *= 1.08;
  else if(context.grade==="지역" || context.grade==="전국") base *= .90;
  return base;
}
function raceTimeConsistencyBonus(){
  const p=game.player;
  let bonus=0;
  bonus += Math.max(0,(p.stats.stability||50)-60) * .003;
  bonus += Math.max(0,(p.stats.mental||50)-65) * .002;
  bonus += Math.max(0,(p.stats.tactics||50)-65) * .0015;
  return Math.min(.34, bonus);
}
function stageTimeLimit(event, gender, stage){
  const b=timeBenchmark(event, gender);
  const g=eventGapScale(event);
  if(stage==="juniorNational") return b.juniorNational + g.junior;
  if(stage==="seniorNational") return b.seniorNational + g.senior;
  if(stage==="internationalMedal") return b.internationalMedal + g.international;
  if(stage==="olympicGold") return b.olympicGold + g.nearWR;
  if(stage==="worldRecord") return b.wr + g.nearWR;
  return b.regional;
}
function fastestAllowedBySkill(event, gender, skill){
  const b=timeBenchmark(event, gender);
  const g=eventGapScale(event);
  // 스탯이 낮으면 컨디션이 좋아도 대표급/국제급 기록 한계선을 넘지 못하도록 제한.
  // 11.8: WR 경신은 종목 스탯이 거의 최대치일 때만 운 좋게 가능.
  if(skill < 58) return b.regional + g.junior;
  if(skill < 70) return b.juniorNational + g.junior;
  if(skill < 78) return b.seniorNational + g.senior;
  if(skill < 88) return b.internationalMedal + g.international;
  if(skill < 94) return b.olympicGold + g.nearWR*.88;
  if(skill < 97) return b.wr + g.nearWR*.42;
  if(skill < 99) return b.wr + g.nearWR*.12;
  return b.wr - g.nearWR*.22;
}
function makeTime(event, score, context={}){
  const gender=game.player.gender==="Women"?"Women":"Men";
  const b=timeBenchmark(event, gender);
  if(!b) return null;

  const skill = eventRecordSkill(event);
  const potential = eventRecordPotential(event, score);
  const g = eventGapScale(event);
  let time;

  // 11.8: 종목 핵심 스탯이 최상위권일 때 WR에 거의 근접, 아주 좋은 경기에서는 경신 가능.
  if(potential < 45){
    time = lerp(b.rookie, b.regional + g.junior*1.4, potential/45);
  }else if(potential < 60){
    time = lerp(b.regional + g.junior*1.4, b.regional, (potential-45)/15);
  }else if(potential < 70){
    time = lerp(b.regional, b.juniorNational, (potential-60)/10);
  }else if(potential < 78){
    time = lerp(b.juniorNational, b.seniorNational, (potential-70)/8);
  }else if(potential < 88){
    time = lerp(b.seniorNational, b.internationalMedal, (potential-78)/10);
  }else if(potential < 96){
    time = lerp(b.internationalMedal, b.olympicGold, (potential-88)/8);
  }else if(potential < 104){
    time = lerp(b.olympicGold, b.wr + g.nearWR*.55, (potential-96)/8);
  }else if(potential < 112){
    time = lerp(b.wr + g.nearWR*.55, b.wr - g.nearWR*.10, (potential-104)/8);
  }else{
    time = lerp(b.wr - g.nearWR*.10, b.wr - g.nearWR*.30, Math.min(1,(potential-112)/6));
  }

  const randomRange = raceTimeRandomRange(event, context);
  const consistency = raceTimeConsistencyBonus();
  // 기록 범위를 넓히되, 실력이 좋아질수록 평균은 빨라지고 편차는 조금 줄어듦.
  const spread = randomRange * (1 - consistency) * (potential>=96 ? .72 : potential>=88 ? .88 : 1.05);
  const elitePush = Math.max(0, potential-98) * (event==="500m" ? .007 : event==="1000m" ? .018 : .042);
  const tierJitter =
    potential>=112 ? rand(-0.10,0.16) :
    potential>=104 ? rand(-0.14,0.24) :
    potential>=96 ? rand(-0.22,0.38) :
    potential>=88 ? rand(-0.38,0.68) :
    potential>=70 ? rand(-0.70,1.10) :
    rand(-1.25,1.70);

  time += tierJitter + rand(-spread*.58, spread*.72) - elitePush;

  const fastestLimit = fastestAllowedBySkill(event, gender, skill);
  if(time < fastestLimit){
    time = fastestLimit + rand(0, spread*.22);
  }
  return Number(time.toFixed(2));
}
function levelTimeSummary(level){
  const gender=game.player.gender==="Women"?"Women":"Men";
  const label = gender==="Women"?"여자":"남자";
  const b500=timeBenchmark("500m", gender);
  const b1000=timeBenchmark("1000m", gender);
  const b1500=timeBenchmark("1500m", gender);
  if(level==="juniorNational"){
    return `${label} 주니어 대표권 기준: 500m ${fmtTime(b500.juniorNational)} 안팎, 1000m ${fmtTime(b1000.juniorNational)} 안팎, 1500m ${fmtTime(b1500.juniorNational)} 안팎`;
  }
  if(level==="seniorNational"){
    return `${label} 시니어 대표권 기준: 500m ${fmtTime(b500.seniorNational)} 안팎, 1000m ${fmtTime(b1000.seniorNational)} 안팎, 1500m ${fmtTime(b1500.seniorNational)} 안팎`;
  }
  if(level==="internationalMedal"){
    return `${label} 국제대회 메달권 기준: 500m ${fmtTime(b500.internationalMedal)} 안팎, 1000m ${fmtTime(b1000.internationalMedal)} 안팎, 1500m ${fmtTime(b1500.internationalMedal)} 안팎`;
  }
  return "";
}
function medalTimeLimit(event, context={}){
  if(!["500m","1000m","1500m"].includes(event)) return Infinity;
  const gender=game.player.gender==="Women"?"Women":"Men";
  if(context.base==="junior_worlds") return stageTimeLimit(event, gender, "juniorNational");
  if(context.international || ["국제","세계선수권","올림픽"].includes(context.grade)) return stageTimeLimit(event, gender, "internationalMedal");
  return Infinity;
}
function normalizeBestTimesForRealisticModel(){
  if(!game || !game.player) return;
  const p=game.player;
  if(!p.bestTimes) p.bestTimes={"500m":null,"1000m":null,"1500m":null};
  if(p.timingModelVersion === REALISTIC_TIME_MODEL_VERSION) return;

  // 8.9: 대표 선발권/국제 메달권 기준 기록이 새로 적용되므로 이전 최고기록 초기화.
  p.bestTimes={"500m":null,"1000m":null,"1500m":null};
  p.timingModelVersion = REALISTIC_TIME_MODEL_VERSION;
  if(game.logs){
    addLog("기록 산식 조정", "주니어·시니어 국가대표권, 국제대회 메달권, 세계신기록권 기준 기록을 새로 적용해 이전 개인 최고기록을 초기화했습니다.");
  }
}
function makeRoundLog(event, rank, logs, accident){
  const rounds = ["예선","준준결승","준결승",rank<=4?"Final A":"Final B"];
  let html = `<strong>${event} 최종 ${rank}위</strong><br>`;
  rounds.forEach((r,i)=>{
    html += `· ${r}: `;
    if(i===0) html += logs[0] || "안정적으로 출발했습니다.";
    else if(i===1) html += game.player.stats.passing>70 ? "중반 추월 타이밍을 잘 잡았습니다." : "추월 타이밍을 쉽게 만들지 못했습니다.";
    else if(i===2) html += accident.type ? accident.log : "큰 실수 없이 결승 진출권을 노렸습니다.";
    else html += rank<=3 ? "기록보다 중요한 자리싸움과 마지막 바퀴 집중력이 빛났습니다." : "마지막 바퀴에서 한 끗이 부족했습니다.";
    html += "<br>";
  });
  return html;
}

function makeWeeklyDialogue(schedule, raceResults){
  if(raceResults.length){
    const best = raceResults.sort((a,b)=>a.rank-b.rank)[0];
    if(best.medal) return `${best.event}에서 메달을 땄어! 오늘은 시상대의 공기를 기억해 두자.`;
    return `${best.event} 결과는 ${best.rank}위. 아쉽지만 로그를 보면 다음 훈련 방향이 보여.`;
  }
  const hard = schedule.filter(s=>s.intensity==="hard").length;
  if(game.player.injury) return "무리하지 말자. 지금은 성적보다 회복이 먼저야.";
  if(hard>=2) return "강훈련이 많았어. 성장 폭은 크지만 피로 관리가 필요하다.";
  if(game.player.fatigue<25 && game.player.condition>75) return "몸 상태가 좋아. 다음 대회를 준비해도 되겠어.";
  return "좋아. 작은 훈련이 쌓이면 커리어가 바뀐다.";
}

function handleInjuryAndRecovery(schedule){
  const p=game.player;
  if(p.injury){
    p.injury.weeks--;
    p.condition=clamp(p.condition-2,0,100);
    if(p.injury.weeks<=0) recoverInjury(false);
    else maybeDowngradeSevereInjury("시간 경과");
    return;
  }
  const hardCount=schedule.filter(s=>s.intensity==="hard").length;
  const hardStress = hardCount*.035*injuryLoadMultiplier(null,"hard",5);
  const risk=(p.injuryRisk*.0038)+(p.fatigue*.0027)+hardStress-(p.stats.recovery*.0017)-(p.stats.stability*.0008);
  if(chance(Math.max(0,risk))){
    const severe = p.injuryRisk>65 || hardCount>=2 && chance(.4);
    const injury = severe ? pick(["무릎 인대 손상","발목 인대 손상","허리 통증"]) : pick(["근육 피로","발목 통증","감기"]);
    const weeks = severe ? Math.floor(rand(4,8)) : Math.floor(rand(1,4));
    p.injury={name:injury,weeks,severe};
    p.condition=clamp(p.condition-18,0,100);
    p.injuryRisk=clamp(p.injuryRisk+12,0,100);
    applyInjuryStatLoss(severe, hardCount);
    addLog(severe?"큰 부상":"부상", `${injury} 발생. 예상 회복 ${weeks}주.${severe?" 큰 부상 동안에는 물리적 훈련이 비활성화되고 재활·회복·멘탈·인성 일정만 진행할 수 있습니다.":""}`);
    game.scene="clinic";
    game.lastDialogue=severe
      ? "큰 부상이야. 당분간 빙상·기술·체력 훈련은 중단하고 재활과 회복부터 해야 한다."
      : (hardCount>=2
        ? "과훈련이 부상으로 이어졌어. 회복뿐 아니라 떨어진 감각을 다시 끌어올려야 한다."
        : "부상이 발생했어. 조기 복귀보다 재활을 먼저 생각해야 해.");
  }
}
function recoverInjury(rehab){
  const p=game.player;
  const injury=p.injury;
  p.injury=null;
  p.injuryRisk=clamp(p.injuryRisk-(rehab?22:12),0,100);
  p.condition=clamp(p.condition+(rehab?12:6),0,100);
  if(injury?.severe && !rehab && chance(.45)){
    const stat=pick(["cornering","stability","topSpeed","acceleration"]);
    p.aftereffects.push({stat, penalty:.08});
    addLog("후유증", `${injury.name} 후유증으로 ${STAT_LABELS[stat]} 성장 효율이 낮아졌습니다.`);
  }else{
    unlockAlbum("injury_return");
    addLog("회복", "부상에서 복귀했습니다.");
  }
  if(typeof updateActivityHelp === "function") updateActivityHelp();
}

function triggerRomanceMaintenanceEvent(){
  if(!game || !game.player || game.player.romance.status!=="dating") return;
  const p=game.player;
  if(!romanceAllowed() && p.age<18) return;
  const positive = chance(.55 + (p.stats.integrity||50)*.002 - (p.stress||0)*.002);
  if(positive){
    addStatProgress("mental", 0.45);
    p.condition=clamp(p.condition+2,0,100);
    p.stress=clamp((p.stress||0)-2,0,100);
    p.relationships.partner=clamp((p.relationships.partner||0)+2,0,100);
    addLog("관계", `${p.romance.partnerName}과 서로의 대회를 응원하며 힘을 얻었습니다.`);
  }else{
    p.fatigue=clamp(p.fatigue+2,0,100);
    p.stress=clamp((p.stress||0)+3,0,100);
    p.relationships.partner=clamp((p.relationships.partner||0)-2,0,100);
    addLog("관계", `${p.romance.partnerName}과 일정 문제로 약간의 갈등이 생겼습니다.`);
  }
}


function hasCompetitionExperience(){
  ensureGameDefaults();
  return (game.player.officialCompetitionCount || 0) > 0;
}
function hasInternationalExperience(){
  ensureGameDefaults();
  return (game.player.internationalCompetitionCount || 0) > 0;
}
function hasUpcomingInternationalCompetition(withinWeeks=3){
  ensureGameDefaults();
  return getSeasonCompetitions().some(c =>
    c.international &&
    c.week >= game.week &&
    c.week <= game.week + withinWeeks &&
    isCompetitionEligible(c).ok
  );
}
function registerOfficialCompetition(comp){
  ensureGameDefaults();
  game.player.officialCompetitionCount = (game.player.officialCompetitionCount || 0) + 1;
  game.player.lastOfficialCompetitionWeek = game.week;
  if(comp?.international){
    game.player.internationalCompetitionCount = (game.player.internationalCompetitionCount || 0) + 1;
  }
}


// 13.0: 실제 능력치 14개 기반 이벤트 시스템.
// 낮은 능력치 2개 + 높은 능력치 2개 = 총 56개 후보를 동적으로 구성합니다.
const SKILL_EVENT_LOW_THRESHOLD = 60;
const SKILL_EVENT_HIGH_THRESHOLD = 80;
const SKILL_EVENT_LOW_COOLDOWN = 8;
const SKILL_EVENT_HIGH_COOLDOWN = 18;
const SKILL_EVENT_RACE_CHANCE = 0.84;

const SKILL_EVENT_CONFIG = {
  reaction:{
    label:"스타트 반응",
    lowTrainTitle:"출발음에 몸이 늦다",
    lowRaceTitle:"출발 직후 밀린 자리",
    highRaceTitle:"총성과 동시에 튀어나간 첫 발",
    highPrepTitle:"몸이 총성을 기다린다",
    weakness:"출발음이 울릴 때마다 몸이 반 박자 늦게 움직인다.",
    raceWeakness:"출발 직후 앞선 선수들이 먼저 코너 안쪽을 차지했다.",
    strength:"총성이 울리는 순간 몸이 먼저 반응했다.",
    raceStrength:"첫 직선에서 이미 좋은 위치를 잡았다.",
    support:["mental","stability","acceleration"]
  },
  acceleration:{
    label:"가속력",
    lowTrainTitle:"속도가 붙지 않는 두 번째 발",
    lowRaceTitle:"추월 타이밍을 놓친 직선",
    highRaceTitle:"한 번에 열린 추월 구간",
    highPrepTitle:"폭발적인 짧은 대시",
    weakness:"첫 발은 나쁘지 않지만 두 번째, 세 번째 발에서 속도가 붙지 않는다.",
    raceWeakness:"앞 선수가 잠깐 흔들렸지만 순간적으로 치고 나가는 힘이 부족했다.",
    strength:"짧은 대시에서 몸이 가볍게 튀어 나간다.",
    raceStrength:"코너 출구에서 앞 선수와의 간격이 빠르게 줄어든다.",
    support:["reaction","topSpeed","passing"]
  },
  topSpeed:{
    label:"최고속도",
    lowTrainTitle:"끝까지 뻗지 않는 직선",
    lowRaceTitle:"직선에서 벌어지는 간격",
    highRaceTitle:"직선에서 열린 길",
    highPrepTitle:"최고속도 테스트",
    weakness:"직선 후반에 스케이트가 더 나아가지 않는다.",
    raceWeakness:"직선 구간에서 앞 선수와의 간격이 조금씩 벌어진다.",
    strength:"직선 주행에서 속도가 살아난다.",
    raceStrength:"앞 선수와의 간격이 순식간에 좁혀진다.",
    support:["acceleration","stamina","stability"]
  },
  stamina:{
    label:"지구력",
    lowTrainTitle:"중반부터 무너지는 호흡",
    lowRaceTitle:"마지막 두 바퀴의 무거운 다리",
    highRaceTitle:"끝까지 줄지 않는 페이스",
    highPrepTitle:"끝까지 버티는 몸",
    weakness:"훈련 중반부터 호흡이 크게 흔들린다.",
    raceWeakness:"마지막 두 바퀴에 들어서자 다리가 무겁다.",
    strength:"긴 훈련을 마친 뒤에도 자세가 무너지지 않는다.",
    raceStrength:"다른 선수들이 흔들릴 때도 페이스가 무너지지 않는다.",
    support:["recovery","mental","stability"]
  },
  cornering:{
    label:"코너링",
    lowTrainTitle:"같은 지점에서 흔들리는 날",
    lowRaceTitle:"바깥으로 밀린 코너",
    highRaceTitle:"인코스가 열린 찰나",
    highPrepTitle:"코너에서 살아나는 감각",
    weakness:"같은 코너에서 스케이트 날이 자꾸 흔들린다.",
    raceWeakness:"코너 진입 순간 몸이 바깥으로 밀렸다.",
    strength:"코너를 도는 감각이 유난히 선명하다.",
    raceStrength:"코너 안쪽이 아주 잠깐 열렸다.",
    support:["stability","passing","tactics"]
  },
  passing:{
    label:"추월",
    lowTrainTitle:"추월 각이 보이지 않는다",
    lowRaceTitle:"앞에 갇힌 레이스",
    highRaceTitle:"길이 없어도 길을 만든다",
    highPrepTitle:"추월 루트가 보이는 영상",
    weakness:"모의 경기에서 추월할 타이밍을 계속 놓친다.",
    raceWeakness:"앞 선수의 속도가 느린데도 빠져나갈 길을 찾지 못한다.",
    strength:"상대의 리듬이 미세하게 흔들리는 순간이 보인다.",
    raceStrength:"겉보기에는 막힌 길에서 작은 틈이 보인다.",
    support:["cornering","acceleration","tactics"]
  },
  tactics:{
    label:"전술",
    lowTrainTitle:"작전 회의의 빈칸",
    lowRaceTitle:"읽지 못한 레이스 흐름",
    highRaceTitle:"두 바퀴 뒤를 읽은 판단",
    highPrepTitle:"작전판 위의 승부",
    weakness:"상대의 강점과 약점을 정리하는 데 어려움을 느낀다.",
    raceWeakness:"앞 선수들의 라인 변화가 예상보다 빠르게 이어졌다.",
    strength:"상대의 움직임이 몇 바퀴 뒤까지 그려진다.",
    raceStrength:"지금 당장 길은 없어도 곧 흐름이 바뀔 것이 보인다.",
    support:["mental","passing","stability"]
  },
  mental:{
    label:"멘탈",
    lowTrainTitle:"가슴이 먼저 뛰는 밤",
    lowRaceTitle:"결승장의 소음",
    highRaceTitle:"흔들리지 않는 마지막 바퀴",
    highPrepTitle:"고요하게 정리된 루틴",
    weakness:"몸보다 마음이 먼저 지친다.",
    raceWeakness:"관중 소리와 심판의 호각이 유난히 크게 들린다.",
    strength:"압박 속에서도 호흡이 흐트러지지 않는다.",
    raceStrength:"앞뒤의 압박이 거세지만 마음이 먼저 흔들리지 않는다.",
    support:["stability","tactics","recovery"]
  },
  recovery:{
    label:"회복력",
    lowTrainTitle:"풀리지 않는 다리",
    lowRaceTitle:"피로가 남은 몸",
    highRaceTitle:"후반에도 살아 있는 몸",
    highPrepTitle:"회복이 빠른 몸",
    weakness:"쉬었는데도 다리의 무거움이 사라지지 않는다.",
    raceWeakness:"레이스를 앞두고 몸이 완전히 올라오지 않는다.",
    strength:"강한 훈련 뒤에도 몸이 빠르게 돌아온다.",
    raceStrength:"여러 종목을 치른 뒤에도 생각보다 몸이 가볍다.",
    support:["stamina","mental","stability"]
  },
  stability:{
    label:"안정성",
    lowTrainTitle:"흔들리는 기본 자세",
    lowRaceTitle:"접촉에 흔들린 중심",
    highRaceTitle:"접촉 속에서도 살아남다",
    highPrepTitle:"무너지지 않는 중심",
    weakness:"속도는 나쁘지 않지만 자세가 자주 흔들린다.",
    raceWeakness:"옆 선수와 어깨가 스치자 중심이 크게 흔들렸다.",
    strength:"고속 코너와 접촉 상황에서도 중심이 잘 버틴다.",
    raceStrength:"접촉이 일어났지만 중심이 무너지지 않았다.",
    support:["cornering","mental","recovery"]
  },
  relay:{
    label:"계주 센스",
    lowTrainTitle:"혼자 빠른 계주",
    lowRaceTitle:"어긋난 터치 타이밍",
    highRaceTitle:"완벽한 터치",
    highPrepTitle:"팀의 리듬을 읽는 선수",
    weakness:"개인 속도는 괜찮지만 팀원과 호흡이 맞지 않는다.",
    raceWeakness:"터치 구간에 들어섰지만 타이밍이 애매하다.",
    strength:"팀원들의 리듬과 힘든 지점이 보인다.",
    raceStrength:"터치 구간에서 팀원의 속도와 진입 타이밍이 맞아떨어진다.",
    support:["tactics","stability","mental"]
  },
  fighting:{
    label:"승부욕",
    lowTrainTitle:"한 발 물러나는 습관",
    lowRaceTitle:"물러난 마지막 승부",
    highRaceTitle:"마지막까지 놓지 않는 칼날",
    highPrepTitle:"눈빛이 달라진 선수",
    weakness:"몸싸움이 시작될 때마다 한 발 물러난다.",
    raceWeakness:"마지막 바퀴, 추월할 작은 틈이 보였지만 몸이 먼저 망설인다.",
    strength:"불리한 위치에서도 포기하지 않는 기운이 살아 있다.",
    raceStrength:"마지막 한 바퀴, 아직 순위를 바꿀 수 있는 순간이 남아 있다.",
    support:["mental","passing","acceleration"]
  },
  sportsmanship:{
    label:"스포츠맨십",
    lowTrainTitle:"거칠어진 훈련 분위기",
    lowRaceTitle:"선을 넘을 수 있는 견제",
    highRaceTitle:"넘어진 선수를 피한 선택",
    highPrepTitle:"선수단의 신뢰",
    weakness:"훈련 중 몸싸움이 거칠어지자 팀원들의 표정이 굳는다.",
    raceWeakness:"심판 시야가 살짝 가려진 순간, 거칠게 견제하면 길이 열릴 수도 있다.",
    strength:"경쟁자와 함께 타도 선을 지키는 감각이 몸에 배어 있다.",
    raceStrength:"앞 선수가 흔들리며 넘어질 듯하다. 무리하면 큰 충돌이 날 수 있다.",
    support:["integrity","mental","stability"]
  },
  integrity:{
    label:"인성",
    lowTrainTitle:"팀보다 나를 먼저 보는 날",
    lowRaceTitle:"핑계가 먼저 떠오르는 순간",
    highRaceTitle:"결과보다 먼저 한 행동",
    highPrepTitle:"후배가 보는 등",
    weakness:"팀 훈련 중 자신의 기록만 챙기려는 태도가 드러났다.",
    raceWeakness:"마음 한편에서는 장비, 심판, 상대 탓을 하고 싶은 생각이 먼저 올라온다.",
    strength:"어떤 상황에서도 자신의 행동을 먼저 돌아보려 한다.",
    raceStrength:"접촉 상황 뒤, 자신의 행동이 레이스에 영향을 줬다는 걸 안다.",
    support:["sportsmanship","mental","teammates"]
  }
};

function isRelayRaceEventName(eventName){
  return /Relay|계주|Mixed/.test(eventName||"");
}
function isIndividualRaceEventName(eventName){
  return ["500m","1000m","1500m"].includes(eventName);
}
function supportsForStat(stat){
  return (SKILL_EVENT_CONFIG[stat]?.support || []).filter(k=>STAT_LABELS[k]);
}
function skillEventKey(ev){
  return ev?.id || `skill_${ev?.stat}_${ev?.level}_${ev?.context}`;
}
function skillEventMeetsCondition(ev){
  if(!game?.player?.stats) return false;
  const value=game.player.stats[ev.stat] || 0;
  if(ev.level==="low") return value < SKILL_EVENT_LOW_THRESHOLD;
  return value >= SKILL_EVENT_HIGH_THRESHOLD;
}
function skillEventCooldownOk(ev){
  ensureGameDefaults();
  if(!game.statEventHistory) game.statEventHistory={};
  const last=game.statEventHistory[skillEventKey(ev)] ?? -99;
  const cd=ev.level==="high" ? SKILL_EVENT_HIGH_COOLDOWN : SKILL_EVENT_LOW_COOLDOWN;
  return game.week - last >= cd;
}
function markSkillEvent(ev){
  ensureGameDefaults();
  if(!game.statEventHistory) game.statEventHistory={};
  game.statEventHistory[skillEventKey(ev)]=game.week;
}
function upcomingCompetitionWithin(weeks=2){
  const next=getSeasonCompetitions().find(c=>c.week>game.week && c.week<=game.week+weeks);
  return next || null;
}
function skillEventBody(ev){
  const c=SKILL_EVENT_CONFIG[ev.stat];
  if(ev.context==="race"){
    const first=ev.level==="low" ? c.raceWeakness : c.raceStrength;
    return `${first} 순위가 갈릴 수 있는 순간, 어떤 판단을 할지 정해야 한다.`;
  }
  if(ev.context==="prep"){
    return `${c.strength} 대회를 앞두고 코치는 이 감각을 어떻게 가져갈지 묻는다.`;
  }
  const first=ev.level==="low" ? c.weakness : c.strength;
  return `${first} 훈련이 잠깐 멈추고, 코치가 다음 선택을 기다린다.`;
}
function createSkillEvent(stat, level, context, index=0){
  const c=SKILL_EVENT_CONFIG[stat];
  const title = level==="low"
    ? (context==="race" ? c.lowRaceTitle : c.lowTrainTitle)
    : (context==="race" ? c.highRaceTitle : c.highPrepTitle);
  return {
    id:`skill_${stat}_${level}_${context}_${index}`,
    stat, level, context,
    title,
    body:skillEventBody({stat,level,context}),
    meta:{speaker:context==="race"?"코치":context==="prep"?"코치":"코치", role:"coach", art:context==="race"?"crowd":"training", icon:level==="low"?"⚠️":"✨", tag:`${c.label} ${level==="low"?"위기":"강점"}`, quote:level==="low"?"약점은 드러났을 때 잡아야 한다.":"지금의 강점을 어떻게 쓸지가 중요하다.", mood:level==="low"?"serious":"happy", imageKey:context==="race"?"국제대회":"훈련링크"},
    when:()=>skillEventMeetsCondition({stat,level,context}) && skillEventCooldownOk({id:`skill_${stat}_${level}_${context}_${index}`,stat,level,context}),
    choices:null
  };
}
function allSkillEvents(){
  const events=[];
  Object.keys(SKILL_EVENT_CONFIG).forEach(stat=>{
    events.push(createSkillEvent(stat,"low","train",1));
    events.push(createSkillEvent(stat,"low","race",2));
    events.push(createSkillEvent(stat,"high","race",3));
    events.push(createSkillEvent(stat,"high","prep",4));
  });
  return events;
}
function skillChoiceSuccessChance(ev, choice){
  const p=game.player;
  const stat=p.stats[ev.stat]||50;
  const support=supportsForStat(ev.stat);
  const supportAvg=support.length ? support.reduce((sum,k)=>sum+(p.stats[k]||50),0)/support.length : stat;
  let prob=.42 + (stat-55)*.006 + (supportAvg-55)*.003;
  if(ev.level==="high") prob += .12;
  if(choice.style==="safe") prob += .16;
  if(choice.style==="tactical") prob += .10;
  if(choice.style==="aggressive") prob -= .02;
  if(choice.style==="risky") prob -= .08;
  prob += Math.max(0,(p.condition||50)-60)*.0015;
  prob -= Math.max(0,(p.fatigue||0)-55)*.0025;
  prob -= Math.max(0,(p.injuryRisk||0)-45)*.0022;
  prob -= Math.max(0,(p.stress||0)-55)*.0020;
  if(p.hidden?.includes("큰 경기 체질") && ev.context==="race") prob+=.06;
  if(p.personality?.includes("침착함")) prob+=.03;
  if(p.personality?.includes("예민함")) prob-=.025;
  return Math.max(.16, Math.min(.88, prob));
}
function skillChoiceBaseEffects(ev, choice, success){
  const stat=ev.stat;
  const c=SKILL_EVENT_CONFIG[stat];
  const effects={
    noVariance:true,
    stats:{},
    status:{},
    relationships:{},
    logTitle:c.label,
    dialogueSpeaker:"코치"
  };
  const small=success ? rand(.9,1.6) : rand(.3,.8); // apply scale 후 0.2~0.4 안팎
  if(success){
    effects.stats[stat]=small;
    if(choice.style==="safe"){
      effects.status={stress:-2, condition:1};
      effects.dialogue="좋아. 무리하지 않고 흐름을 살렸어.";
    }else if(choice.style==="tactical"){
      effects.stats.tactics=(effects.stats.tactics||0)+.7;
      effects.relationships.coach=1;
      effects.status={stress:-1};
      effects.dialogue="판단이 좋아졌다. 다음에는 더 빨리 보일 거야.";
    }else if(choice.style==="aggressive"){
      effects.status={fatigue:2, stress:1};
      effects.stats.fighting=.6;
      effects.dialogue="이번엔 과감함이 통했다. 다만 몸 상태는 계속 봐야 해.";
    }else{
      effects.status={fatigue:4, injuryRisk:3, stress:2, controversy:1};
      effects.stats.fighting=.7;
      effects.stats.sportsmanship=-.7;
      effects.stats.integrity=-.4;
      effects.dialogue="결과는 만들었지만, 이런 방식이 반복되면 대가가 따른다.";
    }
  }else{
    if(choice.style==="safe"){
      effects.status={fatigue:-1, stress:-1};
      effects.stats.stability=.4;
      effects.dialogue="이번엔 순위를 바꾸진 못했지만 크게 무너지지 않았다.";
    }else if(choice.style==="tactical"){
      effects.status={stress:1};
      effects.stats.tactics=.5;
      effects.dialogue="판단은 늦었지만 배울 장면은 분명히 있었다.";
    }else if(choice.style==="aggressive"){
      effects.status={fatigue:4, injuryRisk:3, stress:3};
      effects.dialogue="타이밍이 맞지 않았다. 다음엔 몸 상태까지 같이 봐야 한다.";
    }else{
      effects.status={fatigue:5, injuryRisk:6, stress:4, controversy:1};
      effects.stats.stability=-.8;
      effects.stats.mental=-.5;
      effects.stats.sportsmanship=-.9;
      effects.stats.integrity=-.7;
      effects.dialogue="위험한 선택이 흔들림으로 돌아왔다.";
    }
  }
  if(ev.context==="train"){
    effects.log = success
      ? `${c.label}과 관련된 훈련 상황을 잘 넘기며 작은 성장 계기를 만들었습니다.`
      : `${c.label}과 관련된 약점이 드러났지만, 다음 훈련 방향은 분명해졌습니다.`;
  }else if(ev.context==="prep"){
    effects.log = success
      ? `대회 전 ${c.label} 감각을 잘 정리해 다음 대회를 준비했습니다.`
      : `대회 전 ${c.label} 점검이 완전히 맞아떨어지지는 않았습니다.`;
  }else{
    effects.log = success
      ? `레이스 중 ${c.label} 판단이 순위 싸움에 영향을 주었습니다.`
      : `레이스 중 ${c.label} 관련 판단이 흔들리며 손해를 보았습니다.`;
  }
  return effects;
}
function skillRaceEffect(ev, choice, success){
  if(ev.context!=="race") return null;
  let rankShift=0;
  let scoreDelta=0;
  if(success){
    if(choice.style==="safe"){ rankShift=0; scoreDelta=2; }
    else if(choice.style==="tactical"){ rankShift=chance(.55)?-1:0; scoreDelta=4; }
    else if(choice.style==="aggressive"){ rankShift=chance(.70)?-1:-0; scoreDelta=5; }
    else { rankShift=chance(.55)?-2:-1; scoreDelta=3; }
  }else{
    if(choice.style==="safe"){ rankShift=0; scoreDelta=0; }
    else if(choice.style==="tactical"){ rankShift=chance(.35)?1:0; scoreDelta=-2; }
    else if(choice.style==="aggressive"){ rankShift=chance(.55)?1:0; scoreDelta=-4; }
    else { rankShift=chance(.65)?2:1; scoreDelta=-6; }
  }
  return {rankShift, scoreDelta, log: success ? "능력치 이벤트 선택이 레이스 흐름에 긍정적으로 반영되었습니다." : "능력치 이벤트 선택이 레이스 흐름에 부담으로 남았습니다."};
}
function resolveSkillEventChoice(choice){
  const ev=choice.skillEvent;
  if(!ev) return;
  ["stats","status","relationships","log","dialogue","raceEffect","variationNote"].forEach(k=>delete choice[k]);
  const success=chance(skillChoiceSuccessChance(ev, choice));
  const effects=skillChoiceBaseEffects(ev, choice, success);
  Object.assign(choice, effects);
  choice.variationNote = success ? "판단이 맞아떨어졌습니다." : "판단이 완전히 맞아떨어지지는 않았습니다.";
  const race=skillRaceEffect(ev, choice, success);
  if(race){
    choice.raceEffect=race;
    game.pendingRaceEffect=race;
  }
  markSkillEvent(ev);
}

const SKILL_CHOICE_TEXTS = {
  reaction:{
    low_train:["출발음만 듣는 짧은 루틴부터 다시 만든다","눈·호흡·첫 발 순서를 코치와 맞춘다","첫 발보다 자세 안정부터 다시 잡는다","반응이 늦는 게 화나 강도를 확 올린다"],
    low_race:["첫 코너를 포기하고 뒤에서 라인을 정리한다","앞 선수 뒤에 붙어 첫 바퀴 흐름을 따라간다","바깥으로 크게 돌아 늦은 출발을 만회한다","좁은 안쪽 빈틈을 억지로 찌른다"],
    high_race:["총성과 동시에 안쪽 라인을 잠근다","선두 뒤에 붙어 첫 바퀴 체력을 아낀다","초반부터 속도를 올려 조를 흔든다","자리싸움에서 몸을 과하게 넣어 압박한다"],
    high_prep:["현재 출발 루틴을 고정하고 반복한다","첫 코너 진입 작전까지 연결한다","출발 감각을 결승용 비밀 카드로 아껴 둔다","감각이 좋을 때 더 몰아붙여 기록을 당긴다"]
  },
  acceleration:{
    low_train:["중심 이동을 느리게 쪼개서 반복한다","짧은 대시를 줄이고 자세 전환부터 잡는다","코너 출구에서 속도를 붙이는 감각을 익힌다","답답해서 힘으로 얼음을 더 세게 밀어낸다"],
    low_race:["이번 직선은 넘기고 다음 코너를 기다린다","뒤 선수의 흐름을 이용해 같이 올라간다","늦었지만 직선에서 한 번 승부를 건다","몸싸움을 감수하고 공간을 억지로 만든다"],
    high_race:["코너 출구에서 바로 치고 나간다","속도를 붙인 뒤 다음 코너에서 넘는다","선두권 뒤에 붙어 압박을 건다","무리한 가속으로 상대의 라인을 흔든다"],
    high_prep:["초반 압박 작전을 준비한다","추월 타이밍과 가속 구간을 연결한다","결승까지 폭발력을 숨기는 운영을 짠다","좋은 감각을 믿고 대시 훈련을 더 늘린다"]
  },
  topSpeed:{
    low_train:["직선 자세를 천천히 교정한다","전력 질주 대신 리듬 주행을 반복한다","코너 출구 속도를 살리는 쪽으로 접근한다","끝까지 뻗겠다고 전력 질주를 계속한다"],
    low_race:["앞 선수 뒤에 붙어 바람을 줄인다","코너에서 다시 좁힐 준비를 한다","직선에서 한 번만 무리해 따라붙는다","밀리지 않으려고 위험하게 라인을 바꾼다"],
    high_race:["직선 바깥으로 길게 뻗어 넘는다","속도를 유지하며 앞 선수를 압박한다","다음 코너 진입까지 참고 기다린다","선두를 잡고 레이스를 강하게 끌고 간다"],
    high_prep:["후반 스퍼트 작전을 준비한다","초반부터 빠른 페이스로 흔드는 작전을 짠다","속도보다 순위 운영을 우선하기로 한다","좋은 기록 감각을 믿고 강도를 더 올린다"]
  },
  stamina:{
    low_train:["긴 호흡의 기본 훈련으로 바꾼다","훈련 구간을 짧게 나누어 완주감을 만든다","회복 시간을 충분히 두고 다시 시작한다","남은 훈련량을 억지로 끝까지 채운다"],
    low_race:["라인을 좁혀 최대한 버틴다","마지막 한 번의 짧은 승부만 노린다","완주와 다음 라운드를 우선한다","끝까지 전력으로 밀어붙인다"],
    high_race:["마지막 두 바퀴부터 압박한다","선두를 따라가며 기회를 기다린다","긴 스퍼트로 조 전체를 흔든다","체력이 남았다는 걸 이용해 무리하게 끌고 간다"],
    high_prep:["1500m 운영 훈련을 추가한다","후반 추월 루틴을 만든다","계주 후반 주자 역할까지 점검한다","지구력이 좋다는 이유로 회복을 줄인다"]
  },
  cornering:{
    low_train:["속도를 낮추고 같은 코너를 반복한다","코치와 영상으로 라인을 확인한다","날과 보호 장비를 점검하고 다시 탄다","자존심이 상해 더 빠르게 코너에 들어간다"],
    low_race:["속도를 줄여 안쪽 라인을 회복한다","앞 선수 뒤에 붙어 라인을 따라간다","바깥 라인에서 다시 속도를 붙인다","몸을 더 눕혀 억지로 인코스를 버틴다"],
    high_race:["열린 인코스를 짧게 찌른다","한 박자 기다렸다가 코너 출구에서 넘는다","상대가 닫기 전에 압박한다","무리한 각도로 안쪽을 파고든다"],
    high_prep:["코너 출구 추월 작전을 준비한다","인코스 방어 연습을 한다","초반 자리싸움과 코너 진입을 연결한다","감각이 좋다는 이유로 진입 속도를 과하게 올린다"]
  },
  passing:{
    low_train:["추월 장면만 따로 느리게 분석한다","모의 경기에서 한 가지 루트만 반복한다","코너 출구 패턴부터 익힌다","답답해서 거칠게 몸을 넣어 본다"],
    low_race:["한 바퀴 더 기다리며 틈을 본다","뒤 선수의 움직임을 이용한다","바깥으로 크게 돌아본다","좁은 틈을 억지로 찌른다"],
    high_race:["코너 출구에서 바로 찌른다","직선에서 속도 차이를 만든다","상대가 막는 순간 반대로 돈다","길이 보이자 위험한 틈까지 욕심낸다"],
    high_prep:["한 종목에 집중해 추월 작전을 짠다","여러 패턴을 예비로 준비한다","추월보다 안전한 위치 선점을 택한다","라이벌에게만 쓸 무리한 비밀 패턴을 준비한다"]
  },
  tactics:{
    low_train:["상대 분석표를 다시 단순하게 정리한다","코치에게 작전을 한 번 더 설명해 달라고 한다","주요 선수 한 명만 집중 분석한다","이해한 척하고 회의 시간을 넘긴다"],
    low_race:["뒤로 빠져 레이스 흐름을 다시 본다","코치 사인만 믿고 위치를 바꾼다","감으로 빈틈을 노린다","흐름을 잃자 바깥으로 무리하게 빠진다"],
    high_race:["안쪽 뒤에 붙어 다음 혼전을 기다린다","바깥으로 빠져 위험 구간을 피한다","선두를 압박해 흐름을 바꾼다","예상만 믿고 너무 일찍 움직인다"],
    high_prep:["초반 선점 작전으로 정리한다","중반 추월 작전으로 정리한다","후반 역전 작전으로 정리한다","라이벌만 겨냥한 작전으로 좁혀 버린다"]
  },
  mental:{
    low_train:["훈련을 멈추고 호흡 루틴을 다시 한다","코치에게 불안을 솔직히 말한다","쉬운 동작부터 성공감을 되찾는다","긴장을 지우려고 강훈련으로 덮는다"],
    low_race:["첫 바퀴는 호흡을 늦추고 안정적으로 탄다","코치 사인만 보며 판단을 줄인다","아무 생각 없이 속도를 올린다","일부러 강하게 부딪혀 긴장을 깨려 한다"],
    high_race:["계획한 타이밍까지 침착하게 기다린다","압박을 버티며 라인을 지킨다","마지막 코너에서 승부를 건다","상대가 흔들리도록 신경전을 건다"],
    high_prep:["대회 루틴을 조용히 반복한다","목표를 결과보다 과정으로 다시 쓴다","팀 분위기를 먼저 정리한다","자신감이 넘쳐 준비 단계를 대충 넘긴다"]
  },
  recovery:{
    low_train:["회복 루틴을 새로 만든다","훈련 강도를 줄이고 몸 상태를 확인한다","재활성 보강 운동으로 전환한다","쉬는 시간이 아까워 그대로 진행한다"],
    low_race:["초반부터 무리하지 않고 몸 상태를 본다","후반 한 번만 승부할 수 있게 아낀다","계주나 다음 종목을 위해 힘을 남긴다","몸이 무거운 걸 숨기고 강하게 붙는다"],
    high_race:["초반부터 적극적으로 운영한다","후반 승부를 준비한다","계주까지 고려해 힘을 나눠 쓴다","몸이 가볍다며 라이벌과 무리하게 맞붙는다"],
    high_prep:["회복 루틴을 유지한다","기술 훈련의 질을 높인다","훈련량을 조금만 늘린다","회복이 빠르다는 이유로 휴식을 줄인다"]
  },
  stability:{
    low_train:["기본 자세 훈련으로 돌아간다","코너 안정 훈련을 한다","균형 훈련을 늘린다","불안정해도 빠른 훈련을 계속한다"],
    low_race:["속도를 줄여 중심을 회복한다","바깥으로 빠져 충돌을 피한다","몸싸움을 버티며 자리를 지킨다","똑같이 밀어붙여 중심을 빼앗는다"],
    high_race:["열린 공간으로 빠르게 빠져나간다","안전하게 라인을 지킨다","상대의 흔들림을 이용해 추월한다","접촉을 버틴 김에 더 강하게 압박한다"],
    high_prep:["접촉 대응 훈련을 한다","코너 진입 속도를 조금 높인다","계주 터치 상황을 연습한다","중심이 좋다는 이유로 위험한 접촉 훈련을 늘린다"]
  },
  relay:{
    low_train:["팀원과 터치 타이밍을 다시 맞춘다","순번별 역할을 함께 정리한다","개인 속도를 줄이고 팀 리듬을 익힌다","내가 더 빠르니 내 방식대로 하자고 주장한다"],
    low_race:["안전하게 늦춰 터치한다","코치가 정한 구간을 끝까지 지킨다","팀원의 속도에 맞춰 과감히 들어간다","욕심내서 더 빠른 타이밍에 들어간다"],
    high_race:["정석대로 완벽하게 연결한다","다음 주자를 위해 라인을 열어준다","조금 빠르게 받아 흐름을 끌어올린다","팀 흐름보다 내 속도를 먼저 살린다"],
    high_prep:["팀원별 터치 타이밍을 정리한다","코치에게 순번 조정을 제안한다","후배에게 계주 감각을 알려준다","계주 감각이 좋다며 개인전 훈련만 고집한다"]
  },
  fighting:{
    low_train:["짧은 승부 상황을 반복한다","멘탈 코칭으로 물러나는 이유를 찾는다","안정적인 스타일을 살리는 방향을 잡는다","갑자기 거칠게 타며 성향을 바꾸려 한다"],
    low_race:["늦었지만 마지막 코너에서 승부를 건다","현재 순위를 지키며 방어한다","다음 라운드를 생각해 무리하지 않는다","뒤 선수에게 밀리지 않으려 거칠게 막는다"],
    high_race:["마지막 코너에서 승부한다","직선까지 참고 한 번에 치고 나간다","상대를 압박해 실수를 유도한다","승부욕이 앞서 위험한 틈까지 찌른다"],
    high_prep:["목표를 구체적으로 적는다","라이벌과의 승부를 떠올린다","팀 목표를 먼저 확인한다","분노를 훈련 강도로 그대로 바꾼다"]
  },
  sportsmanship:{
    low_train:["팀원에게 먼저 사과한다","훈련 규칙을 다시 정한다","경쟁이니까 어쩔 수 없다고 넘긴다","더 강하게 부딪히며 기싸움을 한다"],
    low_race:["정당한 라인 변경을 기다린다","바깥으로 돌아 승부한다","경기 후 항의할 준비를 한다","심판 시야 밖에서 강하게 견제한다"],
    high_race:["안전하게 피하며 라인을 바꾼다","빈 공간으로 빠르게 지나간다","속도를 줄이고 사고를 피한다","승부를 우선해 좁은 길을 통과한다"],
    high_prep:["함께 훈련하며 정보를 나눈다","기본 예의만 지키고 거리를 둔다","팀원에게 배운 점을 공유한다","라이벌에게만 특별히 조언해 심리전을 건다"]
  },
  integrity:{
    low_train:["팀 훈련에 다시 성실히 참여한다","팀원에게 필요한 역할을 묻는다","개인 기록 훈련을 우선한다","팀 분위기보다 내 기록이 중요하다고 말한다"],
    low_race:["내 준비 과정을 먼저 돌아본다","코치와 원인을 정리한다","장비 문제를 차분히 점검한다","심판과 상대 탓을 공개적으로 말한다"],
    high_race:["경기 후 바로 사과한다","심판 판정을 기다리고 받아들인다","코치에게 상황을 먼저 설명한다","아무 일 없던 것처럼 넘긴다"],
    high_prep:["기본 훈련을 성실히 보여준다","후배에게 루틴을 알려준다","팀원들과 함께 훈련 분위기를 만든다","오늘은 내 훈련에만 집중하겠다며 선을 긋는다"]
  }
};

function skillChoiceKey(ev){
  if(ev.level==="low" && ev.context==="train") return "low_train";
  if(ev.level==="low" && ev.context==="race") return "low_race";
  if(ev.level==="high" && ev.context==="race") return "high_race";
  return "high_prep";
}
function skillChoicesForEvent(ev, compId=null, eventName=null){
  const key=skillChoiceKey(ev);
  const texts=(SKILL_CHOICE_TEXTS[ev.stat] && SKILL_CHOICE_TEXTS[ev.stat][key]) || [
    "흐름을 지키며 안정적으로 대응한다",
    "코치가 말한 기본과 작전을 떠올린다",
    "기회를 보고 과감하게 승부한다",
    "위험을 감수하고 거칠게 밀어붙인다"
  ];
  const styles=["safe","tactical","aggressive","risky"];
  const choices=texts.map((text,idx)=>({
    text,
    style:styles[idx] || "safe",
    skillEvent:ev,
    fn:function(){ resolveSkillEventChoice(this); },
    afterConfirm: compId && eventName ? ()=>continueCompetitionAfterSkillEvent(compId,eventName) : null
  }));
  return choices;
}

function makeSkillStatBranchEvents(){
  const next=upcomingCompetitionWithin(2);
  return allSkillEvents()
    .filter(ev=>ev.context!=="race")
    .filter(ev=>{
      if(ev.context==="prep") return !!next;
      if(ev.context==="train") return !getThisWeekCompetitions().length || chance(.55);
      return true;
    })
    .filter(ev=>skillEventMeetsCondition(ev) && skillEventCooldownOk(ev))
    .map(ev=>({...ev, choices:skillChoicesForEvent(ev)}));
}
function raceSkillEventPool(eventName){
  let pool=allSkillEvents().filter(ev=>ev.context==="race")
    .filter(ev=>skillEventMeetsCondition(ev) && skillEventCooldownOk(ev));
  if(isRelayRaceEventName(eventName)){
    const relayStats=["relay","tactics","mental","stability","sportsmanship","integrity","fighting","recovery"];
    pool=pool.filter(ev=>relayStats.includes(ev.stat));
  }else{
    pool=pool.filter(ev=>ev.stat!=="relay");
  }
  // 낮은 능력치 이벤트는 반복 가능, 높은 능력치 이벤트는 희귀하게 체감되도록 가중.
  const low=pool.filter(ev=>ev.level==="low");
  const high=pool.filter(ev=>ev.level==="high");
  if(low.length && high.length) return chance(.68) ? low : high;
  return pool;
}
function maybeOpenRaceSkillEvent(comp,eventName){
  if(window.skipNextSkillRaceEvent) return false;
  if(!game || !isIndividualRaceEventName(eventName) && !isRelayRaceEventName(eventName)) return false;
  const pool=raceSkillEventPool(eventName);
  if(!pool.length) return false;
  if(!chance(SKILL_EVENT_RACE_CHANCE)) return false;
  const ev=pick(pool);
  openEvent(ev.title, ev.body, skillChoicesForEvent(ev, comp.id, eventName), ev.meta || {});
  return true;
}
function continueCompetitionAfterSkillEvent(compId,eventName){
  window.skipNextSkillRaceEvent=true;
  try{ enterCompetition(compId,eventName); }
  finally{ window.skipNextSkillRaceEvent=false; }
}


// 13.1: 선수 상태 수치 기반 이벤트 30개.
// 컨디션·피로·부상위험·부상 단계/부위·스트레스·슬럼프·후유증을 기존 랜덤 이벤트 모달에 연결합니다.
const STATE_STATUS_EVENT_COOLDOWN_WEEKS = 12;
const STATE_STATUS_EVENT_RECOVERY_COOLDOWN_WEEKS = 9;
const STATE_STATUS_EVENT_SEVERE_COOLDOWN_WEEKS = 18;

function hasUpcomingCompetitionWithin(weeks=2){
  ensureGameDefaults();
  return getSeasonCompetitions().some(c => c.week >= game.week && c.week <= game.week + weeks && isCompetitionEligible(c).ok);
}
function hasRecentCompetitionWithin(weeks=2){
  ensureGameDefaults();
  const last=game.player.lastOfficialCompetitionWeek || 0;
  return last>0 && game.week - last >= 0 && game.week - last <= weeks;
}
function hasRestOrRecoverySelectedRecently(){
  try{
    return [1,2,3].some(i=>{
      const id=document.getElementById(`activity${i}`)?.value;
      return ["rest","rehab","mental_care","condition_control"].includes(id);
    });
  }catch(e){ return false; }
}
function hasAftereffectKeyword(keyword){
  const p=game.player;
  return (p.aftereffects||[]).some(e => String(e.label||e.name||e.stat||"").includes(keyword));
}
function addStateAftereffect(effect){
  const p=game.player;
  if(!p.aftereffects) p.aftereffects=[];
  const id=effect.id || `${effect.label||effect.stat}_${effect.stat}_${effect.penalty}`;
  if(p.aftereffects.some(e=> (e.id||`${e.label||e.stat}_${e.stat}_${e.penalty}`)===id)) return;
  p.aftereffects.push({...effect, id});
}
function applyStateEventSpecial(special={}){
  ensureGameDefaults();
  const p=game.player;
  if(special.injury){
    const inj=special.injury;
    p.injury={name:inj.name, weeks:inj.weeks||2, severe:!!inj.severe, part:inj.part||"", level:inj.level||""};
    game.scene="clinic";
    if(inj.risk) p.injuryRisk=clamp((p.injuryRisk||0)+inj.risk,0,100);
  }
  if(special.reduceInjuryWeeks && p.injury){
    p.injury.weeks=Math.max(0,(p.injury.weeks||1)-special.reduceInjuryWeeks);
    if(p.injury.weeks===0) recoverInjury(true);
  }
  if(special.recoverInjury && p.injury){
    recoverInjury(true);
  }
  if(special.aftereffects){
    special.aftereffects.forEach(addStateAftereffect);
  }
  if(special.removeAftereffectKeyword){
    p.aftereffects=(p.aftereffects||[]).filter(e=>!String(e.label||e.name||e.stat||"").includes(special.removeAftereffectKeyword));
  }
  if(special.slumpStart){
    if(!p.slump){
      p.slump={reason:special.slumpStart.reason||"상태 관리 실패", weeks:special.slumpStart.weeks||6, severity:special.slumpStart.severity||2};
      addLog("슬럼프 조짐", `${p.slump.reason}로 슬럼프가 시작되었습니다.`);
    }else{
      p.slump.weeks=Math.min(12,(p.slump.weeks||4)+2);
      p.slump.severity=Math.min(4,(p.slump.severity||1)+1);
    }
  }
  if(special.slumpReduce && p.slump){
    p.slump.weeks=Math.max(0,(p.slump.weeks||0)-special.slumpReduce);
    p.slump.severity=Math.max(1,(p.slump.severity||1)-1);
    if(p.slump.weeks===0){ p.slump=null; addLog("슬럼프 완화","선수가 슬럼프에서 조금씩 빠져나오기 시작했습니다."); }
  }
  if(special.slumpClear && p.slump){
    p.slump=null;
    addLog("슬럼프 회복","상태 관리와 작은 성공 경험을 통해 슬럼프에서 벗어났습니다.");
  }
  if(special.statProgress){
    Object.entries(special.statProgress).forEach(([k,v])=>{ if(typeof addStatProgress==="function") addStatProgress(k,v); });
  }
  if(special.flag) addStoryFlag(special.flag);
  if(special.scene) game.scene=special.scene;
}

function stateChoice(text, status, resultNarrative, extras={}){
  return {
    text,
    status:status||{},
    stats:extras.stats||null,
    relationships:extras.relationships||null,
    noVariance:true,
    narrativeOnly:true,
    resultNarrative,
    log:resultNarrative,
    logTitle:extras.logTitle || "선수 상태",
    dialogueSpeaker:extras.speaker || "코치",
    dialogue:extras.dialogue || resultNarrative,
    special:extras.special || null,
    fn:function(){ if(this.special) applyStateEventSpecial(this.special); }
  };
}
function stateEventKey(e){ return e.id || e.title; }
function stateEventCooldownOk(e){
  ensureGameDefaults();
  if(!game.stateEventHistory) game.stateEventHistory={};
  const last=game.stateEventHistory[stateEventKey(e)] ?? -99;
  let cd=STATE_STATUS_EVENT_COOLDOWN_WEEKS;
  if(e.severe) cd=STATE_STATUS_EVENT_SEVERE_COOLDOWN_WEEKS;
  if(e.recovery) cd=STATE_STATUS_EVENT_RECOVERY_COOLDOWN_WEEKS;
  return game.week - last >= cd;
}
function markStateEvent(e){
  ensureGameDefaults();
  if(!game.stateEventHistory) game.stateEventHistory={};
  game.stateEventHistory[stateEventKey(e)]=game.week;
}
function wrapStateEvent(e){
  return {
    ...e,
    choices:e.choices.map(c=>({
      ...c,
      fn:function(){
        if(c.fn) c.fn.call(this);
        if(c.special) applyStateEventSpecial(c.special);
        markStateEvent(e);
      }
    }))
  };
}

const STATE_STATUS_EVENTS = [
  {
    id:"state_condition_good_morning",
    title:"몸이 가볍게 뜨는 아침",
    body:"아침부터 몸이 이상하게 가볍다. 스케이트를 신기 전부터 호흡이 편하고, 링크장 공기마저 선명하게 느껴진다.",
    recovery:true,
    meta:{speaker:"코치",role:"coach",art:"training",imageKey:"훈련링크",icon:"🌤️",tag:"좋은 컨디션",quote:"좋은 날일수록 욕심을 조절해야 오래 간다.",mood:"happy"},
    when:()=>game.player.condition>=82 && game.player.fatigue<=28 && game.player.injuryRisk<=28 && chance(.42),
    choices:[
      stateChoice("오늘 감각을 짧게 확인하고 마무리한다",{condition:4,stress:-5},"몸의 좋은 감각을 무리 없이 이어 갔다.",{stats:{recovery:.7}}),
      stateChoice("좋은 감각을 이용해 기술 훈련을 집중한다",{condition:5,fatigue:5,stress:-3},"좋은 컨디션을 훈련 감각으로 연결했다.",{stats:{cornering:.7,passing:.5}}),
      stateChoice("대회처럼 실전 페이스를 올려 본다",{condition:3,fatigue:7,injuryRisk:4},"실전 감각은 살아났지만 몸에는 약간의 피로가 남았다.",{stats:{tactics:.6,fighting:.5}}),
      stateChoice("몸이 좋으니 강훈련까지 밀어붙인다",{fatigue:9,injuryRisk:7,stress:3},"몸은 가벼웠지만, 욕심을 낸 만큼 피로가 남았다.",{stats:{fighting:.7}})
    ]
  },
  {
    id:"state_condition_heavy_body",
    title:"이유 없이 무거운 몸",
    body:"특별히 아픈 곳은 없지만 몸이 평소보다 무겁다. 코치는 오늘은 기록보다 몸 상태를 먼저 보자고 말한다.",
    meta:{speaker:"코치",role:"coach",art:"training",imageKey:"라커룸",icon:"🌫️",tag:"컨디션 저하",quote:"몸이 말하는 날에는 들어야 해.",mood:"serious"},
    when:()=>game.player.condition<=44 || game.player.fatigue>=58,
    choices:[
      stateChoice("훈련 강도를 낮추고 감각만 확인한다",{condition:6,fatigue:-7,stress:-3},"몸 상태를 인정하고 훈련을 조절했다."),
      stateChoice("몸을 충분히 풀고 천천히 시작한다",{condition:5,injuryRisk:-6,fatigue:-3},"몸을 충분히 풀자 무거움이 조금 가셨다.",{stats:{stability:.5}}),
      stateChoice("원래 계획대로 훈련한다",{condition:-4,fatigue:6,stress:3},"계획은 지켰지만 무거운 몸을 억지로 끌고 간 부담이 남았다."),
      stateChoice("컨디션 탓을 하지 않겠다며 강도를 올린다",{condition:-7,fatigue:9,injuryRisk:8,stress:5},"무거운 몸을 밀어붙인 선택이 몸에 뚜렷한 부담으로 남았다.",{special:{flag:"무리한 컨디션 강행"}})
    ]
  },
  {
    id:"state_condition_pre_comp_uncomfortable",
    title:"대회 전날의 미묘한 불편함",
    body:"대회가 가까워졌는데 몸이 완전히 올라오지 않는다. 아픈 것은 아니지만, 평소의 날카로운 느낌이 부족하다.",
    meta:{speaker:"코치",role:"coach",art:"prep",imageKey:"국선",icon:"🧭",tag:"대회 직전",quote:"오늘 무리해서 내일을 잃지 말자.",mood:"serious"},
    when:()=>hasUpcomingCompetitionWithin(2) && game.player.condition<=62,
    choices:[
      stateChoice("훈련량을 줄이고 컨디션 회복에 집중한다",{condition:7,fatigue:-8,stress:-4},"대회를 앞두고 몸 상태를 안정적으로 끌어올렸다."),
      stateChoice("스타트와 코너 감각만 짧게 확인한다",{condition:4,injuryRisk:-5,fatigue:3},"필요한 감각만 확인하며 몸의 부담을 줄였다.",{stats:{reaction:.4,cornering:.4}}),
      stateChoice("심리 루틴으로 긴장을 먼저 낮춘다",{stress:-8,condition:4},"몸보다 먼저 흔들린 마음을 정리했다.",{stats:{mental:.5}}),
      stateChoice("부족한 감각을 채우기 위해 추가 훈련을 한다",{fatigue:8,injuryRisk:7,stress:5},"부족한 감각을 채우려 했지만 몸에는 부담이 남았다.")
    ]
  },
  {
    id:"state_condition_focus_drop",
    title:"갑자기 떨어진 집중력",
    body:"훈련 도중 집중력이 갑자기 끊긴다. 코치의 말은 들리지만 몸이 바로 반응하지 않는다.",
    meta:{speaker:"코치",role:"coach",art:"training",imageKey:"훈련링크",icon:"🌀",tag:"집중 저하",quote:"멈춰야 다시 들린다.",mood:"serious"},
    when:()=>game.player.condition<=55 && game.player.stress>=55,
    choices:[
      stateChoice("훈련을 잠시 멈추고 호흡을 정리한다",{stress:-7,condition:5},"흔들린 집중을 인정하자 오히려 몸이 조금 풀렸다.",{stats:{mental:.4}}),
      stateChoice("코치에게 집중이 흔들린다고 말한다",{stress:-6,condition:4},"솔직히 말하자 훈련 방향이 조금 단순해졌다.",{relationships:{coach:2}}),
      stateChoice("쉬운 동작부터 다시 시작한다",{injuryRisk:-6,condition:4},"기본 동작으로 돌아가자 몸의 반응이 조금씩 돌아왔다.",{stats:{stability:.5}}),
      stateChoice("아무렇지 않은 척 계속 진행한다",{fatigue:7,injuryRisk:7,stress:6},"괜찮은 척 넘겼지만 훈련 내내 몸이 무거웠다.")
    ]
  },
  {
    id:"state_condition_rebound_signal",
    title:"컨디션 반등의 작은 신호",
    body:"며칠 전까지 무겁던 몸이 조금씩 돌아오는 느낌이다. 완벽하지는 않지만, 다시 움직일 수 있다는 감각이 생긴다.",
    recovery:true,
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"라커룸",icon:"🌱",tag:"회복 반등",quote:"돌아오는 몸은 서두르면 다시 도망가.",mood:"soft"},
    when:()=>game.player.condition>=45 && game.player.condition<=70 && hasRestOrRecoverySelectedRecently(),
    choices:[
      stateChoice("회복 루틴을 그대로 유지한다",{condition:7,fatigue:-8,stress:-4},"몸이 천천히 돌아오는 흐름을 잘 지켰다."),
      stateChoice("가벼운 빙상 감각 훈련을 한다",{condition:6,fatigue:3,stress:-3},"몸이 돌아오는 감각을 무리 없이 확인했다.",{stats:{recovery:.4}}),
      stateChoice("코치와 다음 훈련 강도를 조정한다",{condition:5,injuryRisk:-7},"서두르지 않는 복귀 흐름을 코치와 함께 잡았다.",{relationships:{coach:2}}),
      stateChoice("이제 괜찮다며 바로 강훈련으로 돌아간다",{condition:3,fatigue:8,injuryRisk:8,stress:4},"반등의 신호가 있었지만, 서두른 만큼 부담도 따라왔다.")
    ]
  },

  {
    id:"state_fatigue_previous_day",
    title:"다리에 남은 전날의 훈련",
    body:"스케이트를 신는 순간 다리에 어제의 훈련이 남아 있다는 걸 느낀다. 몸이 늦게 풀린다.",
    meta:{speaker:"트레이너",role:"coach",art:"training",imageKey:"훈련링크",icon:"🦵",tag:"단기 피로",quote:"늦게 풀리는 몸은 더 천천히 깨워야 한다.",mood:"serious"},
    when:()=>game.player.fatigue>=48,
    choices:[
      stateChoice("워밍업을 길게 가져간다",{condition:4,injuryRisk:-6,fatigue:-3},"몸을 충분히 풀자 무거움이 조금 가셨다."),
      stateChoice("훈련 강도를 한 단계 낮춘다",{fatigue:-8,condition:4},"훈련 자극은 줄었지만 몸이 숨을 돌렸다."),
      stateChoice("계획대로 진행하되 휴식을 자주 둔다",{fatigue:-5,condition:3},"훈련 흐름은 유지하면서 피로가 더 쌓이는 것을 막았다."),
      stateChoice("피로를 무시하고 바로 고강도 훈련을 한다",{fatigue:9,injuryRisk:8,stress:4},"피로를 무시한 훈련은 몸에 부담을 남겼다.")
    ]
  },
  {
    id:"state_fatigue_cumulative_warning",
    title:"누적되는 피로의 경고",
    body:"최근 훈련을 소화하고는 있지만, 회복이 따라오지 않는다. 트레이너는 이 상태가 이어지면 몸이 먼저 무너질 수 있다고 경고한다.",
    severe:true,
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"라커룸",icon:"⚠️",tag:"중기 피로",quote:"버티는 것과 망가지는 건 한 끗 차이야.",mood:"serious"},
    when:()=>game.player.fatigue>=72,
    choices:[
      stateChoice("이번 주는 회복 중심으로 바꾼다",{fatigue:-9,condition:7,injuryRisk:-7,stress:-5},"훈련을 줄였지만, 몸은 다시 숨을 쉴 시간을 얻었다."),
      stateChoice("훈련량을 줄이고 기술 훈련만 한다",{fatigue:-7,condition:4,injuryRisk:-5},"감각을 잃지 않으면서 누적된 피로를 낮췄다.",{stats:{tactics:.4}}),
      stateChoice("대회가 가까우니 그대로 밀고 간다",{fatigue:8,injuryRisk:8,condition:-5,stress:5},"대회 준비는 이어졌지만 피로의 무게가 더 깊어졌다."),
      stateChoice("피로를 숨기고 추가 훈련을 한다",{fatigue:10,injuryRisk:10,stress:7,condition:-7},"누적된 피로를 외면하자 몸이 더 무겁게 가라앉았다.",{special:{slumpStart:{reason:"누적 피로와 무리한 훈련",weeks:5,severity:2}}})
    ]
  },
  {
    id:"state_fatigue_rest_day_temptation",
    title:"회복일의 유혹",
    body:"오늘은 쉬기로 한 날이다. 그런데 링크장에서는 다른 선수들이 훈련하는 소리가 들린다. 마음이 흔들린다.",
    recovery:true,
    meta:{speaker:"선수",role:"self",art:"rest",imageKey:"기본 배경",icon:"🛌",tag:"회복일",quote:"쉬는 날에도 마음은 링크장에 남아 있다.",mood:"soft"},
    when:()=>hasRestOrRecoverySelectedRecently() && game.player.fatigue>=55,
    choices:[
      stateChoice("계획대로 완전히 쉰다",{fatigue:-9,condition:7,stress:-5},"쉬는 것도 훈련이라는 말을 몸으로 받아들였다."),
      stateChoice("스트레칭과 가벼운 보강만 한다",{fatigue:-7,injuryRisk:-6,condition:4},"몸은 쉬면서도 회복 리듬은 잃지 않았다.",{stats:{recovery:.4}}),
      stateChoice("짧게 감각만 확인하러 나간다",{fatigue:4,condition:3,stress:-3},"불안은 줄었지만 쉼의 효과는 조금 흐려졌다."),
      stateChoice("쉬면 뒤처질 것 같아 훈련에 합류한다",{fatigue:9,injuryRisk:8,stress:7},"불안 때문에 쉼을 포기하자 피로가 완전히 빠지지 않았다.")
    ]
  },
  {
    id:"state_fatigue_after_comp",
    title:"대회 뒤에 몰려온 피로",
    body:"대회가 끝나자 긴장이 풀리며 피로가 한꺼번에 몰려온다. 경기 중에는 몰랐던 무거움이 몸 곳곳에 남아 있다.",
    meta:{speaker:"코치",role:"coach",art:"race",imageKey:"포디움",icon:"🏁",tag:"대회 직후",quote:"대회는 끝난 뒤 관리까지가 대회다.",mood:"serious"},
    when:()=>hasRecentCompetitionWithin(1) && game.player.fatigue>=42,
    choices:[
      stateChoice("다음 주 회복 일정을 먼저 잡는다",{fatigue:-9,condition:6,stress:-4},"대회 뒤의 피로를 인정하고 다음 흐름을 준비했다."),
      stateChoice("대회 영상을 보며 가볍게 정리한다",{stress:-6,fatigue:-3},"몸은 쉬고, 머리는 레이스를 차분히 정리했다.",{stats:{tactics:.4}}),
      stateChoice("아쉬운 종목을 바로 다시 훈련한다",{fatigue:8,injuryRisk:6,stress:4},"아쉬움을 바로 잡으려 했지만 몸에는 피로가 남았다.",{stats:{fighting:.4}}),
      stateChoice("결과가 마음에 들지 않아 강훈련을 예약한다",{fatigue:10,injuryRisk:9,stress:8,condition:-5},"아쉬움이 몸보다 앞서면서 피로가 더 깊게 남았다.",{special:{slumpStart:{reason:"대회 뒤 피로와 결과 집착",weeks:5,severity:2}}})
    ]
  },
  {
    id:"state_fatigue_efficiency_loss",
    title:"피로가 훈련 효율을 잡아먹는 날",
    body:"평소라면 어렵지 않게 하던 동작도 오늘은 계속 어긋난다. 코치는 더 하는 것보다 멈추는 것이 훈련일 수 있다고 한다.",
    severe:true,
    meta:{speaker:"코치",role:"coach",art:"training",imageKey:"훈련링크",icon:"🔻",tag:"장기 피로",quote:"계속 실패하는 반복은 훈련이 아니라 소모야.",mood:"serious"},
    when:()=>game.player.fatigue>=82 && game.player.condition<=45,
    choices:[
      stateChoice("훈련을 조기 종료한다",{fatigue:-8,injuryRisk:-8,stress:-4},"멈춘 덕분에 더 큰 흔들림을 막았다."),
      stateChoice("회복 훈련으로 전환한다",{condition:6,fatigue:-7,injuryRisk:-6},"회복 훈련으로 바꾸자 몸의 긴장이 조금 풀렸다.",{stats:{recovery:.4}}),
      stateChoice("실패한 동작만 짧게 정리한다",{fatigue:4,stress:3},"끝까지 붙잡지는 않았지만, 문제 장면은 확인했다."),
      stateChoice("될 때까지 반복한다",{fatigue:10,stress:9,injuryRisk:10,condition:-7},"반복할수록 몸은 더 무거워지고 집중도 흐려졌다.",{special:{slumpStart:{reason:"장기 피로와 훈련 효율 저하",weeks:6,severity:3}}})
    ]
  },

  {
    id:"state_injury_risk_ankle_twinge",
    title:"발목에 스친 작은 통증",
    body:"코너를 빠져나오는 순간 발목에 작은 찌릿함이 느껴졌다. 금방 사라졌지만 신경이 쓰인다.",
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"라커룸",icon:"🦶",tag:"발목 조짐",quote:"사라진 통증도 기록해 둬야 한다.",mood:"serious"},
    when:()=>game.player.injuryRisk>=42,
    choices:[
      stateChoice("바로 코치와 트레이너에게 알린다",{injuryRisk:-8,stress:-4},"작은 통증을 그냥 넘기지 않아 더 큰 문제를 막았다.",{relationships:{coach:2}}),
      stateChoice("코너 훈련을 중단하고 상태를 확인한다",{injuryRisk:-7,fatigue:-4,condition:3},"발목을 확인하며 코너 훈련의 위험을 낮췄다."),
      stateChoice("훈련 강도만 조금 낮춘다",{injuryRisk:-4,fatigue:-3},"감각은 유지했지만 통증의 원인은 조금 남겨 두었다."),
      stateChoice("별일 아니라고 생각하고 계속 탄다",{injuryRisk:9,fatigue:6},"사라진 줄 알았던 통증이 훈련 끝까지 신경 쓰였다.",{special:{injury:{name:"경미한 발목 통증",weeks:2,severe:false,part:"발목",level:"경미",risk:3}}})
    ]
  },
  {
    id:"state_injury_risk_knee_delay",
    title:"무릎이 늦게 따라오는 느낌",
    body:"가속할 때 무릎이 몸보다 늦게 따라오는 느낌이 든다. 통증이라고 하기엔 애매하지만 평소와 다르다.",
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"라커룸",icon:"🦵",tag:"무릎 조짐",quote:"애매한 신호가 제일 위험할 때가 있다.",mood:"serious"},
    when:()=>game.player.fatigue>=55 && game.player.injuryRisk>=38,
    choices:[
      stateChoice("고강도 훈련을 멈춘다",{injuryRisk:-8,fatigue:-7,condition:3},"이상 신호를 빠르게 잡아 몸의 부담을 줄였다."),
      stateChoice("보강 운동과 스트레칭으로 전환한다",{injuryRisk:-7,fatigue:-4},"무릎 주변의 긴장을 낮추며 불안을 줄였다.",{stats:{stability:.4}}),
      stateChoice("한 세트만 더 하고 확인한다",{fatigue:6,injuryRisk:5,stress:3},"한 번 더 해 본 선택은 감각을 확인했지만 부담도 남겼다."),
      stateChoice("참고 끝까지 훈련한다",{fatigue:9,injuryRisk:10,condition:-5},"애매한 느낌을 무시하자 무릎이 더 무겁게 남았다.",{special:{injury:{name:"중간 무릎 부상",weeks:4,severe:false,part:"무릎",level:"중간",risk:6}}})
    ]
  },
  {
    id:"state_injury_risk_hamstring_pull",
    title:"허벅지 뒤쪽의 당김",
    body:"전력 질주 뒤 허벅지 뒤쪽이 당긴다. 근육이 아직 버티고 있지만, 더 밀어붙이면 위험할 수 있다.",
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"훈련링크",icon:"⚡",tag:"근육 이상",quote:"당김은 몸이 보내는 정지 신호일 수 있다.",mood:"serious"},
    when:()=>game.player.fatigue>=58 || game.player.injuryRisk>=48,
    choices:[
      stateChoice("즉시 훈련을 중단하고 회복한다",{injuryRisk:-8,fatigue:-8,condition:3},"당김이 커지기 전에 멈춰 몸을 지켰다."),
      stateChoice("속도 훈련을 기술 훈련으로 바꾼다",{injuryRisk:-6,fatigue:-4},"속도 부담을 줄이고 감각만 살렸다.",{stats:{tactics:.4}}),
      stateChoice("강도를 낮춰 한 번만 더 한다",{injuryRisk:5,fatigue:5},"조심했지만 허벅지의 긴장은 완전히 사라지지 않았다."),
      stateChoice("기록이 아쉬워 전력 질주를 반복한다",{injuryRisk:10,fatigue:9,condition:-5},"아쉬움을 이기지 못한 선택이 다리에 부담으로 남았다.",{special:{injury:{name:"허벅지 근육 이상",weeks:4,severe:false,part:"허벅지",level:"중간",risk:6}}})
    ]
  },
  {
    id:"state_injury_risk_shoulder_contact",
    title:"접촉 뒤에 남은 어깨의 묵직함",
    body:"레이스 중 스친 어깨가 뒤늦게 묵직해졌다. 계주 터치나 몸싸움 상황에서 신경이 쓰일 수 있다.",
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"라커룸",icon:"💥",tag:"접촉 후 통증",quote:"경기 중에는 몰랐던 통증이 뒤늦게 올라올 수 있다.",mood:"serious"},
    when:()=>hasRecentCompetitionWithin(2) && game.player.injuryRisk>=35,
    choices:[
      stateChoice("트레이너에게 바로 확인받는다",{injuryRisk:-8,stress:-4},"늦게 올라온 통증을 확인해 불안을 줄였다."),
      stateChoice("상체 부담이 적은 훈련으로 바꾼다",{injuryRisk:-6,fatigue:-5},"상체 부담을 줄이자 어깨의 묵직함이 조금 가셨다."),
      stateChoice("계주 훈련만 짧게 확인한다",{injuryRisk:5,fatigue:4},"계주 감각은 확인했지만 어깨가 계속 신경 쓰였다.",{stats:{relay:.3}}),
      stateChoice("통증을 숨기고 정상 훈련한다",{injuryRisk:9,stress:6},"괜찮은 척했지만 어깨의 묵직함은 사라지지 않았다.",{relationships:{teammates:-2},special:{aftereffects:[{id:"ae_shoulder_contact",label:"어깨 충돌 후유증",stat:"relay",penalty:.06}]}})
    ]
  },
  {
    id:"state_injury_risk_near_fall",
    title:"넘어지지는 않았지만",
    body:"넘어지지는 않았지만 중심이 크게 흔들렸다. 한 번 더 같은 상황이 오면 버티기 어려울 수 있다.",
    meta:{speaker:"코치",role:"coach",art:"training",imageKey:"훈련링크",icon:"🧊",tag:"낙상 위험",quote:"안 넘어졌다는 건 괜찮다는 뜻이 아니라 경고일 때가 있다.",mood:"serious"},
    when:()=>game.player.injuryRisk>=45 || (game.player.stats.stability||50)<58,
    choices:[
      stateChoice("안정성 훈련으로 전환한다",{injuryRisk:-7,condition:3},"넘어지지 않은 순간을 경고로 받아들였다.",{stats:{stability:.5}}),
      stateChoice("속도를 낮추고 라인부터 점검한다",{injuryRisk:-6,fatigue:-3},"속도를 낮추자 흔들림의 원인이 조금 보였다.",{stats:{cornering:.4}}),
      stateChoice("오늘은 훈련을 짧게 마무리한다",{fatigue:-7,condition:5,injuryRisk:-5},"짧게 마무리한 덕분에 몸의 긴장이 내려갔다."),
      stateChoice("흔들린 게 자존심 상해 더 빠르게 돈다",{injuryRisk:10,fatigue:7,stress:5},"흔들림을 무시하자 몸이 더 날카롭게 긴장했다.",{special:{injury:{name:"경미한 낙상성 타박",weeks:2,severe:false,part:"전신",level:"경미",risk:4}}})
    ]
  },
  {
    id:"state_injury_risk_force_start",
    title:"강행 출전의 갈림길",
    body:"대회가 코앞인데 몸 상태가 완벽하지 않다. 출전은 가능해 보이지만, 강행하면 후폭풍이 남을 수 있다.",
    severe:true,
    meta:{speaker:"코치",role:"coach",art:"prep",imageKey:"국선",icon:"🚨",tag:"강행 출전",quote:"오늘의 한 경기보다 선수 생활이 길다.",mood:"serious"},
    when:()=>hasUpcomingCompetitionWithin(1) && game.player.injuryRisk>=66,
    choices:[
      stateChoice("코치와 출전 여부를 다시 논의한다",{injuryRisk:-8,stress:-5},"출전보다 선수 생활 전체를 먼저 놓고 판단했다.",{relationships:{coach:2}}),
      stateChoice("종목 수를 줄인다",{fatigue:-6,injuryRisk:-7,condition:4},"기회는 줄었지만 몸을 지키는 현실적인 선택을 했다."),
      stateChoice("출전하되 무리한 승부는 피한다",{injuryRisk:5,fatigue:5,stress:3},"대회에는 나서지만 몸의 경고를 완전히 잊지는 않았다."),
      stateChoice("상태를 숨기고 전 종목에 나간다",{injuryRisk:12,fatigue:10,stress:7,condition:-7},"감춘 몸 상태는 경기 뒤 더 큰 부담으로 돌아올 수 있다.",{relationships:{coach:-3},special:{aftereffects:[{id:"ae_hidden_pain",label:"통증 은폐 후유증",stat:"recovery",penalty:.07}],flag:"통증 은폐 강행"}})
    ]
  },

  {
    id:"state_injury_mild_ankle",
    title:"경미한 발목 통증",
    body:"발목에 경미한 통증이 남았다. 당장 훈련이 불가능한 정도는 아니지만 코너에서 신경이 쓰인다.",
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"라커룸",icon:"🩹",tag:"경미한 부상",quote:"작을 때 잡으면 작게 끝난다.",mood:"serious"},
    when:()=>game.player.injury?.name?.includes("발목") || hasAftereffectKeyword("발목"),
    choices:[
      stateChoice("며칠간 코너 강도를 낮춘다",{injuryRisk:-8,fatigue:-5,condition:4},"발목의 작은 통증을 관리하며 흐름을 지켰다.",{special:{reduceInjuryWeeks:1}}),
      stateChoice("보강과 치료를 병행한다",{injuryRisk:-9,condition:5},"발목 주변을 보강하며 회복의 방향을 잡았다.",{stats:{recovery:.5},special:{reduceInjuryWeeks:1}}),
      stateChoice("통증이 없는 범위에서 감각만 유지한다",{condition:3,injuryRisk:-4},"감각은 유지했지만 회복은 천천히 진행됐다."),
      stateChoice("중요한 시기라며 그대로 훈련한다",{injuryRisk:10,fatigue:8,condition:-5},"가볍게 본 통증이 코너마다 다시 존재감을 드러냈다.",{special:{injury:{name:"중간 발목 부상",weeks:4,severe:false,part:"발목",level:"중간",risk:7}}})
    ]
  },
  {
    id:"state_injury_mid_knee",
    title:"중간 무릎 부상",
    body:"무릎 상태가 좋지 않다. 단순 피로가 아니라 일정 기간 훈련을 조절해야 하는 부상이다.",
    severe:true,
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"라커룸",icon:"🩼",tag:"중간 부상",quote:"지금 줄이는 훈련이 나중의 훈련을 지켜 준다.",mood:"serious"},
    when:()=>game.player.injury?.name?.includes("무릎"),
    choices:[
      stateChoice("신체 훈련을 제한하고 치료에 집중한다",{condition:6,fatigue:-8,injuryRisk:-9,stress:-5},"훈련을 줄인 만큼 무릎이 회복할 시간을 얻었다.",{special:{reduceInjuryWeeks:2}}),
      stateChoice("상체와 전술 훈련 위주로 전환한다",{fatigue:-5,injuryRisk:-7},"몸은 쉬고 머리는 레이스를 준비했다.",{stats:{tactics:.6},special:{reduceInjuryWeeks:1}}),
      stateChoice("대회 일정에 맞춰 부분 훈련을 한다",{fatigue:5,injuryRisk:5,condition:-4},"대회 감각은 유지했지만 무릎 회복은 늦어졌다."),
      stateChoice("통증을 숨기고 원래 훈련을 계속한다",{injuryRisk:12,fatigue:10,stress:8,condition:-8},"숨긴 통증은 쉽게 사라지지 않고 몸 안에 남았다.",{relationships:{coach:-3},special:{aftereffects:[{id:"ae_knee_hidden",label:"무릎 후유증",stat:"cornering",penalty:.08},{id:"ae_knee_stamina",label:"무릎 후유증",stat:"stamina",penalty:.06}],flag:"무릎 부상 은폐"}})
    ]
  },
  {
    id:"state_injury_thigh_muscle",
    title:"허벅지 근육 이상",
    body:"허벅지 근육에 이상이 생겼다. 전력 질주와 후반 스퍼트에 부담이 갈 수 있다.",
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"라커룸",icon:"🧯",tag:"근육 이상",quote:"속도를 내려놓아야 다시 속도를 낼 수 있어.",mood:"serious"},
    when:()=>game.player.injury?.name?.includes("허벅지"),
    choices:[
      stateChoice("속도 훈련을 중단하고 회복한다",{fatigue:-8,injuryRisk:-9,condition:5},"속도를 내려놓자 다리가 조금씩 긴장을 풀었다.",{special:{reduceInjuryWeeks:2}}),
      stateChoice("지구력보다 회복 루틴을 우선한다",{condition:6,fatigue:-7,injuryRisk:-7},"회복 루틴을 먼저 잡으며 몸의 반응을 기다렸다.",{stats:{recovery:.5},special:{reduceInjuryWeeks:1}}),
      stateChoice("짧은 기술 훈련만 유지한다",{fatigue:4,injuryRisk:4},"감각은 유지했지만 허벅지의 긴장은 완전히 풀리지 않았다."),
      stateChoice("기록 감각을 잃기 싫어 스프린트를 계속한다",{injuryRisk:12,fatigue:10,condition:-7},"기록을 붙잡으려는 마음이 근육에 더 큰 부담을 남겼다.",{special:{aftereffects:[{id:"ae_thigh_speed",label:"허벅지 후유증",stat:"topSpeed",penalty:.08},{id:"ae_thigh_acc",label:"허벅지 후유증",stat:"acceleration",penalty:.06}]}})
    ]
  },
  {
    id:"state_injury_severe_back",
    title:"심각한 허리 부상",
    body:"허리 부상이 심각하다. 지금은 경기력보다 회복과 선수 생활의 지속이 더 중요하다.",
    severe:true,
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"라커룸",icon:"🚑",tag:"심각한 부상",quote:"멈추는 선택이 가장 어려운 훈련일 때가 있다.",mood:"serious"},
    when:()=>game.player.injury?.name?.includes("허리") || (game.player.injury?.severe && game.player.injuryRisk>=60),
    choices:[
      stateChoice("장기 재활에 들어간다",{condition:7,fatigue:-9,injuryRisk:-10,stress:-6},"멈추는 선택은 어렵지만, 선수 생활을 지키는 선택이었다.",{special:{reduceInjuryWeeks:3}}),
      stateChoice("시즌 목표를 낮추고 복귀 계획을 세운다",{stress:-8,condition:5,injuryRisk:-7},"목표를 낮춘 덕분에 회복 계획이 현실적으로 바뀌었다.",{relationships:{coach:2},special:{reduceInjuryWeeks:1}}),
      stateChoice("코치와 역할을 바꿔 전술 공부를 한다",{stress:-5,fatigue:-5},"빙판 밖에서 레이스를 다시 보기 시작했다.",{stats:{tactics:.8,mental:.4}}),
      stateChoice("중요한 대회만 몰래 준비한다",{injuryRisk:12,fatigue:9,stress:8,condition:-8},"무리한 복귀 욕심은 허리에 오래 남을 부담을 만들었다.",{relationships:{coach:-4},special:{aftereffects:[{id:"ae_back_stability",label:"허리 후유증",stat:"stability",penalty:.09},{id:"ae_back_recovery",label:"허리 후유증",stat:"recovery",penalty:.08}],flag:"허리 부상 강행"}})
    ]
  },
  {
    id:"state_injury_shoulder_collision",
    title:"어깨 충돌 부상",
    body:"충돌 뒤 어깨가 무겁다. 개인전에는 큰 영향이 없을 수도 있지만, 계주 터치와 몸싸움에서는 부담이 된다.",
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"라커룸",icon:"🛡️",tag:"어깨 부상",quote:"팀 경기는 몸 상태를 숨길수록 팀 전체가 위험해진다.",mood:"serious"},
    when:()=>game.player.injury?.name?.includes("어깨") || hasAftereffectKeyword("어깨"),
    choices:[
      stateChoice("계주 훈련을 잠시 줄인다",{injuryRisk:-8,fatigue:-6,condition:4},"계주 욕심을 잠시 내려놓고 어깨를 회복시켰다.",{special:{reduceInjuryWeeks:1}}),
      stateChoice("상체 치료와 보강을 병행한다",{injuryRisk:-9,condition:5},"어깨의 묵직함이 조금씩 줄어들었다.",{stats:{stability:.4},special:{reduceInjuryWeeks:1,removeAftereffectKeyword:"어깨"}}),
      stateChoice("개인전 위주로 훈련을 조정한다",{condition:3,injuryRisk:-5},"개인전 감각은 지키면서 어깨 부담을 낮췄다."),
      stateChoice("팀에 말하지 않고 계주 훈련을 계속한다",{injuryRisk:11,fatigue:8,stress:6},"말하지 않은 통증은 팀 훈련 내내 마음에 걸렸다.",{relationships:{teammates:-3},special:{aftereffects:[{id:"ae_shoulder_relay",label:"어깨 충돌 후유증",stat:"relay",penalty:.08}],flag:"어깨 통증 은폐"}})
    ]
  },

  {
    id:"state_stress_failure_scene",
    title:"계속 떠오르는 실패 장면",
    body:"경기가 끝났는데도 마지막 실수 장면이 계속 머릿속에 떠오른다. 몸은 쉬고 있지만 마음은 아직 경기장에 남아 있다.",
    meta:{speaker:"선수",role:"self",art:"rest",imageKey:"라커룸",icon:"🎞️",tag:"스트레스",quote:"끝난 장면이 마음속에서는 아직 끝나지 않았다.",mood:"sad"},
    when:()=>hasRecentCompetitionWithin(2) && game.player.stress>=55,
    choices:[
      stateChoice("코치와 장면을 차분히 복기한다",{stress:-8,condition:3},"실패를 다시 보되, 무너지지 않는 방식으로 정리했다.",{stats:{tactics:.5},relationships:{coach:1}}),
      stateChoice("오늘은 영상을 보지 않고 쉰다",{stress:-9,fatigue:-7,condition:4},"마음과 몸이 경기장에서 빠져나올 시간을 얻었다."),
      stateChoice("가족이나 팀원과 가볍게 이야기한다",{stress:-7,condition:4},"경기 이야기를 내려놓자 마음이 조금 가벼워졌다.",{relationships:{family:2,teammates:1}}),
      stateChoice("실수를 잊기 위해 바로 훈련한다",{fatigue:8,stress:7,injuryRisk:5},"잊으려 한 실수는 훈련 속에서 더 선명해졌다.",{special:{slumpStart:{reason:"실패 장면 반복과 무리한 보상 훈련",weeks:5,severity:2}}})
    ]
  },
  {
    id:"state_slump_door",
    title:"훈련장에 들어가기 싫은 날",
    body:"링크장 문 앞에서 발이 잠깐 멈춘다. 좋아하던 얼음 냄새가 오늘은 부담스럽게 느껴진다.",
    severe:true,
    meta:{speaker:"선수",role:"self",art:"rest",imageKey:"기본 배경",icon:"🚪",tag:"슬럼프 조짐",quote:"문 앞에서 멈춘 마음을 무시하지 않아도 된다.",mood:"sad"},
    when:()=>game.player.stress>=68 && game.player.condition<=55,
    choices:[
      stateChoice("코치에게 솔직히 말한다",{stress:-9,condition:4},"멈춰 선 마음을 인정하자 다시 들어갈 힘이 생겼다.",{relationships:{coach:3}}),
      stateChoice("아주 쉬운 훈련부터 시작한다",{condition:5,stress:-5},"쉬운 동작을 시작하자 얼음이 조금 덜 차갑게 느껴졌다.",{stats:{stability:.4}}),
      stateChoice("오늘은 회복과 상담으로 바꾼다",{stress:-9,fatigue:-7,condition:5},"훈련 대신 회복을 택하며 마음의 압박을 낮췄다."),
      stateChoice("약한 모습을 보이기 싫어 평소처럼 훈련한다",{stress:9,fatigue:8,injuryRisk:6,condition:-5},"괜찮은 척 들어간 훈련장은 평소보다 더 차갑게 느껴졌다.",{special:{slumpStart:{reason:"압박을 숨긴 훈련",weeks:6,severity:3}}})
    ]
  },
  {
    id:"state_slump_small_success",
    title:"작은 대회에서 찾은 감각",
    body:"큰 결과는 아니지만, 오늘은 레이스가 조금 자연스러웠다. 오랜만에 몸과 마음이 같은 방향으로 움직였다.",
    recovery:true,
    meta:{speaker:"코치",role:"coach",art:"race",imageKey:"포디움",icon:"🌟",tag:"슬럼프 회복",quote:"작은 성공을 작게 보지 마.",mood:"happy"},
    when:()=>!!game.player.slump && hasRecentCompetitionWithin(2) && game.player.condition>=45,
    choices:[
      stateChoice("오늘의 좋은 장면을 기록해 둔다",{stress:-8,condition:5},"작은 성공이 다시 앞으로 나아갈 근거가 되었다.",{special:{slumpReduce:3}}),
      stateChoice("코치와 회복 신호를 확인한다",{stress:-7,condition:5},"좋아진 장면을 확인하자 회복의 방향이 보였다.",{relationships:{coach:2},special:{slumpReduce:3}}),
      stateChoice("무리하지 않고 좋은 감각만 간직한다",{fatigue:-7,condition:6,stress:-5},"돌아온 감각을 조용히 지키며 몸을 쉬게 했다.",{special:{slumpReduce:2}}),
      stateChoice("감각이 돌아왔다며 바로 목표를 크게 올린다",{stress:7,fatigue:6,condition:-3},"돌아온 감각을 너무 빨리 붙잡으려 하자 부담도 함께 커졌다.")
    ]
  },
  {
    id:"state_stress_expectations",
    title:"주변의 기대가 무거운 날",
    body:"사람들은 좋은 결과를 기대한다. 응원은 분명 고맙지만, 오늘은 그 기대가 어깨 위에 조금 무겁게 앉는다.",
    meta:{speaker:"코치",role:"coach",art:"prep",imageKey:"국제대회",icon:"🎤",tag:"기대 부담",quote:"기대는 짊어지는 게 아니라 나눠 드는 거야.",mood:"serious"},
    when:()=>hasUpcomingCompetitionWithin(2) && game.player.fame>=35 && game.player.stress>=52,
    choices:[
      stateChoice("목표를 결과가 아니라 과정으로 다시 쓴다",{stress:-8,condition:4},"기대의 무게를 결과가 아닌 과정으로 나누어 들었다.",{stats:{mental:.5}}),
      stateChoice("코치와 출전 전략을 단순하게 정리한다",{stress:-7,condition:3},"복잡한 기대를 단순한 작전으로 바꿨다.",{stats:{tactics:.5},relationships:{coach:1}}),
      stateChoice("가족에게 부담감을 털어놓는다",{stress:-8,condition:4},"부담감을 말로 꺼내자 어깨가 조금 가벼워졌다.",{relationships:{family:2}}),
      stateChoice("기대에 맞추기 위해 스스로를 더 몰아붙인다",{stress:9,fatigue:8,injuryRisk:5},"기대에 맞서려 할수록 마음은 더 급해졌다.",{special:{slumpStart:{reason:"기대 부담과 과도한 자기 압박",weeks:5,severity:2}}})
    ]
  },
  {
    id:"state_slump_deep_bottom",
    title:"슬럼프의 깊은 바닥",
    body:"무엇을 해도 나아지지 않는 것처럼 느껴진다. 훈련도, 휴식도, 대회도 모두 자신을 밀어내는 것 같다.",
    severe:true,
    meta:{speaker:"선수",role:"self",art:"rest",imageKey:"기본 배경",icon:"🌑",tag:"슬럼프 위기",quote:"바닥은 끝이 아니라 방향을 바꾸는 지점일 수 있다.",mood:"sad"},
    when:()=>!!game.player.slump && game.player.stress>=65 && game.player.fatigue>=55,
    choices:[
      stateChoice("시즌 목표를 잠시 낮춘다",{stress:-9,condition:5},"목표를 낮추는 일은 포기가 아니라 다시 올라오기 위한 발판이 되었다.",{special:{slumpReduce:3}}),
      stateChoice("코치와 회복 계획을 다시 짠다",{stress:-8,fatigue:-5,condition:5},"회복 계획을 다시 잡자 막막함이 조금 줄었다.",{relationships:{coach:2},special:{slumpReduce:4}}),
      stateChoice("가족이나 팀원에게 도움을 요청한다",{stress:-9,condition:4},"혼자 버티지 않아도 된다는 감각이 마음을 조금 붙잡아 주었다.",{relationships:{family:2,teammates:2},special:{slumpReduce:3}}),
      stateChoice("더 강하게 몰아붙여 바닥을 뚫겠다고 한다",{fatigue:10,stress:10,injuryRisk:9,condition:-7},"바닥을 힘으로 밀어붙이려 하자 몸과 마음이 더 깊게 가라앉았다.",{special:{slumpStart:{reason:"슬럼프 속 강행",weeks:8,severity:4}}})
    ]
  },

  {
    id:"state_aftereffect_ankle_shadow",
    title:"발목 후유증의 작은 그림자",
    body:"완전히 나았다고 생각했지만, 빠른 코너에서 발목이 순간적으로 불안해진다. 통증보다 기억이 먼저 몸을 붙잡는다.",
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"훈련링크",icon:"🦶",tag:"발목 후유증",quote:"후유증은 몸보다 기억에 먼저 남을 때가 있다.",mood:"serious"},
    when:()=>hasAftereffectKeyword("발목"),
    choices:[
      stateChoice("코너 진입 속도를 단계적으로 올린다",{injuryRisk:-7,condition:4},"몸의 기억까지 회복하는 데 시간이 필요하다는 걸 받아들였다.",{stats:{cornering:.4}}),
      stateChoice("발목 보강 루틴을 다시 시작한다",{injuryRisk:-9,fatigue:-4},"발목을 다시 믿을 수 있도록 작은 루틴부터 쌓았다.",{stats:{recovery:.4},special:{removeAftereffectKeyword:"발목"}}),
      stateChoice("코치와 복귀 페이스를 조정한다",{injuryRisk:-8,stress:-5},"복귀 속도를 조절하자 불안한 코너가 조금 줄었다.",{relationships:{coach:2}}),
      stateChoice("예전처럼 타기 위해 바로 속도를 올린다",{injuryRisk:10,fatigue:7,stress:5},"예전으로 바로 돌아가려는 마음이 발목을 다시 긴장시켰다.")
    ]
  },
  {
    id:"state_aftereffect_knee_long_season",
    title:"무릎 후유증과 긴 시즌",
    body:"시즌이 길어질수록 무릎의 부담이 조금씩 드러난다. 지금 관리하지 않으면 후반기에 대가를 치를 수 있다.",
    meta:{speaker:"트레이너",role:"coach",art:"clinic",imageKey:"라커룸",icon:"📉",tag:"무릎 후유증",quote:"긴 시즌은 강한 선수보다 잘 조절하는 선수가 버틴다.",mood:"serious"},
    when:()=>hasAftereffectKeyword("무릎") && game.player.fatigue>=42,
    choices:[
      stateChoice("훈련량을 조절하고 회복일을 늘린다",{fatigue:-8,injuryRisk:-8,condition:5},"긴 시즌을 버티기 위해 지금 속도를 조절했다.",{special:{removeAftereffectKeyword:"무릎"}}),
      stateChoice("무릎 부담이 적은 훈련으로 바꾼다",{injuryRisk:-7,fatigue:-5},"훈련 방향을 바꾸자 무릎의 부담이 줄었다.",{stats:{tactics:.4}}),
      stateChoice("중요한 대회까지만 버틴다",{fatigue:6,injuryRisk:7,stress:5},"단기 목표는 유지했지만 무릎 부담이 뒤로 밀렸다."),
      stateChoice("통증을 말하지 않고 시즌을 밀어붙인다",{fatigue:10,injuryRisk:11,stress:8,condition:-6},"말하지 않은 무릎 부담은 시즌 뒤쪽으로 갈수록 더 크게 느껴졌다.",{special:{aftereffects:[{id:"ae_knee_long_term",label:"장기 무릎 후유증",stat:"stability",penalty:.09}]}})
    ]
  },
  {
    id:"state_aftereffect_back_posture",
    title:"허리 후유증과 자세 교정",
    body:"허리 후유증 때문에 자세가 조금 조심스러워졌다. 코치는 예전 자세로 돌아가는 것보다 새로운 균형을 찾자고 한다.",
    meta:{speaker:"코치",role:"coach",art:"training",imageKey:"훈련링크",icon:"🧘",tag:"허리 후유증",quote:"예전의 자세가 아니라 지금의 몸에 맞는 자세를 찾자.",mood:"serious"},
    when:()=>hasAftereffectKeyword("허리"),
    choices:[
      stateChoice("기본 자세를 처음부터 다시 잡는다",{injuryRisk:-8,condition:5},"예전의 몸을 억지로 되찾기보다 새로운 균형을 만들기 시작했다.",{stats:{stability:.6},special:{removeAftereffectKeyword:"허리"}}),
      stateChoice("안정성 훈련을 늘린다",{injuryRisk:-7,fatigue:3},"허리 부담을 줄이는 균형 감각을 다시 쌓았다.",{stats:{stability:.5}}),
      stateChoice("회복과 기술 훈련을 번갈아 진행한다",{condition:6,fatigue:-5,injuryRisk:-6},"회복과 감각 사이에서 무리 없는 리듬을 만들었다.",{special:{removeAftereffectKeyword:"허리"}}),
      stateChoice("불편함을 참고 예전 자세를 억지로 만든다",{injuryRisk:10,condition:-6,stress:5},"익숙한 자세를 억지로 붙잡자 허리가 다시 무겁게 굳었다.")
    ]
  },
  {
    id:"state_comeback_first_lap",
    title:"복귀전의 첫 바퀴",
    body:"부상 이후 첫 대회다. 몸은 돌아왔지만, 첫 바퀴를 어떻게 타느냐에 따라 자신감도 위험도도 달라질 수 있다.",
    recovery:true,
    meta:{speaker:"코치",role:"coach",art:"race",imageKey:"국선",icon:"⛸️",tag:"복귀전",quote:"돌아왔다는 걸 증명하는 가장 좋은 방법은 오래 남는 거야.",mood:"soft"},
    when:()=>hasRecentCompetitionWithin(1) && (hasAftereffectKeyword("후유증") || (game.player.injuryRisk>=45 && game.player.condition>=48)),
    choices:[
      stateChoice("첫 바퀴는 안정적으로 탄다",{injuryRisk:-8,stress:-5,condition:4},"복귀전의 첫 바퀴를 무리 없이 넘기며 다시 얼음 위에 섰다.",{stats:{mental:.4}}),
      stateChoice("몸 상태를 보며 중반부터 올린다",{condition:5,injuryRisk:-5},"몸의 반응을 보며 경기 감각을 천천히 되찾았다.",{stats:{tactics:.4}}),
      stateChoice("코치가 정한 제한 안에서 승부한다",{stress:-4,injuryRisk:-4,condition:3},"정해 둔 선 안에서 승부하며 복귀 감각을 확인했다.",{relationships:{coach:2}}),
      stateChoice("복귀전부터 예전처럼 강하게 붙는다",{injuryRisk:10,fatigue:8,stress:5},"돌아왔다는 걸 증명하고 싶은 마음이 몸보다 앞섰다.")
    ]
  }
];

function makeStateStatusBranchEvents(){
  ensureGameDefaults();
  if(!game.player.aftereffects) game.player.aftereffects=[];
  return STATE_STATUS_EVENTS
    .filter(e=>!e.when || e.when())
    .filter(e=>stateEventCooldownOk(e))
    .map(wrapStateEvent);
}


// 13.2: 관계 수치 기반 이벤트 30개.
// 코치·팀원·가족·라이벌·우호 선수·적대 선수·파트너 관계를 서사형 이벤트로 연결합니다.
const RELATIONSHIP_EVENT_COOLDOWN_WEEKS = 12;
const RELATIONSHIP_EVENT_IMPORTANT_COOLDOWN_WEEKS = 18;

function lowestCoreStatBelow(limit=60){
  ensureGameDefaults();
  const entries=Object.entries(STAT_LABELS)
    .map(([k,label])=>({key:k,label,value:game.player.stats[k]||0}))
    .filter(x=>x.value<limit)
    .sort((a,b)=>a.value-b.value);
  return entries[0] || null;
}
function relationshipEventKey(e){ return e.id || e.title; }
function relationshipEventCooldownOk(e){
  ensureGameDefaults();
  if(!game.relationshipEventHistory) game.relationshipEventHistory={};
  const last=game.relationshipEventHistory[relationshipEventKey(e)] ?? -99;
  const cd=e.important ? RELATIONSHIP_EVENT_IMPORTANT_COOLDOWN_WEEKS : RELATIONSHIP_EVENT_COOLDOWN_WEEKS;
  return game.week - last >= cd;
}
function markRelationshipEvent(e){
  ensureGameDefaults();
  if(!game.relationshipEventHistory) game.relationshipEventHistory={};
  game.relationshipEventHistory[relationshipEventKey(e)] = game.week;
}
function relChoice(text, relationships, resultNarrative, extras={}){
  return {
    text,
    relationships:relationships||{},
    stats:extras.stats||null,
    status:extras.status||null,
    flags:extras.flags||null,
    afterEvent:extras.afterEvent||null,
    noVariance:true,
    narrativeOnly:true,
    resultGroup:"관계 변화",
    resultNarrative,
    log:resultNarrative,
    logTitle:extras.logTitle || "관계",
    dialogueSpeaker:extras.speaker || "선수",
    dialogue:extras.dialogue || resultNarrative,
    scene:extras.scene || null,
    special:extras.special || null,
    fn:extras.fn || null
  };
}
function wrapRelationshipEvent(e){
  return {
    ...e,
    choices:e.choices.map(c=>({
      ...c,
      fn:function(){
        if(c.fn) c.fn.call(this);
        if(c.special && typeof applyStateEventSpecial === "function") applyStateEventSpecial(c.special);
        markRelationshipEvent(e);
      }
    }))
  };
}
function partnerDating(){
  ensureGameDefaults();
  return game.player.romance?.status === "dating";
}
function relationshipCommonMeta(kind, overrides={}){
  const base={
    coach:{speaker:"코치", role:"coach", art:"training", imageKey:"훈련링크", icon:"🧢", tag:"코치 관계", quote:"말이 통하면 훈련도 달라진다.", mood:"serious"},
    teammates:{speaker:"팀원", role:"teammate", art:"training", imageKey:"훈련링크", icon:"🤝", tag:"팀원 관계", quote:"같은 얼음 위에서 혼자만 빠를 수는 없다.", mood:"soft"},
    family:{speaker:"가족", role:"family", art:"family", imageKey:"기본 배경", icon:"🏠", tag:"가족 관계", quote:"결과보다 먼저 네가 걱정된다.", mood:"soft"},
    rival:{speaker:game?.rival?.name || "라이벌", role:"rival", art:"rival", imageKey:"국제대회", icon:"🔥", tag:"라이벌 관계", quote:"결국 우리는 같은 얼음을 보고 있지.", mood:"fire"},
    friendly:{speaker:socialName("friendlyAthlete"), role:"teammate", art:"training", imageKey:"훈련링크", icon:"🌿", tag:"우호 선수", quote:"혼자 봤다면 놓쳤을 장면이야.", mood:"soft"},
    hostile:{speaker:socialName("hostileAthlete"), role:"rival", art:"rival", imageKey:"국제대회", icon:"⚡", tag:"적대 선수", quote:"빙판 밖의 말싸움까지 레이스가 되진 않게 해.", mood:"angry"},
    partner:{speaker:socialName("partner") || "파트너", role:"partner", art:"rest", imageKey:"기본 배경", icon:"💬", tag:"파트너 관계", quote:"오늘 하루는 어땠어?", mood:"soft"}
  };
  return {...(base[kind]||base.coach), ...overrides};
}
function makeRelationshipBranchEvents(){
  ensureGameDefaults();
  const p=game.player;
  const low=lowestCoreStatBelow(60);
  const rivalName=game.rival?.name || "라이벌";
  const friendly=socialName("friendlyAthlete");
  const hostile=socialName("hostileAthlete");
  const partner=socialName("partner");
  const events=[
    {
      id:"rel_coach_slow_explanation",
      title:"코치의 느린 설명",
      body: low
        ? `훈련이 끝난 뒤 코치가 빙판 위에 남아 ${low.label} 동작을 천천히 다시 설명한다. 이미 끝난 훈련이지만, 코치의 표정은 아직 레이스 안에 머물러 있다.`
        : "훈련이 끝난 뒤 코치가 빙판 위에 남아 동작 하나를 천천히 다시 설명한다. 이미 끝난 훈련이지만, 코치의 표정은 아직 레이스 안에 머물러 있다.",
      meta:relationshipCommonMeta("coach"),
      when:()=>p.relationships.coach>=35 && !!lowestCoreStatBelow(60),
      choices:[
        relChoice("끝까지 듣고 다시 한 번 시도한다",{coach:5},"코치와 같은 장면을 바라보는 시간이 조금 길어졌다.",{stats:low?{[low.key]:.5}:null,speaker:"코치"}),
        relChoice("이해한 부분을 직접 말로 정리한다",{coach:6},"설명을 말로 되짚으며 코치와 훈련 방향을 맞췄다.",{stats:{tactics:.4,mental:.3},speaker:"코치"}),
        relChoice("피곤하니 내일 다시 하자고 한다",{coach:0},"오늘은 설명을 미뤘지만, 몸을 쉬게 할 시간은 얻었다.",{status:{fatigue:-5,stress:-3},speaker:"코치"}),
        relChoice("이미 안다고 말하며 대충 넘긴다",{coach:-5},"대충 넘긴 대답 뒤에 코치와의 공기가 살짝 식었다.",{status:{stress:4},speaker:"코치"})
      ]
    },
    {
      id:"rel_coach_reduce_events",
      title:"출전 종목을 줄이자는 말",
      body:"코치가 이번 대회에서는 모든 종목에 나서지 않는 게 좋겠다고 말한다. 선수는 아직 뛸 수 있다고 느끼지만, 코치의 눈은 꽤 단호하다.",
      meta:relationshipCommonMeta("coach",{art:"prep",imageKey:"국선",icon:"📝",tag:"출전 판단"}),
      when:()=>hasUpcomingCompetitionWithin(2) && (p.fatigue>=58 || p.injuryRisk>=52),
      choices:[
        relChoice("코치의 판단을 믿고 종목을 줄인다",{coach:8},"출전보다 긴 시즌을 함께 보는 신뢰가 조금 쌓였다.",{status:{injuryRisk:-7,fatigue:-6,stress:-4},speaker:"코치"}),
        relChoice("가장 중요한 종목만 함께 고른다",{coach:7},"아쉬움을 남기지 않도록 코치와 현실적인 선택지를 골랐다.",{status:{injuryRisk:-5,stress:-5},stats:{tactics:.3},speaker:"코치"}),
        relChoice("아쉽지만 일단 따르겠다고 한다",{coach:3},"완전히 납득하진 못했지만, 코치의 판단을 받아들였다.",{status:{injuryRisk:-4,stress:3},speaker:"코치"}),
        relChoice("코치가 자신을 믿지 않는다며 반발한다",{coach:-9},"반발한 말은 대회 전까지 코치와 선수 사이에 남았다.",{status:{stress:8,injuryRisk:4},speaker:"코치"})
      ]
    },
    {
      id:"rel_coach_hidden_pain_interview",
      title:"통증을 숨긴 뒤의 면담",
      body:"코치가 조용히 불러 세운다. “왜 먼저 말하지 않았지?”라는 질문은 크지 않았지만, 훈련장보다 무겁게 들린다.",
      important:true,
      meta:relationshipCommonMeta("coach",{art:"clinic",imageKey:"라커룸",icon:"🩹",tag:"신뢰 회복",mood:"serious"}),
      when:()=>p.injuryRisk>=60 || hasStoryFlag("통증 은폐 강행") || hasStoryFlag("무릎 부상 은폐") || hasStoryFlag("어깨 통증 은폐"),
      choices:[
        relChoice("숨긴 이유를 솔직히 말한다",{coach:10},"솔직한 말은 늦었지만, 신뢰를 다시 잇는 시작이 되었다.",{status:{stress:-7,injuryRisk:-5},speaker:"코치"}),
        relChoice("앞으로는 바로 알리겠다고 약속한다",{coach:9},"짧은 약속이 다음 몸 관리의 기준이 되었다.",{status:{injuryRisk:-7,stress:-5},speaker:"코치"}),
        relChoice("대회가 중요해서 어쩔 수 없었다고 말한다",{coach:-4},"이유는 있었지만, 코치의 표정은 쉽게 풀리지 않았다.",{stats:{fighting:.4},status:{stress:5},speaker:"코치"}),
        relChoice("내 몸은 내가 안다고 맞선다",{coach:-11},"고집은 잠깐 자신을 지켜 주는 듯했지만, 코치와의 거리는 멀어졌다.",{status:{stress:9,injuryRisk:6},speaker:"코치"})
      ]
    },
    {
      id:"rel_coach_tactics_board",
      title:"코치의 작전판",
      body:"코치가 작전판을 꺼내 이번 대회의 흐름을 설명한다. 단순한 지시가 아니라, 선수와 함께 레이스를 설계하려는 표정이다.",
      meta:relationshipCommonMeta("coach",{art:"prep",imageKey:"국선",icon:"📋",tag:"작전 회의"}),
      when:()=>p.relationships.coach>=65 && hasUpcomingCompetitionWithin(2),
      choices:[
        relChoice("코치의 작전을 그대로 따른다",{coach:6},"작전판 위의 선들이 코치와 선수가 함께 그린 길이 되었다.",{stats:{tactics:.5},status:{stress:-3},speaker:"코치"}),
        relChoice("자신의 의견을 보태 함께 수정한다",{coach:7},"서로의 생각을 보태자 작전이 더 선수답게 바뀌었다.",{stats:{tactics:.5,mental:.3},speaker:"코치"}),
        relChoice("작전보다 감각을 믿겠다고 한다",{coach:0},"감각을 믿는 선택이 나쁘진 않았지만, 작전판은 조금 일찍 닫혔다.",{stats:{mental:.3},speaker:"코치"}),
        relChoice("라이벌만 의식한 작전을 요구한다",{coach:-4,rival:-2},"라이벌만 바라본 작전은 레이스 전체를 좁게 만들었다.",{status:{stress:6},speaker:"코치"})
      ]
    },
    {
      id:"rel_coach_quiet_praise",
      title:"조용한 칭찬",
      body:"훈련이 끝난 뒤 코치가 짧게 말한다. “오늘은 좋았다.” 길지 않은 말인데도 이상하게 오래 남는다.",
      meta:relationshipCommonMeta("coach",{icon:"🌙",tag:"신뢰 형성",mood:"soft"}),
      when:()=>p.relationships.coach>=45 && p.condition>=48 && p.stress<=65 && chance(.55),
      choices:[
        relChoice("고맙다고 말하고 오늘 감각을 기록한다",{coach:5},"짧은 칭찬은 다음 훈련을 버티는 작은 기준이 되었다.",{status:{stress:-5},stats:{mental:.3},speaker:"코치"}),
        relChoice("어떤 점이 좋았는지 묻는다",{coach:6},"칭찬을 그냥 흘려보내지 않고 다음 성장의 단서로 삼았다.",{stats:{tactics:.4},speaker:"코치"}),
        relChoice("더 잘할 수 있었다며 스스로를 다그친다",{coach:0},"칭찬보다 부족한 점이 먼저 떠올라 마음이 조금 바빠졌다.",{stats:{fighting:.4},status:{stress:5},speaker:"코치"}),
        relChoice("당연하다는 듯 넘긴다",{coach:0},"칭찬을 흘려보낸 뒤에도 코치의 말은 뒤늦게 떠올랐다.",{speaker:"코치"})
      ]
    },

    {
      id:"rel_team_relay_touch_miss",
      title:"계주 터치가 어긋난 날",
      body:"터치 타이밍이 몇 번이나 어긋난다. 누구의 잘못이라고 말하기 어렵지만, 팀원들의 표정이 조금씩 굳는다.",
      meta:relationshipCommonMeta("teammates",{icon:"🔁",tag:"계주 호흡"}),
      when:()=>p.stats.relay<62 || p.relationships.teammates<45,
      choices:[
        relChoice("먼저 미안하다고 말한다",{teammates:6},"먼저 건넨 말이 굳어 있던 팀 분위기를 조금 풀었다.",{status:{stress:-4},speaker:"팀원"}),
        relChoice("터치 타이밍을 함께 다시 맞춘다",{teammates:7},"같은 장면을 다시 맞추며 팀의 리듬이 조금 돌아왔다.",{stats:{relay:.5},speaker:"팀원"}),
        relChoice("코치에게 순번 조정을 요청한다",{coach:3,teammates:0},"문제를 개인 탓으로 돌리지 않고 구조를 다시 보려 했다.",{stats:{tactics:.3},speaker:"코치"}),
        relChoice("팀원이 느려서 그렇다고 말한다",{teammates:-8},"책임을 돌린 말은 터치보다 더 크게 어긋났다.",{status:{stress:7},speaker:"팀원"})
      ]
    },
    {
      id:"rel_team_late_training",
      title:"함께 남은 야간 훈련",
      body:"정규 훈련이 끝났는데도 몇몇 팀원이 빙판 위에 남아 있다. 모두 지쳤지만, 오늘은 이상하게 혼자 끝내고 싶지 않다.",
      meta:relationshipCommonMeta("teammates",{icon:"🌃",tag:"훈련 분위기",mood:"soft"}),
      when:()=>p.relationships.teammates>=45 && p.fatigue<=70,
      choices:[
        relChoice("함께 짧게 추가 훈련한다",{teammates:5},"같은 얼음 위에 남은 시간이 팀의 온도를 조금 올렸다.",{status:{fatigue:5},stats:{relay:.3},speaker:"팀원"}),
        relChoice("서로의 장면을 봐 주기로 한다",{teammates:6},"서로의 장면을 봐 주며 혼자서는 보지 못한 부분을 찾았다.",{stats:{tactics:.3,stability:.3},speaker:"팀원"}),
        relChoice("오늘은 쉬어야 한다며 응원만 하고 빠진다",{teammates:3},"훈련에는 빠졌지만, 응원의 말은 팀원들 곁에 남았다.",{status:{fatigue:-6},speaker:"팀원"}),
        relChoice("혼자 따로 훈련한다",{teammates:0},"혼자 남은 훈련은 집중됐지만, 팀과 나눈 시간은 줄었다.",{stats:{mental:.3},speaker:"선수"})
      ]
    },
    {
      id:"rel_team_low_mood",
      title:"팀 분위기가 가라앉은 날",
      body:"대회 결과가 좋지 않았다. 훈련장에 모인 팀원들은 평소보다 말이 적고, 작은 실수에도 분위기가 쉽게 가라앉는다.",
      meta:relationshipCommonMeta("teammates",{icon:"☁️",tag:"팀 분위기",mood:"sad"}),
      when:()=>p.relationships.teammates<55 || (hasRecentCompetitionWithin(2) && p.stress>=50),
      choices:[
        relChoice("먼저 가볍게 분위기를 풀어 본다",{teammates:5},"조심스럽게 건넨 말이 무거운 분위기를 조금 움직였다.",{status:{stress:-4},speaker:"팀원"}),
        relChoice("오늘은 각자 집중하자고 제안한다",{teammates:0},"말을 아낀 덕분에 날카로운 분위기가 더 커지지는 않았다.",{status:{stress:-3},speaker:"팀원"}),
        relChoice("코치에게 팀 미팅을 요청한다",{coach:4,teammates:4},"팀의 문제를 혼자 감당하지 않고 함께 정리하려 했다.",{status:{stress:-4},speaker:"코치"}),
        relChoice("불만을 참지 못하고 팀원을 지적한다",{teammates:-8},"지적은 맞는 말이었을지 몰라도, 지금의 팀에는 날카롭게 박혔다.",{status:{stress:7},speaker:"팀원"})
      ]
    },
    {
      id:"rel_team_relay_order",
      title:"순번을 바꾸자는 제안",
      body:"팀원 중 한 명이 계주 순번을 바꿔 보자고 제안한다. 기록만 보면 가능한 선택이지만, 누군가는 자리를 양보해야 한다.",
      important:true,
      meta:relationshipCommonMeta("teammates",{art:"prep",imageKey:"국선",icon:"🔢",tag:"계주 전략"}),
      when:()=>hasUpcomingCompetitionWithin(3) && p.relationships.teammates>=45 && p.stats.relay>=45,
      choices:[
        relChoice("팀 전체 기록을 보고 결정하자고 한다",{teammates:6},"순번을 함께 논의하며 팀은 조금 더 팀다워졌다.",{stats:{tactics:.3},speaker:"팀원"}),
        relChoice("자신이 양보할 수 있다고 말한다",{teammates:10},"자리를 내어 준 말이 팀 안에 깊게 남았다.",{status:{stress:3},speaker:"팀원"}),
        relChoice("코치에게 최종 판단을 맡긴다",{coach:4,teammates:0},"결정을 코치에게 맡기며 불필요한 감정싸움을 피했다.",{speaker:"코치"}),
        relChoice("내 순번은 바꾸기 싫다고 선을 긋는다",{teammates:-7},"자리를 지킨 말은 분명했지만, 팀원들 사이에 작은 벽을 남겼다.",{stats:{mental:.3},speaker:"팀원"})
      ]
    },
    {
      id:"rel_team_water_bottle",
      title:"팀원이 먼저 건넨 물병",
      body:"훈련 뒤 벤치에 앉아 숨을 고르고 있을 때, 팀원이 말없이 물병을 건넨다. 별일 아닌 듯하지만 묘하게 힘이 빠진다.",
      meta:relationshipCommonMeta("teammates",{icon:"💧",tag:"작은 도움",mood:"soft"}),
      when:()=>p.fatigue>=55 || p.condition<=48,
      choices:[
        relChoice("고맙다고 말한다",{teammates:4},"작은 물병 하나가 오늘의 피로를 조금 덜어냈다.",{status:{stress:-4},speaker:"팀원"}),
        relChoice("다음 훈련 때 도와주겠다고 한다",{teammates:5},"도움을 그냥 받지 않고 다음 협력으로 이어 가려 했다.",{speaker:"팀원"}),
        relChoice("괜찮다며 웃어넘긴다",{teammates:0},"웃어넘긴 말 덕분에 잠깐 분위기가 가벼워졌다.",{status:{stress:-3},speaker:"팀원"}),
        relChoice("지금 말 걸 기분이 아니라고 한다",{teammates:-6},"날카로운 대답 뒤에 팀원은 조용히 물러났다.",{status:{stress:5},speaker:"팀원"})
      ]
    },

    {
      id:"rel_family_pre_message",
      title:"대회 전날의 메시지",
      body:"대회 전날 밤, 가족에게서 짧은 메시지가 온다. 결과보다 다치지 말라는 말이 먼저 적혀 있다.",
      meta:relationshipCommonMeta("family",{icon:"📱",tag:"대회 전날"}),
      when:()=>p.relationships.family>=40 && hasUpcomingCompetitionWithin(1),
      choices:[
        relChoice("고맙다고 답장한다",{family:4},"짧은 답장이었지만, 혼자 뛰는 대회는 아니라는 생각이 들었다.",{status:{stress:-5},speaker:"가족"}),
        relChoice("긴장된 마음을 솔직히 말한다",{family:6},"긴장을 말로 꺼내자 마음이 조금 가벼워졌다.",{stats:{mental:.3},status:{stress:-6},speaker:"가족"}),
        relChoice("대회가 끝나고 연락하겠다고 한다",{family:0},"집중을 지키는 선택을 했지만, 메시지는 마음 한쪽에 남았다.",{speaker:"가족"}),
        relChoice("집중해야 한다며 읽고 답하지 않는다",{family:-4},"답하지 않은 메시지는 마음 한쪽에 조용히 남았다.",{speaker:"가족"})
      ]
    },
    {
      id:"rel_family_after_bad_result_call",
      title:"부진 뒤의 전화",
      body:"대회가 끝난 뒤 가족에게 전화가 온다. 무슨 말을 들어도 위로가 안 될 것 같지만, 전화를 끊기도 어렵다.",
      meta:relationshipCommonMeta("family",{icon:"☎️",tag:"부진 후 위로",mood:"soft"}),
      when:()=>hasRecentCompetitionWithin(2) && p.stress>=55,
      choices:[
        relChoice("힘들었다고 솔직히 말한다",{family:7},"솔직한 말이 나오자, 조금은 대회가 끝난 것처럼 느껴졌다.",{status:{stress:-8},speaker:"가족"}),
        relChoice("괜찮다고만 말한다",{family:0},"괜찮다는 말은 했지만 마음은 아직 경기장에 남아 있었다.",{status:{stress:-2},speaker:"가족"}),
        relChoice("결과보다 과정 이야기를 나눈다",{family:6},"결과가 아닌 과정을 이야기하며 마음이 조금 정리됐다.",{stats:{mental:.3},status:{stress:-6},speaker:"가족"}),
        relChoice("지금은 말하고 싶지 않다며 끊는다",{family:-6},"끊어진 통화 뒤에 방 안이 더 조용해졌다.",{status:{stress:5},speaker:"가족"})
      ]
    },
    {
      id:"rel_family_rest_meal",
      title:"쉬는 날의 집밥",
      body:"오랜만에 제대로 쉬는 날, 가족이 밥을 챙겨 준다. 훈련표도 기록도 없는 시간이 어색하지만 나쁘지 않다.",
      meta:relationshipCommonMeta("family",{icon:"🍚",tag:"회복",mood:"soft"}),
      when:()=>hasRestOrRecoverySelectedRecently() && (p.fatigue>=45 || p.condition<=60),
      choices:[
        relChoice("오늘은 훈련 이야기를 내려놓는다",{family:5},"훈련 이야기를 내려놓은 식탁에서 몸이 조금 늦게 풀렸다.",{status:{stress:-7,fatigue:-4,condition:5},speaker:"가족"}),
        relChoice("최근 힘든 일을 이야기한다",{family:7},"힘든 일을 말하자 혼자 버티던 마음이 조금 느슨해졌다.",{status:{stress:-8},special:{slumpReduce:1},speaker:"가족"}),
        relChoice("식사 뒤 가볍게 산책한다",{family:4},"느린 산책이 회복의 속도와 닮아 있었다.",{status:{condition:5,stress:-5},speaker:"가족"}),
        relChoice("쉬는 시간이 불안해 빨리 돌아간다",{family:0},"불안 때문에 서둘러 나온 길 위에도 따뜻한 밥 냄새가 남았다.",{status:{stress:3},speaker:"가족"})
      ]
    },
    {
      id:"rel_family_crowd_face",
      title:"가족석에서 보인 얼굴",
      body:"경기가 끝난 뒤 관중석에서 가족의 얼굴이 보인다. 결과가 좋든 나쁘든, 그 표정은 먼저 선수를 찾고 있다.",
      meta:relationshipCommonMeta("family",{art:"race",imageKey:"포디움",icon:"👀",tag:"대회 후"}),
      when:()=>hasRecentCompetitionWithin(1) && p.relationships.family>=55,
      choices:[
        relChoice("바로 인사하러 간다",{family:6},"결과보다 먼저 자신을 봐 주는 시선이 마음을 붙잡아 주었다.",{status:{stress:-6},speaker:"가족"}),
        relChoice("결과가 아쉬워도 웃으며 손을 흔든다",{family:5},"아쉬운 결과 위로도 웃을 수 있는 이유가 생겼다.",{stats:{mental:.3},status:{stress:-5},speaker:"가족"}),
        relChoice("코치 미팅을 먼저 마치고 간다",{coach:3,family:0},"선수로서의 일을 먼저 마치고 가족에게 향했다.",{speaker:"코치"}),
        relChoice("결과가 부끄러워 피한다",{family:-6},"피한 발걸음 뒤로 관중석의 얼굴이 오래 남았다.",{status:{stress:5},speaker:"가족"})
      ]
    },

    {
      id:"rel_rival_same_heat",
      title:"같은 조에 배정된 이름",
      body:`조 편성표에 ${rivalName}의 이름이 보인다. 이상하게 심장이 먼저 반응한다. 피하고 싶지는 않지만, 신경 쓰이지 않는 것도 아니다.`,
      meta:relationshipCommonMeta("rival",{icon:"📄",tag:"조 편성"}),
      when:()=>hasUpcomingCompetitionWithin(2) && hasCompetitionExperience(),
      choices:[
        relChoice("라이벌보다 자신의 레이스에 집중한다",{rival:0},"라이벌의 이름은 자극이 되었지만, 레이스의 중심은 자신에게 남았다.",{status:{stress:-4},stats:{mental:.3},speaker:"코치"}),
        relChoice("라이벌의 최근 경기 영상을 본다",{rival:0},"라이벌을 의식하되 감정이 아닌 장면으로 정리했다.",{stats:{tactics:.4},speaker:"코치"}),
        relChoice("라이벌에게 먼저 가볍게 인사한다",{rival:4},"짧은 인사가 긴장된 경쟁을 조금 부드럽게 만들었다.",{status:{stress:-3},speaker:rivalName}),
        relChoice("이번엔 반드시 꺾겠다고 감정을 끌어올린다",{rival:-2},"감정을 끌어올린 만큼 몸도 조금 더 날카롭게 긴장했다.",{status:{stress:5},stats:{fighting:.4},speaker:"선수"})
      ]
    },
    {
      id:"rel_rival_after_loss_words",
      title:"패배 뒤에 건넨 말",
      body:`레이스가 끝난 뒤 ${rivalName}이 먼저 다가온다. “오늘은 내가 운이 좋았네.” 농담처럼 들리지만, 그 안에는 묘한 인정이 섞여 있다.`,
      meta:relationshipCommonMeta("rival",{art:"race",imageKey:"포디움",icon:"🤝",tag:"인정"}),
      when:()=>hasRecentCompetitionWithin(2) && (p.relationships.rival>=15 || hasCompetitionExperience()),
      choices:[
        relChoice("다음엔 내가 이기겠다고 웃으며 말한다",{rival:5},"패배를 인정하는 말이 이상하게 다음 승부의 불씨가 되었다.",{stats:{fighting:.3},speaker:rivalName}),
        relChoice("오늘 좋았던 점을 솔직히 인정한다",{rival:6},"상대의 좋은 장면을 인정하자 패배가 조금 덜 날카로워졌다.",{status:{stress:-4},speaker:rivalName}),
        relChoice("아무 말 없이 지나간다",{rival:0},"말없이 지나친 뒤에도 라이벌의 농담이 뒤늦게 떠올랐다.",{status:{stress:3},speaker:"선수"}),
        relChoice("운이 좋았던 건 맞다고 받아친다",{rival:-7},"날카롭게 받아친 말 뒤에 라이벌의 표정이 차갑게 굳었다.",{status:{stress:5},speaker:rivalName})
      ]
    },
    {
      id:"rel_rival_injury_news",
      title:"라이벌의 부상 소식",
      body:`${rivalName}이 부상으로 훈련을 줄였다는 소식이 들린다. 경쟁자가 멈춘 순간인데, 마음이 생각보다 복잡하다.`,
      important:true,
      meta:relationshipCommonMeta("rival",{art:"clinic",imageKey:"라커룸",icon:"🩹",tag:"드라마"}),
      when:()=>p.relationships.rival>=20 && game.week>=10,
      choices:[
        relChoice("회복을 바란다는 메시지를 보낸다",{rival:8},"경쟁자의 멈춤 앞에서도 선을 지킨 말이 오래 남았다.",{stats:{sportsmanship:.4},speaker:rivalName}),
        relChoice("지금은 내 훈련에 집중한다",{rival:0},"복잡한 마음은 있었지만, 지금 할 수 있는 훈련에 집중했다.",{stats:{mental:.3},speaker:"선수"}),
        relChoice("라이벌이 없는 동안 격차를 벌리겠다고 생각한다",{rival:-1},"경쟁자가 멈춘 틈이 승부욕을 더 날카롭게 만들었다.",{stats:{fighting:.4},status:{stress:3},speaker:"선수"}),
        relChoice("약해진 라이벌을 공개적으로 언급한다",{rival:-11},"가볍게 던진 말은 경쟁을 넘어선 상처가 되었다.",{status:{controversy:2,fame:1,stress:5},speaker:rivalName})
      ]
    },
    {
      id:"rel_rival_same_goal",
      title:"같은 목표를 바라본 순간",
      body:`${rivalName}과 나란히 링크를 바라보는 순간이 생겼다. 서로 다른 팀, 다른 목표처럼 보였지만 결국 같은 얼음 위를 향하고 있었다.`,
      meta:relationshipCommonMeta("rival",{icon:"🌌",tag:"건전한 경쟁",mood:"soft"}),
      when:()=>p.relationships.rival>=55 && (p.internationalCompetitionCount>=1 || p.fame>=30),
      choices:[
        relChoice("서로 좋은 경기 하자고 말한다",{rival:6},"경쟁은 그대로였지만, 서로를 밀어 올리는 방향으로 조금 기울었다.",{status:{stress:-4},speaker:rivalName}),
        relChoice("훈련 방식에 대해 짧게 이야기한다",{rival:5,friendlyAthlete:2},"짧은 대화 속에서 상대를 조금 다른 눈으로 보게 됐다.",{stats:{tactics:.3},speaker:rivalName}),
        relChoice("말없이 고개만 끄덕인다",{rival:3},"말은 없었지만, 같은 목표를 안다는 느낌은 남았다.",{status:{stress:-3},speaker:rivalName}),
        relChoice("속으로 반드시 눌러야 할 상대라고 되뇐다",{rival:-2},"말없이 삼킨 경쟁심은 마음속에서 더 크게 번졌다.",{stats:{fighting:.4},status:{stress:5},speaker:"선수"})
      ]
    },
    {
      id:"rel_rival_public_tension",
      title:"공개 신경전",
      body:"인터뷰에서 라이벌과의 관계를 묻는 질문이 나온다. 대답 하나에 팬들의 반응이 갈릴 수 있는 상황이다.",
      important:true,
      meta:relationshipCommonMeta("rival",{art:"race",imageKey:"국제대회",icon:"🎙️",tag:"공개 신경전"}),
      when:()=>p.relationships.rival<=25 && (p.controversy>=2 || p.fame>=25),
      choices:[
        relChoice("실력 있는 선수라고 인정한다",{rival:8},"인정하는 말은 자존심을 잃는 대신 불필요한 불을 껐다.",{status:{controversy:-1,stress:-4},speaker:"선수"}),
        relChoice("경기에서 보여 주겠다고만 말한다",{rival:0},"말을 아끼며 승부를 다시 빙판 위로 돌렸다.",{stats:{mental:.3},speaker:"선수"}),
        relChoice("질문을 피하고 팀 이야기로 돌린다",{teammates:3,rival:0},"질문을 팀 이야기로 돌리며 신경전을 키우지 않았다.",{status:{controversy:-1},speaker:"선수"}),
        relChoice("노골적으로 라이벌을 낮춰 말한다",{rival:-12},"인터뷰 한마디가 레이스 밖의 싸움을 키웠다.",{status:{controversy:3,fame:2,stress:6},speaker:"선수"})
      ]
    },

    {
      id:"rel_friendly_video",
      title:"함께 본 경기 영상",
      body:`${friendly}가 경기 영상을 함께 보자고 한다. 서로 다른 장면을 보고 있어, 혼자 볼 때보다 더 많은 것이 보인다.`,
      meta:relationshipCommonMeta("friendly",{icon:"🎥",tag:"정보 공유"}),
      when:()=>p.relationships.friendlyAthlete>=40 && (hasUpcomingCompetitionWithin(3) || hasRecentCompetitionWithin(2)),
      choices:[
        relChoice("함께 분석하며 의견을 나눈다",{friendlyAthlete:5},"함께 본 영상 속에서 혼자서는 놓쳤던 흐름이 보였다.",{stats:{tactics:.4},speaker:friendly}),
        relChoice("상대가 본 장면을 먼저 들어 본다",{friendlyAthlete:5},"상대의 시선을 먼저 들으며 레이스를 다르게 보게 됐다.",{status:{stress:-3},speaker:friendly}),
        relChoice("고맙지만 혼자 정리하겠다고 한다",{friendlyAthlete:0},"혼자 정리하는 시간을 지켰지만 대화는 짧아졌다.",{speaker:"선수"}),
        relChoice("내 약점이 보일까 봐 대충 넘긴다",{friendlyAthlete:-5},"숨기려는 마음이 대화를 짧게 만들었다.",{status:{stress:4},speaker:friendly})
      ]
    },
    {
      id:"rel_friendly_walk",
      title:"부진 뒤의 짧은 산책",
      body:`${friendly}가 경기장 밖을 잠깐 걷자고 한다. 위로하려는 말은 서툴지만, 혼자 두지 않으려는 마음은 느껴진다.`,
      meta:relationshipCommonMeta("friendly",{icon:"🚶",tag:"위로",mood:"soft"}),
      when:()=>p.relationships.friendlyAthlete>=45 && hasRecentCompetitionWithin(2) && p.stress>=50,
      choices:[
        relChoice("같이 걸으며 마음을 털어놓는다",{friendlyAthlete:7},"서툰 위로였지만, 혼자가 아니라는 느낌은 분명했다.",{status:{stress:-8},speaker:friendly}),
        relChoice("경기 이야기는 빼고 가볍게 걷는다",{friendlyAthlete:4},"경기 이야기를 빼자 오히려 마음이 조금 쉬었다.",{status:{stress:-6},speaker:friendly}),
        relChoice("고맙지만 혼자 있고 싶다고 한다",{friendlyAthlete:0},"혼자 있는 시간을 지키되, 고마움은 마음에 남았다.",{stats:{mental:.2},speaker:"선수"}),
        relChoice("위로받을 정도는 아니라고 차갑게 말한다",{friendlyAthlete:-7},"차갑게 밀어낸 뒤, 뒤늦게 고마움이 남았다.",{status:{stress:5},speaker:friendly})
      ]
    },
    {
      id:"rel_friendly_record_race",
      title:"선의의 기록 경쟁",
      body:`${friendly}가 오늘 훈련 기록을 보여 주며 웃는다. 도발이라기보다는 같이 올라가자는 신호에 가깝다.`,
      meta:relationshipCommonMeta("friendly",{icon:"⏱️",tag:"선의의 경쟁"}),
      when:()=>p.relationships.friendlyAthlete>=55 && p.fatigue<=70,
      choices:[
        relChoice("오늘 기록으로 가볍게 경쟁한다",{friendlyAthlete:5},"가벼운 경쟁은 피로보다 먼저 웃음으로 남았다.",{stats:{fighting:.3},status:{fatigue:5},speaker:friendly}),
        relChoice("서로의 장점을 하나씩 말해 준다",{friendlyAthlete:6},"서로의 장점을 말하는 경쟁은 이상하게 마음을 편하게 했다.",{status:{stress:-5},speaker:friendly}),
        relChoice("피곤하니 다음에 하자고 한다",{friendlyAthlete:0},"무리하지 않고 다음 경쟁을 남겨 두었다.",{status:{fatigue:-5},speaker:"선수"}),
        relChoice("장난을 진지하게 받아들여 날카롭게 반응한다",{friendlyAthlete:-6},"장난을 날카롭게 받은 순간, 경쟁의 온도가 바뀌었다.",{status:{stress:5},speaker:friendly})
      ]
    },
    {
      id:"rel_friendly_international_face",
      title:"국제대회에서 만난 익숙한 얼굴",
      body:`낯선 경기장, 낯선 언어들 사이에서 ${friendly}의 얼굴이 보인다. 손을 흔드는 모습에 긴장이 조금 풀린다.`,
      meta:relationshipCommonMeta("friendly",{art:"race",imageKey:"국제대회",icon:"🌍",tag:"국제대회"}),
      when:()=>p.relationships.friendlyAthlete>=45 && p.internationalCompetitionCount>=1,
      choices:[
        relChoice("짧게 인사하고 서로 응원한다",{friendlyAthlete:5},"낯선 대회장에 익숙한 인사가 작은 안정감을 만들었다.",{status:{stress:-5},speaker:friendly}),
        relChoice("경기장 분위기에 대해 정보를 나눈다",{friendlyAthlete:5},"낯선 경기장의 공기를 함께 읽으며 긴장이 조금 줄었다.",{stats:{tactics:.3},speaker:friendly}),
        relChoice("너무 의지하지 않으려 거리를 둔다",{friendlyAthlete:0},"거리를 두며 집중을 지켰지만, 반가움은 잠시 미뤄졌다.",{stats:{mental:.2},speaker:"선수"}),
        relChoice("경쟁자라는 생각에 일부러 무시한다",{friendlyAthlete:-6},"무시한 손짓이 경기장보다 더 오래 마음에 남았다.",{status:{stress:5},speaker:friendly})
      ]
    },

    {
      id:"rel_hostile_training_taunt",
      title:"훈련 중 들려온 도발",
      body:`${hostile}가 지나가듯 말을 던진다. 크게 문제 삼기엔 애매하지만, 분명히 들으라고 한 말이다.`,
      meta:relationshipCommonMeta("hostile",{icon:"🗯️",tag:"도발"}),
      when:()=>p.relationships.hostileAthlete<=45,
      choices:[
        relChoice("반응하지 않고 훈련에 집중한다",{hostileAthlete:0},"도발은 지나갔고, 훈련의 중심은 다시 자신에게 돌아왔다.",{stats:{mental:.3},speaker:"선수"}),
        relChoice("짧게 받아치고 끝낸다",{hostileAthlete:-3},"짧은 말은 상황을 끝내는 듯했지만, 긴장감은 조금 남았다.",{status:{stress:4},speaker:hostile}),
        relChoice("코치에게 상황을 알린다",{coach:4,hostileAthlete:2},"상황을 키우지 않고 관리할 방법을 먼저 찾았다.",{status:{controversy:-1},speaker:"코치"}),
        relChoice("공개적으로 맞받아친다",{hostileAthlete:-8},"맞받아친 말은 도발을 끝내지 못하고 더 키웠다.",{status:{controversy:2,stress:6},speaker:hostile})
      ]
    },
    {
      id:"rel_hostile_rough_race",
      title:"레이스 중 거친 견제",
      body:`레이스 중 ${hostile}가 계속 거칠게 라인을 막는다. 심판이 바로 보지 못하는 애매한 장면들이 이어진다.`,
      meta:relationshipCommonMeta("hostile",{art:"race",imageKey:"국제대회",icon:"💢",tag:"대회 중 갈등"}),
      when:()=>hasRecentCompetitionWithin(2) && p.relationships.hostileAthlete<=45,
      choices:[
        relChoice("정당한 라인에서 기회를 기다린다",{hostileAthlete:0},"거친 견제 속에서도 선을 지키며 다음 기회를 기다렸다.",{status:{stress:3},stats:{sportsmanship:.3},speaker:"선수"}),
        relChoice("코너 출구에서 깨끗하게 넘는다",{hostileAthlete:0},"거친 라인을 깨끗한 추월로 돌파할 장면을 머릿속에 남겼다.",{stats:{passing:.4},speaker:"코치"}),
        relChoice("경기 뒤 코치와 항의 여부를 논의한다",{coach:4,hostileAthlete:1},"감정적인 대응 대신 절차 안에서 문제를 다루려 했다.",{status:{stress:-3},speaker:"코치"}),
        relChoice("똑같이 거칠게 맞대응한다",{hostileAthlete:-9},"맞대응은 잠깐 속을 풀었지만, 레이스 밖의 불씨를 남겼다.",{status:{controversy:2,injuryRisk:6,stress:6},stats:{sportsmanship:-.6},speaker:hostile})
      ]
    },
    {
      id:"rel_hostile_fandom_tension",
      title:"팬덤 사이의 신경전",
      body:`팬들 사이에서 ${hostile}와 선수를 비교하는 말들이 커진다. 선수 본인이 나서지 않아도, 분위기는 이미 뜨거워져 있다.`,
      important:true,
      meta:relationshipCommonMeta("hostile",{art:"race",imageKey:"국제대회",icon:"📣",tag:"논란"}),
      when:()=>p.fame>=30 && p.relationships.hostileAthlete<=40,
      choices:[
        relChoice("어떤 말도 하지 않고 경기에 집중한다",{hostileAthlete:0},"말을 아낀 선택은 불필요한 불길에 기름을 붓지 않았다.",{stats:{mental:.3},speaker:"선수"}),
        relChoice("서로 존중해 달라는 짧은 메시지를 남긴다",{hostileAthlete:3},"짧은 메시지가 과열된 분위기를 조금 식혔다.",{status:{controversy:-2},stats:{sportsmanship:.3},speaker:"선수"}),
        relChoice("팀 홍보 담당자와 대응을 상의한다",{teammates:2,hostileAthlete:1},"혼자 반응하지 않고 팀과 함께 상황을 정리했다.",{status:{controversy:-2,stress:-4},speaker:"팀원"}),
        relChoice("팬들의 신경전을 은근히 부추긴다",{hostileAthlete:-10},"은근한 반응은 관심을 키웠지만, 논란도 함께 키웠다.",{status:{fame:3,fan:60,controversy:3,stress:6},speaker:"선수"})
      ]
    },
    {
      id:"rel_hostile_chance_to_apologize",
      title:"사과할 수 있는 기회",
      body:`경기장 복도에서 ${hostile}와 마주친다. 어색한 침묵이 흐른다. 먼저 말을 건다면 상황이 조금 달라질 수도 있다.`,
      meta:relationshipCommonMeta("hostile",{art:"rest",imageKey:"라커룸",icon:"🕊️",tag:"관계 회복"}),
      when:()=>p.relationships.hostileAthlete<=30 && (p.controversy>=1 || hasRecentCompetitionWithin(3)),
      choices:[
        relChoice("이전 일에 대해 짧게 사과한다",{hostileAthlete:10},"짧은 사과가 모든 것을 바꾸진 못했지만, 더 나빠지는 것은 막았다.",{status:{controversy:-1,stress:-4},speaker:hostile}),
        relChoice("앞으로 경기에서 보자고만 말한다",{hostileAthlete:4},"감정 대신 경기로 다시 만나자는 말이 복도에 남았다.",{speaker:hostile}),
        relChoice("아무 말 없이 지나간다",{hostileAthlete:0},"침묵은 상황을 키우지는 않았지만, 풀지도 못했다.",{speaker:"선수"}),
        relChoice("다시 한 번 날카로운 말을 던진다",{hostileAthlete:-8},"다시 던진 말은 복도에 남은 침묵을 더 차갑게 만들었다.",{status:{controversy:2,stress:5},speaker:hostile})
      ]
    },

    {
      id:"rel_partner_late_message",
      title:"늦은 밤의 연락",
      body:`늦은 밤, ${partner}에게서 연락이 온다. 별다른 이야기는 아니지만, 오늘 하루가 어땠는지 묻는 말이 이상하게 오래 머문다.`,
      important:true,
      meta:relationshipCommonMeta("partner",{icon:"💬",tag:"정서적 안정"}),
      when:()=>romanceAllowed() && p.age>=18 && p.fame>=35 && !partnerDating() && !hasStoryFlag("romance_declined_bad") && !hasStoryFlag("romance_broke_hard"),
      choices:[
        relChoice("오늘 힘들었던 일을 조금 이야기한다",{partner:8},"짧은 대화였지만, 하루의 끝이 조금 덜 날카로워졌다.",{status:{stress:-7},flags:["romance_started"],speaker:partner}),
        relChoice("가볍게 안부만 나눈다",{partner:4},"가벼운 안부만 나눴지만, 이상하게 마음이 조금 느슨해졌다.",{status:{stress:-4},flags:["dating_slow"],speaker:partner}),
        relChoice("대회가 끝나고 제대로 이야기하자고 한다",{partner:0},"집중을 지키되, 대회 뒤의 대화를 남겨 두었다.",{flags:["romance_declined_good"],speaker:partner}),
        relChoice("집중해야 한다며 답을 미룬다",{partner:-4},"미룬 답장은 집중을 지켰지만, 마음 한쪽을 비워 두었다.",{flags:["romance_declined_bad"],speaker:partner})
      ]
    },
    {
      id:"rel_partner_schedule_conflict",
      title:"대회 일정과 약속",
      body:"오래전 잡아 둔 약속과 대회 준비 일정이 겹친다. 파트너는 이해한다고 말하지만, 목소리에는 작은 아쉬움이 묻어난다.",
      meta:relationshipCommonMeta("partner",{art:"prep",imageKey:"국선",icon:"📅",tag:"일정 충돌"}),
      when:()=>partnerDating() && hasUpcomingCompetitionWithin(2),
      choices:[
        relChoice("상황을 솔직히 설명하고 양해를 구한다",{partner:4},"솔직한 설명은 아쉬움을 완전히 지우진 못했지만, 오해를 막았다.",{status:{stress:-4},speaker:partner}),
        relChoice("짧게라도 시간을 내서 만난다",{partner:6},"짧은 시간이었지만 서로를 뒤로 미루지만은 않았다는 느낌이 남았다.",{status:{fatigue:4,stress:-5},speaker:partner}),
        relChoice("대회가 끝난 뒤의 약속을 새로 잡는다",{partner:3},"지금의 집중과 이후의 관계를 함께 지키는 약속을 남겼다.",{stats:{mental:.2},speaker:partner}),
        relChoice("선수 생활이 우선이라며 차갑게 말한다",{partner:-8},"차갑게 그은 선은 대회 준비보다 더 오래 마음에 남았다.",{status:{stress:6},speaker:partner})
      ]
    },
    {
      id:"rel_partner_result_first",
      title:"결과보다 먼저 묻는 사람",
      body:"대회가 끝난 뒤 파트너가 결과보다 먼저 몸 상태를 묻는다. 그 질문이 고맙기도 하고, 조금은 낯설기도 하다.",
      meta:relationshipCommonMeta("partner",{art:"rest",imageKey:"라커룸",icon:"🫶",tag:"대회 후"}),
      when:()=>partnerDating() && hasRecentCompetitionWithin(2),
      choices:[
        relChoice("고맙다고 말하고 솔직히 답한다",{partner:6},"결과보다 자신을 먼저 보는 질문이 마음을 조금 부드럽게 만들었다.",{status:{stress:-7},speaker:partner}),
        relChoice("결과 이야기를 먼저 하고 싶다고 말한다",{partner:0},"결과를 먼저 꺼내며 마음을 정리할 시간을 얻었다.",{stats:{mental:.2},speaker:partner}),
        relChoice("괜찮다며 가볍게 넘긴다",{partner:0},"괜찮다는 말은 했지만, 몸보다 마음이 먼저 숨은 느낌이었다.",{status:{stress:-2},speaker:partner}),
        relChoice("지금은 혼자 있고 싶다고 거리를 둔다",{partner:-6},"혼자 있고 싶다는 말은 필요했지만, 상대에게는 거리로 들렸다.",{status:{stress:5},speaker:partner})
      ]
    }
  ];
  return events.filter(e=>!e.when || e.when()).filter(e=>relationshipEventCooldownOk(e)).map(wrapRelationshipEvent);
}

function makeBranchingEvents(){
  ensureGameDefaults();
  const p=game.player;
  const medalCount = totalMedals();
  const stage = getStage(p.age);
  const events = [
    {
      when:()=>hasCompetitionExperience() && (game.week>=8 || (p.relationships.rival||0)>=35),
      title:'라이벌의 도발',
      body:`${game.rival.name}이 인터뷰에서 “다음 결승에서도 내가 먼저 들어올 것”이라고 말했습니다.`,
      meta:{speaker:game.rival.name, role:'rival', art:'rival', icon:'🔥', tag:'라이벌', quote:'빙판에서는 말이 아니라 기록으로 증명해.', mood:'fire'},
      choices:[
        {text:'도발을 훈련 동력으로 바꾼다', stats:{fighting:3, acceleration:1}, status:{fatigue:5, stress:3}, relationships:{rival:6}, dialogueSpeaker:'코치', dialogue:'좋아, 감정을 경기력으로 바꾸자.', log:'라이벌의 도발을 동력으로 삼아 훈련 강도를 끌어올렸습니다.'},
        {text:'침착하게 상대를 분석한다', stats:{tactics:2, mental:2}, status:{condition:2}, relationships:{coach:2}, dialogueSpeaker:'코치', dialogue:'흥분하지 않고 데이터를 보자. 그게 더 무섭다.', log:'라이벌 분석을 통해 전술과 멘탈이 상승했습니다.'},
        {text:'공동 훈련을 제안한다', stats:{relay:1, passing:1}, status:{fame:2, fan:20}, relationships:{rival:3, teammates:2}, dialogueSpeaker:game.rival.name, dialogue:'의외네. 같이 타 보면 네 장점을 더 잘 알 수 있겠어.', log:'라이벌과의 공동 훈련 제안으로 팬 반응이 좋아졌습니다.'}
      ]
    },
    {
      when:()=>p.relationships.coach >= 45,
      title:'코치의 특별 메뉴',
      body:'코치가 이번 주에 한 가지 특별 훈련 프로그램만 집중적으로 밀어 보자고 제안했습니다.',
      meta:{speaker:'코치', role:'coach', art:'training', icon:'📋', tag:'코치', quote:'지금 네게 필요한 건 방향이야, 양이 아니라.', mood:'serious'},
      choices:[
        {text:'순발력 특화 프로그램', stats:{reaction:2, acceleration:2, topSpeed:1}, status:{fatigue:6, injuryRisk:3}, relationships:{coach:3}, dialogueSpeaker:'코치', dialogue:'좋아. 스타트 한 번으로 레이스 흐름을 바꿔 보자.', log:'코치의 순발력 프로그램으로 단거리 핵심 능력이 상승했습니다.'},
        {text:'레이스 운영 프로그램', stats:{tactics:2, mental:1, passing:1}, status:{fatigue:3}, relationships:{coach:4}, dialogueSpeaker:'코치', dialogue:'마지막 두 바퀴를 읽을 수 있는 선수가 되자.', log:'전술 중심 프로그램으로 운영 능력이 좋아졌습니다.'},
        {text:'무리하지 않고 기존 루틴 유지', stats:{stability:1, recovery:1}, status:{condition:3, stress:-3}, relationships:{coach:1}, dialogueSpeaker:'코치', dialogue:'좋아. 루틴을 지키는 것도 실력이다.', log:'기존 루틴을 유지하며 안정성과 회복력이 소폭 상승했습니다.'}
      ]
    },
    {
      when:()=>p.stress >= 22 || p.relationships.family < 65,
      title:'가족의 저녁 식사 초대',
      body:'가족이 오랜만에 함께 저녁을 먹자고 연락해 왔습니다. 최근 표정이 너무 굳어 보인다고 걱정합니다.',
      meta:{speaker:'가족', role:'family', art:'family', icon:'🏠', tag:'가족', quote:'조금 돌아가도 괜찮아. 오래 가는 게 더 중요하단다.', mood:'soft'},
      choices:[
        {text:'일정을 비우고 함께 시간을 보낸다', stats:{mental:2}, status:{condition:6, stress:-8, fatigue:-4}, relationships:{family:8}, dialogueSpeaker:'가족', dialogue:'표정이 한결 편해졌네. 오늘은 쉬어도 괜찮아.', log:'가족과 시간을 보내며 스트레스가 크게 줄었습니다.'},
        {text:'짧게 들렀다가 돌아와 훈련한다', stats:{recovery:1, fighting:1}, status:{condition:2, fatigue:2, stress:-3}, relationships:{family:3}, dialogueSpeaker:'코치', dialogue:'좋아, 밸런스를 잘 잡았네.', log:'가족과 짧게 시간을 보낸 뒤 훈련에 복귀했습니다.'},
        {text:'대회를 이유로 정중히 거절한다', stats:{mental:1}, status:{stress:4}, relationships:{family:-5}, dialogueSpeaker:'가족', dialogue:'이해는 하지만, 네 마음도 좀 챙겼으면 좋겠구나.', log:'대회를 우선시해 가족과의 관계가 조금 멀어졌습니다.'}
      ]
    },
    {
      when:()=>p.stats.relay >= 45 || p.relationships.teammates < 55,
      title:'계주 순번 갈등',
      body:'계주 훈련 중 마지막 주자 순번을 두고 팀원들과 의견이 갈렸습니다.',
      meta:{speaker:'팀원', role:'teammate', art:'team', icon:'🤝', tag:'팀워크', quote:'계주는 누가 더 빠르냐보다 누가 팀을 완성하느냐가 중요해.', mood:'serious'},
      choices:[
        {text:'팀 회의를 열어 모두의 의견을 듣는다', stats:{relay:2, tactics:1, mental:1}, relationships:{teammates:7}, status:{stress:-2}, dialogueSpeaker:'팀원', dialogue:'네가 먼저 듣자고 해줘서 분위기가 풀렸어.', log:'팀 회의를 통해 계주 센스와 팀원 호흡이 좋아졌습니다.'},
        {text:'내가 마무리 주자여야 한다고 주장한다', stats:{fighting:2}, relationships:{teammates:-7, rival:2}, status:{stress:2}, dialogueSpeaker:'코치', dialogue:'자신감은 좋지만, 계주는 개인전이 아니야.', log:'자신의 역할을 강하게 주장해 승부욕은 올랐지만 팀 호흡이 나빠졌습니다.'},
        {text:'한 주 동안 양보하고 팀 균형을 본다', stats:{relay:1, stability:1, mental:1}, relationships:{teammates:4, coach:2}, dialogueSpeaker:'코치', dialogue:'좋아. 양보도 결국 리더십이다.', log:'팀을 위해 한발 물러서며 팀워크와 안정성이 올랐습니다.'}
      ]
    },
    {
      when:()=>hasCompetitionExperience() && (p.fame >= 18 || p.fan >= 120),
      title:'스폰서 화보 제안',
      body:'스포츠 브랜드에서 화보 촬영과 장비 협찬 제안을 해 왔습니다. 다만 일정이 빡빡해질 수 있습니다.',
      meta:{speaker:'스폰서 매니저', role:'sponsor', art:'crowd', icon:'📸', tag:'스폰서', quote:'지금의 당신은 기록뿐 아니라 이야기로도 주목받고 있어요.', mood:'happy'},
      choices:[
        {text:'정식으로 제안을 수락한다', status:{money:90, fame:12, fan:80, stress:6}, relationships:{family:1}, dialogueSpeaker:'매니저', dialogue:'좋은 선택이에요. 당신의 브랜드 가치가 올라갈 거예요.', log:'화보 촬영을 수락해 자금과 명성이 크게 올랐습니다.'},
        {text:'촬영 시간을 최소화해 조건부 수락', status:{money:50, fame:6, fan:40, stress:2}, stats:{mental:1}, dialogueSpeaker:'코치', dialogue:'훈련 리듬을 해치지 않는 선이면 괜찮아.', log:'스케줄을 조정해 부담을 줄이면서 제안을 수락했습니다.'},
        {text:'이번 시즌은 경기 집중을 택한다', stats:{mental:1, tactics:1}, status:{stress:-2}, dialogueSpeaker:'매니저', dialogue:'알겠습니다. 성적으로 다시 만나요.', log:'스폰서 제안을 거절하고 경기 집중을 선택했습니다.'}
      ]
    },
    {
      when:()=>p.stats.mental < 65 || p.stress > 30,
      title:'스포츠 심리 상담',
      body:'구단에서 스포츠 심리 상담 프로그램을 제안했습니다. 큰 경기 전 긴장 조절에 도움이 될 수 있습니다.',
      meta:{speaker:'심리 코치', role:'coach', art:'training', icon:'🧠', tag:'멘탈', quote:'마음이 흔들리면 스케이트도 흔들립니다.', mood:'calm'},
      choices:[
        {text:'정기 상담을 받는다', stats:{mental:3, stability:1}, status:{stress:-8, condition:2}, relationships:{coach:2}, dialogueSpeaker:'심리 코치', dialogue:'호흡부터 다시 잡자. 네 몸은 이미 많은 걸 알고 있어.', log:'정기 상담으로 멘탈과 안정성이 향상되었습니다.'},
        {text:'짧은 루틴만 배우고 끝낸다', stats:{mental:1}, status:{stress:-4}, dialogueSpeaker:'심리 코치', dialogue:'짧아도 루틴은 효과가 있어.', log:'간단한 심리 루틴을 익혀 스트레스가 줄었습니다.'},
        {text:'내 방식대로 버틴다', stats:{fighting:1}, status:{stress:5}, dialogueSpeaker:'코치', dialogue:'버틸 수는 있겠지만, 소모도 크다.', log:'상담을 거절하고 스스로 버티기로 했습니다.'}
      ]
    },
    {
      when:()=>p.injuryRisk > 42,
      title:'부상 전조 신호',
      body:'훈련 도중 무릎과 발목에 미묘한 불안감이 느껴졌습니다. 아직 큰 통증은 아니지만 경고 신호일 수 있습니다.',
      meta:{speaker:'의무 트레이너', role:'clinic', art:'clinic', icon:'🩺', tag:'컨디션', quote:'사소한 신호를 무시한 대가가 가장 큽니다.', mood:'serious'},
      choices:[
        {text:'즉시 훈련 강도를 줄이고 검사한다', stats:{recovery:2}, status:{condition:4, fatigue:-6, injuryRisk:-14, stress:-2}, dialogueSpeaker:'트레이너', dialogue:'지금 멈춘 덕분에 다음 달을 지킬 수 있어.', log:'조기 검사를 통해 부상 위험이 크게 줄었습니다.'},
        {text:'가벼운 관리만 하고 계속 훈련한다', stats:{mental:1}, status:{fatigue:2, injuryRisk:-3}, dialogueSpeaker:'코치', dialogue:'완전히 무시하지는 않았지만, 계속 관찰해야 해.', log:'간단한 관리로 넘겼지만 완전한 해소는 아니었습니다.'},
        {text:'중요한 일정이니 그대로 밀어붙인다', stats:{fighting:2}, status:{fatigue:6, injuryRisk:12, condition:-4, stress:3}, dialogueSpeaker:'트레이너', dialogue:'좋지 않은 선택일 수도 있어…', log:'훈련을 강행해 승부욕은 올랐지만 부상 위험이 커졌습니다.'}
      ]
    },
    {
      when:()=>p.money >= 120,
      title:'비공개 야간 빙질 테스트',
      body:'야간에만 열리는 비공개 빙질 테스트 세션 초대를 받았습니다. 소수 인원만 참여할 수 있는 기회입니다.',
      meta:{speaker:'선배 선수', role:'player', art:'night', icon:'🌙', tag:'특별 세션', quote:'다들 잘 때 한 번 더 타는 사람이 결국 앞서가더라.', mood:'fire'},
      choices:[
        {text:'참가해 한계에 도전한다', stats:{cornering:2, topSpeed:2}, status:{fatigue:7, stress:2, money:-20}, dialogueSpeaker:'선배 선수', dialogue:'좋은 선택이야. 이런 빙질 경험은 큰 무기가 돼.', log:'야간 테스트 세션에 참가해 기술 능력이 상승했습니다.'},
        {text:'관찰만 하고 메모한다', stats:{tactics:2, stability:1}, status:{money:-10}, dialogueSpeaker:'코치', dialogue:'직접 타지 않아도 배울 게 많지.', log:'세션을 관찰하며 빙질 대응 능력을 익혔습니다.'},
        {text:'몸 상태를 위해 참가하지 않는다', stats:{recovery:1}, status:{condition:3, fatigue:-4}, dialogueSpeaker:'코치', dialogue:'쉬는 용기도 실력이다.', log:'참가를 포기하고 몸 상태를 지키는 쪽을 택했습니다.'}
      ]
    },
    {
      when:()=>p.age < 18,
      title:'학업과 훈련의 충돌',
      body:'학교 수행평가 일정이 겹쳐 이번 주 훈련 집중도가 흔들릴 수 있습니다.',
      meta:{speaker:'담임 선생님', role:'family', art:'family', icon:'📚', tag:'생활', quote:'선수이기 전에 학생이기도 하니까, 균형을 같이 고민해 보자.', mood:'calm'},
      choices:[
        {text:'학업 시간을 먼저 확보한다', stats:{mental:1, tactics:1}, status:{stress:-4, condition:2}, relationships:{family:4}, dialogueSpeaker:'담임 선생님', dialogue:'잘했다. 마음이 정리되면 훈련 집중도도 올라간다.', log:'학업 균형을 챙겨 스트레스가 줄었습니다.'},
        {text:'훈련을 우선하고 밤에 공부한다', stats:{fighting:1, reaction:1}, status:{fatigue:5, stress:3}, dialogueSpeaker:'가족', dialogue:'해낼 수 있겠지만 너무 무리하진 마.', log:'훈련을 우선시해 기세는 올랐지만 피로가 늘었습니다.'},
        {text:'코치와 시간표를 다시 짠다', stats:{recovery:1, mental:1}, status:{stress:-2}, relationships:{coach:3}, dialogueSpeaker:'코치', dialogue:'좋아, 일정 조율도 선수의 능력이지.', log:'코치와 일정을 재조정해 무리 없는 주간 계획을 세웠습니다.'}
      ]
    },
    {
      when:()=>hasCompetitionExperience() && p.fan >= 60,
      title:'팬 미팅 초대',
      body:'대회장 근처에서 작은 팬 미팅 요청이 들어왔습니다. 어린 팬들이 직접 응원 메시지를 준비해 왔다고 합니다.',
      meta:{speaker:'팬 대표', role:'media', art:'crowd', icon:'💌', tag:'팬', quote:'당신이 달리는 모습을 보고 저도 꿈을 꾸기 시작했어요!', mood:'happy'},
      choices:[
        {text:'시간을 내어 팬들과 만난다', stats:{mental:2}, status:{fan:90, fame:8, stress:-3}, dialogueSpeaker:'팬 대표', dialogue:'정말 와 줬네요! 오늘 응원이 더 커질 거예요.', log:'팬 미팅으로 팬 수와 명성이 크게 증가했습니다.'},
        {text:'짧은 영상 메시지를 남긴다', status:{fan:45, fame:4}, stats:{mental:1}, dialogueSpeaker:'매니저', dialogue:'직접 못 만나도 진심은 전해졌어.', log:'영상 메시지로 팬들과 소통했습니다.'},
        {text:'경기 집중을 위해 정중히 거절한다', stats:{tactics:1}, status:{stress:-1}, dialogueSpeaker:'코치', dialogue:'집중해야 할 시기라면 그 선택도 맞다.', log:'팬 미팅을 거절하고 경기 준비에 집중했습니다.'}
      ]
    },
    {
      when:()=>p.age <= 16 && !hasStoryFlag('growth_spurt_seen'),
      title:'성장기 변화',
      body:'최근 몸의 밸런스가 달라지는 느낌입니다. 성장기 특유의 변화가 스케이트 감각에도 영향을 주고 있습니다.',
      meta:{speaker:'코치', role:'coach', art:'training', icon:'📈', tag:'성장기', quote:'몸이 바뀌는 시기는 흔들리기도 하지만, 잘 넘기면 한 단계 올라간다.', mood:'calm'},
      choices:[
        {text:'기술 감각 재적응에 집중한다', stats:{stability:2, cornering:1, recovery:1}, status:{condition:2}, flags:['growth_spurt_seen'], dialogueSpeaker:'코치', dialogue:'좋아. 급하게 밀어붙이기보다 감각을 다시 세우자.', log:'성장기 변화에 맞춰 기술 재적응을 진행했습니다.'},
        {text:'힘이 붙은 만큼 스피드 훈련을 늘린다', stats:{acceleration:2, topSpeed:2}, status:{fatigue:5, injuryRisk:4}, flags:['growth_spurt_seen'], dialogueSpeaker:'코치', dialogue:'효과는 빠르겠지만, 몸이 완전히 적응한 건 아니야.', log:'성장기 변화를 힘으로 전환해 스피드 능력이 상승했습니다.'}
      ]
    },
    {
      when:()=>p.condition < 48 || p.stress > 34,
      title:'슬럼프의 그림자',
      body:'최근 훈련 결과가 기대만큼 나오지 않고, 자꾸 마음이 무거워집니다. 스스로도 슬럼프를 느끼기 시작했습니다.',
      meta:{speaker:p.name, role:'player', art:'night', icon:'🌫️', tag:'슬럼프', quote:'왜 예전처럼 쉽게 안 되는 걸까…', mood:'serious'},
      choices:[
        {text:'하루 완전 휴식을 선언한다', stats:{mental:2, recovery:1}, status:{condition:8, fatigue:-10, stress:-8}, dialogueSpeaker:'코치', dialogue:'좋아. 슬럼프에선 쉬는 것도 훈련이다.', log:'완전 휴식으로 컨디션과 멘탈을 회복했습니다.'},
        {text:'기록 영상을 보며 원인을 찾는다', stats:{tactics:2, mental:1}, status:{stress:-3}, dialogueSpeaker:p.name, dialogue:'문제가 보이기 시작해. 막연한 불안이 줄어들었어.', log:'영상 분석으로 슬럼프 원인을 파악했습니다.'},
        {text:'오히려 강훈련으로 밀어붙인다', stats:{fighting:3}, status:{fatigue:7, condition:-5, stress:4, injuryRisk:6}, dialogueSpeaker:'코치', dialogue:'뚫고 나갈 수도 있지만, 더 깊어질 수도 있다.', log:'슬럼프를 강훈련으로 돌파하려 했습니다.'}
      ]
    },
    {
      when:()=>stage==='senior' && (hasUpcomingInternationalCompetition(3) || hasInternationalExperience()),
      title:'원정 이동 피로',
      body:'다음 국제대회를 앞두고 장거리 이동이 예정되어 있습니다. 원정 루틴을 어떻게 가져갈지 선택해야 합니다.',
      meta:{speaker:'매니저', role:'media', art:'travel', icon:'✈️', tag:'원정', quote:'원정 컨디션 관리도 정상급 선수의 능력입니다.', mood:'calm'},
      choices:[
        {text:'하루 먼저 들어가 적응한다', stats:{stability:1, mental:1}, status:{money:-35, condition:4, fatigue:-3}, dialogueSpeaker:'매니저', dialogue:'좋아요. 여유 있게 현지 빙질을 느껴 봅시다.', log:'일찍 이동해 원정 적응에 성공했습니다.'},
        {text:'비용을 아끼고 일정대로 움직인다', status:{money:10, fatigue:3, stress:2}, stats:{fighting:1}, dialogueSpeaker:'코치', dialogue:'예산은 아꼈지만 컨디션이 변수가 될 수 있다.', log:'예산을 아끼는 대신 이동 피로가 조금 쌓였습니다.'},
        {text:'이동 중 회복 루틴을 철저히 챙긴다', stats:{recovery:2}, status:{condition:3, stress:-2}, relationships:{coach:2}, dialogueSpeaker:'코치', dialogue:'좋아. 루틴이 있으면 원정이 덜 흔들린다.', log:'이동 중 회복 루틴으로 원정 피로를 관리했습니다.'}
      ]
    },
    {
      when:()=>hasCompetitionExperience() && (medalCount >= 2 || p.fame >= 35),
      title:'기자회견 질문',
      body:'기자회견에서 “당신의 강점은 무엇이고, 약점은 무엇입니까?”라는 질문이 나왔습니다.',
      meta:{speaker:'기자', role:'media', art:'media', icon:'🎤', tag:'언론', quote:'팬들은 당신의 기록만큼 당신의 태도도 기억합니다.', mood:'serious'},
      choices:[
        {text:'겸손하게 팀과 코치 덕분이라고 답한다', stats:{mental:1, relay:1}, status:{fame:5, fan:35}, relationships:{coach:3, teammates:3}, dialogueSpeaker:'기자', dialogue:'좋은 답변이네요. 팀 이미지도 좋아졌습니다.', log:'겸손한 인터뷰로 팀과 팬의 호감을 얻었습니다.'},
        {text:'자신감 있게 우승 목표를 선언한다', stats:{fighting:2}, status:{fame:7, stress:2, fan:25}, dialogueSpeaker:'기자', dialogue:'강한 자신감이 느껴집니다. 다음 경기가 더 주목받겠군요.', log:'자신감 있는 선언으로 화제를 모았습니다.'},
        {text:'약점을 솔직하게 인정하고 보완 의지를 말한다', stats:{mental:2, tactics:1}, status:{fan:20, fame:3}, dialogueSpeaker:'기자', dialogue:'솔직함이 인상적이네요.', log:'솔직한 인터뷰로 팬들의 신뢰를 얻었습니다.'}
      ]
    },
    {
      when:()=>p.relationships.family <= 42,
      title:'가족의 서운함',
      body:'가족이 최근 연락이 너무 줄었다며 서운해합니다. 지원은 계속하겠지만, 마음의 거리가 느껴집니다.',
      meta:{speaker:'가족', role:'family', art:'family', icon:'📞', tag:'관계', quote:'우린 늘 네 편이지만, 네 마음도 듣고 싶어.', mood:'soft'},
      choices:[
        {text:'먼저 전화해 솔직히 이야기한다', stats:{mental:2}, status:{stress:-5}, relationships:{family:9}, dialogueSpeaker:'가족', dialogue:'이렇게 말해 줘서 고맙구나.', log:'가족과 대화를 나누며 관계가 크게 회복되었습니다.'},
        {text:'경기 끝나고 보자고 미룬다', stats:{fighting:1}, status:{stress:2}, relationships:{family:-3}, dialogueSpeaker:'가족', dialogue:'알겠다. 다만 너무 늦지 않았으면 해.', log:'대화가 미뤄져 가족 관계가 조금 더 멀어졌습니다.'},
        {text:'짧은 선물과 메시지를 보낸다', status:{money:-20, stress:-1}, relationships:{family:4}, dialogueSpeaker:'가족', dialogue:'네 마음은 잘 받았다. 몸도 챙기렴.', log:'작은 선물과 메시지로 가족의 서운함을 달랬습니다.'}
      ]
    },
    {
      when:()=>p.stats.stability < 58,
      title:'얼음 상태 이상',
      body:'훈련장 얼음이 평소보다 무르고 거칠어 코너링 감각이 달라졌습니다.',
      meta:{speaker:'빙질 관리자', role:'coach', art:'ice', icon:'🧊', tag:'빙질', quote:'오늘은 표면이 조금 살아 있어요. 감각 조절이 필요합니다.', mood:'calm'},
      choices:[
        {text:'기본 자세 훈련으로 전환한다', stats:{stability:2, cornering:1}, status:{condition:1}, dialogueSpeaker:'코치', dialogue:'좋아. 이런 날은 기본을 다지는 게 정답이야.', log:'빙질 변화에 맞춰 기본 자세를 다졌습니다.'},
        {text:'오히려 공격적으로 타 본다', stats:{cornering:2, passing:1}, status:{injuryRisk:5, fatigue:3}, dialogueSpeaker:p.name, dialogue:'위험하지만 이런 감각도 언젠간 무기가 될 거야.', log:'어려운 빙질에서 공격적인 주행을 시도했습니다.'},
        {text:'장비 세팅을 미세 조정한다', stats:{tactics:1, stability:1}, status:{money:-10, injuryRisk:-3}, dialogueSpeaker:'정비사', dialogue:'조금만 바꿔도 훨씬 편해질 거예요.', log:'장비 세팅 조정으로 빙질 적응이 수월해졌습니다.'}
      ]
    },
    {
      when:()=>p.relationships.teammates >= 70,
      title:'팀원과의 비밀 특훈',
      body:'팀원들이 당신에게 계주 마무리 합을 맞추는 비밀 특훈을 제안했습니다.',
      meta:{speaker:'팀원', role:'teammate', art:'team', icon:'💪', tag:'팀워크', quote:'우리끼리 조금만 더 맞춰 보면, 진짜 다른 팀이 될 수 있어.', mood:'happy'},
      choices:[
        {text:'참여해 계주 완성도를 높인다', stats:{relay:3, mental:1, stability:1}, relationships:{teammates:6}, status:{fatigue:4}, dialogueSpeaker:'팀원', dialogue:'이 합이면 다음 계주에서 진짜 해볼 만해.', log:'비밀 특훈으로 계주 센스와 팀워크가 크게 상승했습니다.', album:'relay_medal'},
        {text:'오늘은 쉬고 다음에 참여한다', stats:{recovery:1}, status:{condition:3, fatigue:-3}, relationships:{teammates:1}, dialogueSpeaker:'팀원', dialogue:'알겠어. 네 컨디션도 중요하지.', log:'특훈을 미루고 몸 상태를 우선 챙겼습니다.'},
        {text:'개인전 훈련이 더 급하다고 말한다', stats:{topSpeed:1, fighting:1}, relationships:{teammates:-4}, status:{stress:1}, dialogueSpeaker:'팀원', dialogue:'이해는 하지만, 조금 아쉽네.', log:'개인전을 우선하며 팀원들과의 거리가 조금 생겼습니다.'}
      ]
    }
    ,
    {
      when:()=>true,
      title:'반칙 유혹',
      body:'결승 진출권이 걸린 상황을 상상하며 전술 훈련을 하던 중, 코치가 묻습니다. “상대가 먼저 거칠게 나오면 어디까지 허용할 거니?”',
      meta:{speaker:'코치', role:'coach', art:'ice', icon:'⚖️', tag:'인성', quote:'이기는 방법보다 중요한 건, 이긴 뒤에도 부끄럽지 않은가야.', mood:'serious'},
      choices:[
        {text:'반칙성 움직임은 절대 하지 않는다', stats:{sportsmanship:4, integrity:3, stability:1}, status:{fame:2, fan:12}, relationships:{coach:3, friendlyAthlete:2}, dialogueSpeaker:'코치', dialogue:'그래. 깨끗하게 이기는 선수가 오래 기억된다.', log:'페어플레이 원칙을 분명히 하며 스포츠맨십과 인성이 상승했습니다.'},
        {text:'경계선의 몸싸움까지는 훈련한다', stats:{tactics:2, passing:2, sportsmanship:-1}, status:{stress:2}, relationships:{coach:-1, hostileAthlete:2}, dialogueSpeaker:'코치', dialogue:'전술과 반칙 사이의 선을 잊지 마라.', log:'거친 몸싸움 대응을 익혔지만 스포츠맨십이 조금 흔들렸습니다.'},
        {text:'상대가 먼저 하면 똑같이 갚아준다', stats:{fighting:3, passing:1, sportsmanship:-4, integrity:-3}, status:{fame:-2, injuryRisk:5, stress:3}, relationships:{hostileAthlete:5, friendlyAthlete:-3}, dialogueSpeaker:'코치', dialogue:'그 생각은 언젠가 네 커리어를 망칠 수 있어.', log:'보복성 경기 운영을 떠올리며 승부욕은 올랐지만 인성이 크게 하락했습니다.'}
      ]
    },
    {
      when:()=>p.stats.sportsmanship >= 65,
      title:'넘어진 경쟁자를 도울 것인가',
      body:'훈련 레이스 도중 경쟁 선수가 넘어졌습니다. 기록 측정은 계속되고 있지만, 상태가 좋아 보이지 않습니다.',
      meta:{speaker:socialName("friendlyAthlete"), role:'teammate', art:'ice', icon:'🫱', tag:'페어플레이', quote:'괜찮아…? 잠깐만, 발목이 이상한 것 같아.', mood:'soft'},
      choices:[
        {text:'기록을 포기하고 도와준다', stats:{sportsmanship:4, integrity:3, mental:1}, status:{fame:4, fan:25, condition:1}, relationships:{friendlyAthlete:8, coach:3}, dialogueSpeaker:socialName("friendlyAthlete"), dialogue:'고마워. 나였어도 그렇게 할 수 있었을까?', log:'경쟁자를 도우며 페어플레이 이미지가 강해졌습니다.'},
        {text:'코치에게 알리고 훈련은 마저 끝낸다', stats:{sportsmanship:1, tactics:1}, relationships:{coach:1}, dialogueSpeaker:'코치', dialogue:'상황 판단은 나쁘지 않았어. 다음엔 더 빠르게 알려 줘.', log:'코치에게 상황을 알리고 훈련을 마무리했습니다.'},
        {text:'기록 측정이 중요하니 그대로 간다', stats:{fighting:1}, status:{fame:-1, stress:2}, relationships:{friendlyAthlete:-5, coach:-2}, dialogueSpeaker:'코치', dialogue:'기록보다 먼저 봐야 할 것이 있다.', log:'기록을 우선해 주변 선수들과의 관계가 나빠졌습니다.'}
      ]
    },
    {
      when:()=>hasCompetitionExperience(),
      title:'착한 라이벌의 조언',
      body:`${socialName("goodRival")}이 경기 후 조용히 다가와 코너 진입 타이밍에 대한 조언을 건넵니다.`,
      meta:{speaker:socialName("goodRival"), role:'rival', art:'rival', icon:'🤝', tag:'착한 라이벌', quote:'우린 경쟁자지만, 좋은 레이스를 같이 만들 수도 있잖아.', mood:'calm'},
      choices:[
        {text:'고맙게 받아들이고 내 약점도 공유한다', stats:{cornering:2, tactics:1, sportsmanship:2}, relationships:{rival:5, friendlyAthlete:2}, status:{stress:-2}, dialogueSpeaker:socialName("goodRival"), dialogue:'다음엔 더 좋은 레이스가 되겠네.', log:'착한 라이벌과의 건전한 경쟁으로 실력과 스포츠맨십이 상승했습니다.'},
        {text:'조언은 듣지만 내 정보는 숨긴다', stats:{cornering:1, tactics:1}, relationships:{rival:1}, dialogueSpeaker:p.name, dialogue:'고맙지만, 내 카드는 아직 보여줄 수 없어.', log:'라이벌의 조언을 일부 받아들였습니다.'},
        {text:'괜한 간섭이라며 거절한다', stats:{fighting:1}, relationships:{rival:-4}, status:{stress:2}, dialogueSpeaker:socialName("goodRival"), dialogue:'알겠어. 다음엔 빙판 위에서만 얘기하자.', log:'라이벌의 조언을 거절해 관계가 나빠졌습니다.'}
      ]
    },
    {
      when:()=>true,
      title:'나쁜 라이벌의 함정',
      body:`${socialName("badRival")}이 일부러 당신의 훈련 시간을 흐트러뜨리는 소문을 퍼뜨렸습니다.`,
      meta:{speaker:socialName("badRival"), role:'rival', art:'rival', icon:'🦂', tag:'나쁜 라이벌', quote:'멘탈도 실력이잖아? 흔들리면 네 책임이지.', mood:'fire'},
      choices:[
        {text:'공식적으로 문제를 제기한다', stats:{integrity:2, mental:2}, status:{stress:1, fame:2}, relationships:{coach:3, hostileAthlete:-2}, dialogueSpeaker:'코치', dialogue:'정면으로 해결하는 게 가장 깔끔하다.', log:'공식 대응으로 인성과 멘탈이 상승했습니다.'},
        {text:'흔들리지 않고 훈련으로 증명한다', stats:{mental:2, fighting:2}, status:{stress:-1}, dialogueSpeaker:p.name, dialogue:'말보다 기록으로 보여 주면 돼.', log:'소문에 흔들리지 않고 훈련에 집중했습니다.'},
        {text:'똑같이 소문으로 되갚는다', stats:{fighting:2, sportsmanship:-3, integrity:-4}, status:{fame:-4, stress:4}, relationships:{hostileAthlete:6, coach:-4}, dialogueSpeaker:'코치', dialogue:'그건 이기는 게 아니라 같이 무너지는 거다.', log:'보복성 행동으로 인성과 평판이 하락했습니다.'}
      ]
    },
    {
      when:()=>hasUpcomingInternationalCompetition(3) || hasInternationalExperience(),
      title:'적대 국가와의 신경전',
      body:`국제대회에서 ${p.social?.hostileCountry || "상대국"} 선수단과 훈련 시간 배정을 두고 신경전이 벌어졌습니다.`,
      meta:{speaker:'상대국 코치', role:'media', art:'travel', icon:'🌐', tag:'국제 관계', quote:'훈련장 배정은 원칙대로 하면 됩니다.', mood:'serious'},
      choices:[
        {text:'규정을 확인하고 차분히 조정한다', stats:{tactics:2, sportsmanship:2, stability:1}, status:{stress:-2}, relationships:{coach:2}, dialogueSpeaker:'매니저', dialogue:'좋습니다. 국제대회에선 감정 관리가 중요해요.', log:'적대 국가와의 갈등을 규정에 따라 차분히 해결했습니다.'},
        {text:'강하게 항의해 우리 팀 시간을 지킨다', stats:{fighting:2}, status:{stress:2, fame:1}, relationships:{teammates:3, hostileAthlete:3}, dialogueSpeaker:'팀원', dialogue:'든든하긴 한데, 분위기는 더 뜨거워졌어.', log:'강한 항의로 팀원 지지는 얻었지만 긴장감이 높아졌습니다.'},
        {text:'훈련 시간을 양보하고 다른 빙질에서 적응한다', stats:{stability:2, integrity:2}, status:{condition:-1}, relationships:{friendlyAthlete:2}, dialogueSpeaker:'코치', dialogue:'손해처럼 보여도 적응력은 네 자산이 된다.', log:'훈련 시간을 양보하고 다른 환경 적응 능력을 키웠습니다.'}
      ]
    },
    {
      when:()=>romanceAllowed() && p.romance.status==="none" && hasInternationalExperience(),
      title:'이성 선수의 고백',
      body:`원정 대회 후 ${socialName("partner")}이 조심스럽게 마음을 전했습니다. 서로를 응원하는 사이가 되고 싶다고 합니다.`,
      meta:{speaker:socialName("partner"), role:'player', art:'night', icon:'💙', tag:'이성교제', quote:'너랑 이야기하면 대회장 소음이 조금 조용해지는 느낌이야.', mood:'soft'},
      choices:[
        {text:'천천히 알아가 보자고 한다', stats:{mental:1}, status:{stress:-4, condition:2}, relationships:{partner:12}, flags:['romance_started'], dialogueSpeaker:socialName("partner"), dialogue:'고마워. 우리 서로에게 부담이 아니라 힘이 되자.', log:'이성 선수와 조심스럽게 교제를 시작했습니다.', afterEvent:'dating_slow'},
        {text:'지금은 커리어에 집중하고 싶다고 말한다', stats:{mental:2, integrity:1}, status:{stress:-1}, relationships:{partner:2}, dialogueSpeaker:socialName("partner"), dialogue:'솔직하게 말해 줘서 고마워. 네 선택을 응원할게.', log:'고백을 정중히 거절하며 멘탈과 인성이 소폭 상승했습니다.', afterEvent:'romance_declined_good'},
        {text:'애매하게 답하고 거리를 둔다', stats:{}, status:{stress:3}, relationships:{partner:-5, friendlyAthlete:-1}, dialogueSpeaker:socialName("partner"), dialogue:'그렇구나… 조금 헷갈리네.', log:'애매한 태도로 상대에게 상처를 주어 관계가 나빠졌습니다.', afterEvent:'romance_declined_bad'}
      ]
    },
    {
      when:()=>p.romance.status==="dating" && p.romance.weeks>=4,
      title:'연애와 훈련의 균형',
      body:`${p.romance.partnerName}과의 관계가 깊어졌지만, 최근 훈련 집중도에 영향을 주는 것 같다는 이야기가 나옵니다.`,
      meta:{speaker:'코치', role:'coach', art:'training', icon:'💬', tag:'이성교제', quote:'좋은 관계는 힘이 되지만, 중심을 잃으면 부담이 된다.', mood:'serious'},
      choices:[
        {text:'서로의 대회 루틴을 존중하기로 약속한다', stats:{mental:2, integrity:1}, status:{stress:-4, condition:1}, relationships:{partner:6, coach:2}, dialogueSpeaker:p.romance.partnerName, dialogue:'좋아. 서로의 레이스를 지켜 주자.', log:'연애와 훈련의 균형을 잡아 멘탈에 긍정적 영향을 얻었습니다.'},
        {text:'자주 만나며 정서적 안정을 우선한다', stats:{mental:2}, status:{stress:-6, fatigue:2, condition:2}, relationships:{partner:8, coach:-1}, dialogueSpeaker:p.romance.partnerName, dialogue:'네가 웃는 걸 보니 나도 힘이 난다.', log:'관계에서 정서적 안정을 얻었지만 훈련 집중도는 약간 흔들렸습니다.'},
        {text:'대회 전에는 연락을 줄이기로 한다', stats:{tactics:1, mental:1}, status:{stress:2}, relationships:{partner:-3, coach:3}, dialogueSpeaker:p.romance.partnerName, dialogue:'서운하지만, 네 목표를 아니까 이해해 볼게.', log:'대회 집중을 위해 거리 조절을 선택했습니다.'}
      ]
    },
    {
      when:()=>p.romance.status==="dating" && p.romance.weeks>=8 && chance(.45),
      title:'헤어짐의 갈림길',
      body:`서로 바쁜 일정과 원정 생활이 이어지며 ${p.romance.partnerName}과의 관계가 예전 같지 않습니다.`,
      meta:{speaker:p.romance.partnerName || '상대 선수', role:'player', art:'night', icon:'💔', tag:'이성교제', quote:'우리 둘 다 꿈을 향해 달리다 보니, 서로를 놓치고 있는 것 같아.', mood:'serious'},
      choices:[
        {text:'좋은 기억으로 남기고 헤어진다', stats:{mental:2, integrity:2}, status:{stress:3}, relationships:{partner:-8}, flags:['romance_broke_mature'], dialogueSpeaker:p.romance.partnerName, dialogue:'고마웠어. 빙판 위에서는 계속 응원할게.', log:'성숙하게 이별하며 마음은 아팠지만 인성과 멘탈이 성장했습니다.'},
        {text:'관계를 회복하기 위해 대화를 이어 간다', stats:{mental:1, integrity:1}, status:{stress:-2, condition:1}, relationships:{partner:8}, dialogueSpeaker:p.romance.partnerName, dialogue:'다시 맞춰 보자. 이번엔 무리하지 말고.', log:'대화를 통해 관계 회복을 시도했습니다.'},
        {text:'상처를 숨기고 훈련에만 몰두한다', stats:{fighting:3, topSpeed:1}, status:{stress:8, fatigue:4, condition:-3}, relationships:{partner:-12}, flags:['romance_broke_hard'], dialogueSpeaker:p.name, dialogue:'괜찮아. 더 빨라지면 돼.', log:'이별의 상처를 훈련에 쏟아부어 승부욕은 올랐지만 스트레스가 커졌습니다.'}
      ]
    }

    ,
    {
      when:()=>true,
      title:'새벽 훈련장의 혼잣말',
      body:'아무도 없는 새벽 훈련장. 차가운 빙판 위에 혼자 서자, 선수는 조용히 마음속 말을 떠올립니다.',
      meta:{speaker:p.name, role:'player', art:'night', icon:'🌙', tag:'혼잣말', quote:'나는 왜 이 빙판 위에 계속 서 있고 싶은 걸까?', mood:'calm'},
      choices:[
        {text:'“이기는 것보다 제대로 타고 싶어.”', stats:{sportsmanship:2, integrity:2, stability:1}, status:{stress:-2}, dialogueSpeaker:p.name, dialogue:'깨끗하게 타도 충분히 강해질 수 있어.', log:'새벽 훈련장에서 자신의 원칙을 되새기며 인성과 안정성이 성장했습니다.'},
        {text:'“누구보다 빠르게 결승선을 통과하고 싶어.”', stats:{fighting:2, topSpeed:1, acceleration:1}, status:{fatigue:2}, dialogueSpeaker:p.name, dialogue:'목표가 또렷해지니 몸이 먼저 반응하는 것 같아.', log:'혼잣말 속에서 승부욕과 스피드 감각이 올라갔습니다.'},
        {text:'“나 혼자서는 여기까지 못 왔어.”', stats:{mental:1, relay:1, integrity:1}, relationships:{family:2, coach:2, teammates:2}, status:{stress:-1}, dialogueSpeaker:p.name, dialogue:'고마운 사람들을 생각하면 쉽게 무너질 수 없어.', log:'주변 사람들에 대한 고마움을 떠올리며 관계가 좋아졌습니다.'}
      ]
    },
    {
      when:()=>p.condition < 55 || p.fatigue > 55,
      title:'거울 앞의 혼잣말',
      body:'훈련이 끝난 뒤 라커룸 거울에 비친 얼굴이 평소보다 지쳐 보입니다. 선수는 스스로에게 말을 겁니다.',
      meta:{speaker:p.name, role:'player', art:'training', icon:'🪞', tag:'혼잣말', quote:'괜찮다고 말하는 것도 훈련일까, 아니면 멈추라는 신호일까?', mood:'serious'},
      choices:[
        {text:'“오늘은 멈추는 게 맞아.”', stats:{recovery:2, mental:1}, status:{condition:5, fatigue:-8, injuryRisk:-5, stress:-3}, dialogueSpeaker:p.name, dialogue:'쉬는 선택도 도망이 아니야.', log:'자기 몸의 신호를 인정하며 회복과 멘탈이 좋아졌습니다.'},
        {text:'“조금만 더 버티자.”', stats:{fighting:2}, status:{fatigue:5, injuryRisk:4, stress:2}, dialogueSpeaker:p.name, dialogue:'버틸 수는 있어. 다만 대가도 있다는 걸 알아.', log:'스스로를 밀어붙이며 승부욕은 올랐지만 피로와 부상 위험이 커졌습니다.'},
        {text:'“왜 힘든지 먼저 적어 보자.”', stats:{tactics:1, mental:2}, status:{stress:-5}, dialogueSpeaker:p.name, dialogue:'막연한 불안도 글로 쓰면 작아진다.', log:'자기 점검을 통해 멘탈과 전술적 사고가 성장했습니다.'}
      ]
    },
    {
      when:()=>totalMedals()>=1,
      title:'메달을 바라보며',
      body:'방 한쪽에 놓인 메달을 바라보다가, 문득 그 메달이 자신에게 무엇을 의미하는지 생각하게 됩니다.',
      meta:{speaker:p.name, role:'player', art:'victory', icon:'🏅', tag:'혼잣말', quote:'이건 끝이 아니라, 다음 질문이구나.', mood:'happy'},
      choices:[
        {text:'“이 메달은 나만의 것이 아니야.”', stats:{integrity:2, sportsmanship:1, relay:1}, relationships:{family:3, coach:2, teammates:2}, status:{fan:15}, dialogueSpeaker:p.name, dialogue:'함께 만든 메달이라고 생각하니 더 무겁고 소중해.', log:'메달의 의미를 되새기며 인성과 주변 관계가 좋아졌습니다.'},
        {text:'“다음엔 더 높은 곳에 서야 해.”', stats:{fighting:2, mental:1}, status:{stress:2, fame:2}, dialogueSpeaker:p.name, dialogue:'기쁨보다 다음 목표가 먼저 떠올라.', log:'더 높은 목표를 세우며 승부욕과 멘탈이 상승했습니다.'},
        {text:'“이 정도면 충분한 걸까?”', stats:{mental:1, recovery:1}, status:{stress:-3, condition:2}, dialogueSpeaker:p.name, dialogue:'잠깐 만족해도 괜찮아. 다시 시작하면 되니까.', log:'성취를 인정하며 스트레스가 줄었습니다.'}
      ]
    },
    {
      when:()=>p.stats.sportsmanship < 50 || p.stats.integrity < 50,
      title:'양심의 소리',
      body:'최근 경기와 훈련을 돌아보던 중, 마음 한쪽이 불편합니다. 이기는 데만 너무 몰두한 것은 아닐까요?',
      meta:{speaker:p.name, role:'player', art:'night', icon:'🕯️', tag:'혼잣말', quote:'빨라지는 것과 좋은 선수가 되는 건 같은 말일까?', mood:'serious'},
      choices:[
        {text:'“다음 경기부터는 선을 지키자.”', stats:{sportsmanship:4, integrity:3, mental:1}, status:{stress:-2}, relationships:{coach:2, friendlyAthlete:2}, dialogueSpeaker:p.name, dialogue:'늦지 않았어. 다음 선택부터 바꾸면 돼.', log:'자신의 태도를 돌아보며 스포츠맨십과 인성이 크게 성장했습니다.'},
        {text:'“승부의 세계는 원래 냉정해.”', stats:{fighting:2, tactics:1, sportsmanship:-2, integrity:-2}, status:{stress:2, fame:-1}, relationships:{hostileAthlete:2}, dialogueSpeaker:p.name, dialogue:'이렇게 생각하면 편하지만, 마음이 완전히 가볍진 않아.', log:'냉정한 승부관을 택해 승부욕은 올랐지만 인성이 하락했습니다.'},
        {text:'“코치와 솔직히 이야기해 보자.”', stats:{mental:2, integrity:2}, relationships:{coach:5}, status:{stress:-4}, dialogueSpeaker:'코치', dialogue:'이런 고민을 한다는 것 자체가 좋은 선수의 시작이다.', log:'코치와 대화하며 인성과 멘탈이 성장했습니다.'}
      ]
    }

    ,
    {
      id:'technique_slump',
      when:()=>p.fatigue>45 || p.condition<65,
      title:'기술 감각이 흔들리는 날',
      body:'평소에는 자연스럽던 코너 진입과 중심 이동이 어딘가 어색합니다. 훈련량이 쌓이며 자세가 조금 무너진 것 같습니다.',
      meta:{speaker:p.name, role:'player', art:'training', icon:'🧊', tag:'컨디션', quote:'이상해… 같은 동작인데 오늘은 칼날이 밀리는 느낌이야.', expression:'tired'},
      choices:[
        {text:'기초 자세로 돌아가 교정한다', stats:{cornering:-1, stability:1, recovery:1}, status:{fatigue:-3, stress:-2}, dialogueSpeaker:'코치', dialogue:'잠깐 느려져도 괜찮다. 자세가 먼저야.', log:'기초 자세를 교정하며 코너링 감각은 잠시 흔들렸지만 안정성이 좋아졌습니다.'},
        {text:'기록은 포기하고 회복 위주로 전환한다', stats:{topSpeed:-1, stamina:-1, recovery:2}, status:{condition:6, fatigue:-10, injuryRisk:-4, stress:-4}, dialogueSpeaker:p.name, dialogue:'오늘은 욕심내지 않는 게 맞아.', log:'훈련 강도를 낮추며 일부 실전 감각은 떨어졌지만 몸 상태가 회복되었습니다.'},
        {text:'감각이 돌아올 때까지 강행한다', stats:{fighting:1, cornering:-1, stability:-1}, status:{fatigue:7, injuryRisk:8, stress:4}, dialogueSpeaker:'코치', dialogue:'밀어붙이는 건 좋지만, 지금은 위험 신호야.', log:'감각 회복을 위해 강행했지만 자세가 더 흔들리고 부상 위험이 커졌습니다.'}
      ]
    },
    {
      id:'bad_habit_found',
      when:()=>p.stats.passing>35 || p.stats.acceleration>35,
      title:'나쁜 습관 발견',
      body:'영상 분석 중 스타트 후 첫 코너에서 몸이 먼저 안쪽으로 무너지는 습관이 발견되었습니다.',
      meta:{speaker:'코치', role:'coach', art:'training', icon:'📹', tag:'기술 점검', quote:'빠른데, 위험하다. 이 습관은 언젠가 큰 실수로 이어질 수 있어.', expression:'focus'},
      choices:[
        {text:'속도를 낮추고 폼을 리셋한다', stats:{acceleration:-1, cornering:-1, stability:2, sportsmanship:1}, status:{injuryRisk:-5, stress:-2}, dialogueSpeaker:'코치', dialogue:'좋아. 오늘 느려진 만큼 나중에 단단해진다.', log:'폼을 리셋하면서 단기 속도 감각은 떨어졌지만 안정성이 좋아졌습니다.'},
        {text:'대회 전까지만 임시로 유지한다', stats:{tactics:1, stability:-1}, status:{stress:2, injuryRisk:3}, dialogueSpeaker:'코치', dialogue:'임시방편은 오래 쓰면 독이 된다.', log:'나쁜 습관을 잠시 유지해 전술 판단은 했지만 안정성이 낮아졌습니다.'},
        {text:'문제없다고 보고 넘어간다', stats:{acceleration:1, stability:-2, integrity:-1}, status:{injuryRisk:7}, dialogueSpeaker:p.name, dialogue:'지금 당장 느려지는 건 싫어.', log:'문제를 외면해 가속 감각은 유지했지만 안정성과 인성이 하락했습니다.'}
      ]
    },
    {
      id:'minor_illness',
      when:()=>p.fatigue>55 || game.week>REGULAR_WEEKS,
      title:'감기 기운',
      body:'아침부터 목이 칼칼하고 몸이 무겁습니다. 큰 병은 아니지만 이번 주 훈련에 영향을 줄 수 있습니다.',
      meta:{speaker:p.name, role:'player', art:'clinic', icon:'🌡️', tag:'몸 상태', quote:'괜찮다고 하고 싶은데, 몸이 먼저 신호를 보내네.', expression:'tired'},
      choices:[
        {text:'완전히 쉬고 회복한다', stats:{stamina:-1, topSpeed:-1}, status:{condition:9, fatigue:-12, injuryRisk:-5, stress:-5}, dialogueSpeaker:'트레이너', dialogue:'잘했다. 오늘 쉬어서 다음 주를 지킨 거야.', log:'감기 기운 때문에 쉬면서 체력 감각은 조금 떨어졌지만 몸 상태가 회복되었습니다.'},
        {text:'가벼운 기술 훈련만 한다', stats:{tactics:1, stamina:-1}, status:{condition:3, fatigue:-4, stress:-2}, dialogueSpeaker:'코치', dialogue:'오늘은 땀보다 감각만 확인하자.', log:'가벼운 기술 훈련으로 전술 감각은 유지했지만 지구력이 조금 떨어졌습니다.'},
        {text:'중요한 시기라 평소대로 훈련한다', stats:{fighting:1, recovery:-1, stability:-1}, status:{condition:-6, fatigue:8, injuryRisk:5, stress:3}, dialogueSpeaker:'트레이너', dialogue:'그 선택은 몸에 빚을 지는 거야.', log:'감기 기운을 무시하고 훈련해 승부욕은 올랐지만 회복력과 안정성이 떨어졌습니다.'}
      ]
    },
    {
      id:'relationship_stress',
      when:()=>p.relationships.teammates<55 || p.relationships.coach<55 || (p.stress||0)>35,
      title:'관계 스트레스',
      body:'훈련장 분위기가 어딘가 무겁습니다. 사소한 말 한마디가 계속 마음에 남아 집중력이 흐려집니다.',
      meta:{speaker:p.name, role:'player', art:'night', icon:'💭', tag:'관계', quote:'괜찮은 척했는데, 계속 신경 쓰여.', expression:'sad'},
      choices:[
        {text:'먼저 사과하고 대화를 시도한다', stats:{integrity:1, mental:-1}, relationships:{teammates:5, coach:2}, status:{stress:-7}, dialogueSpeaker:'팀원', dialogue:'먼저 말해 줘서 고마워. 우리 다시 맞춰 보자.', log:'대화를 시도해 관계는 좋아졌지만 멘탈이 잠시 흔들렸습니다.'},
        {text:'혼자 시간을 가지며 정리한다', stats:{mental:1, relay:-1}, status:{stress:-4, condition:2}, relationships:{teammates:-1}, dialogueSpeaker:p.name, dialogue:'지금은 조금 떨어져 있어야 다시 볼 수 있을 것 같아.', log:'혼자 마음을 정리하며 스트레스는 줄었지만 팀 호흡이 조금 떨어졌습니다.'},
        {text:'아무 일 없다는 듯 넘긴다', stats:{mental:-1, integrity:-1}, status:{stress:5}, relationships:{teammates:-3, coach:-2}, dialogueSpeaker:p.name, dialogue:'괜찮아. 아니, 괜찮은 척하면 되겠지.', log:'문제를 덮어두면서 스트레스와 관계 문제가 커졌습니다.'}
      ]
    }
  ];

  // 10.2 추가: 기존 이미지 키를 직접 지정해 반복감을 줄이는 장면형 이벤트
  events.push(
    {
      id:'night_ice_test_veteran',
      when:()=>p.age>=20 && (p.stats.tactics>=55 || p.stats.stability>=55),
      title:'비공개 야간 빙질 테스트',
      body:'늦은 밤, 다음 대회장과 비슷한 빙질을 만든 링크에서 짧은 비공개 테스트가 열립니다. 몸을 더 쓰기보다 감각을 읽는 훈련입니다.',
      meta:{speaker:'코치', role:'coach', art:'ice', imageKey:'night_ice_test', icon:'🌌', tag:'노련미', quote:'많이 타는 것보다 정확히 느끼는 게 더 중요할 때가 있다.', expression:'focus'},
      choices:[
        {text:'짧게 타고 빙질 메모를 남긴다', stats:{tactics:2, stability:1}, status:{fatigue:2, condition:1}, dialogueSpeaker:p.name, dialogue:'오늘은 다리가 아니라 머리로 탄 느낌이야.', log:'야간 빙질 테스트에서 전술과 안정성이 올랐습니다.'},
        {text:'한 번 더 전력 질주해 감각을 확인한다', stats:{fighting:2, topSpeed:1}, status:{fatigue:7, injuryRisk:4}, dialogueSpeaker:'코치', dialogue:'좋아. 다만 이건 매주 하면 안 된다.', log:'야간 테스트에서 승부욕과 속도 감각을 확인했습니다.'},
        {text:'후배에게 빙질 대응법을 알려 준다', stats:{relay:1, mental:1, sportsmanship:1}, relationships:{teammates:5}, status:{stress:-2}, dialogueSpeaker:'후배 선수', dialogue:'선배가 말해 주니까 훨씬 이해돼요.', log:'후배에게 경험을 전하며 팀 관계가 좋아졌습니다.'}
      ]
    },
    {
      id:'looking_medal_pressure',
      when:()=>totalMedals()>=2,
      title:'메달을 바라보며',
      body:'방 한쪽에 걸린 메달을 바라보자 기쁨보다 다음 대회에 대한 부담이 먼저 밀려옵니다.',
      meta:{speaker:p.name, role:'player', art:'victory', imageKey:'looking_medal', icon:'🏅', tag:'메달 이후', quote:'이 메달이 나를 증명해 주는 걸까, 아니면 더 무거워지게 하는 걸까?', expression:'soft'},
      choices:[
        {text:'메달을 다시 넣어 두고 루틴으로 돌아간다', stats:{mental:1, stability:1}, status:{stress:-4}, dialogueSpeaker:p.name, dialogue:'어제의 메달보다 오늘의 루틴이 먼저야.', log:'메달 부담을 내려놓고 루틴을 회복했습니다.'},
        {text:'다음 목표를 크게 적어 붙인다', stats:{fighting:2}, status:{stress:2}, dialogueSpeaker:p.name, dialogue:'부담스럽지만, 나는 이걸 원했어.', log:'새 목표를 세우며 승부욕이 올랐습니다.'},
        {text:'가족에게 사진을 보내 마음을 나눈다', stats:{mental:1}, relationships:{family:5}, status:{stress:-3}, dialogueSpeaker:'가족', dialogue:'결과보다 네가 버틴 시간이 자랑스럽다.', log:'가족과 기쁨을 나누며 마음이 안정되었습니다.'}
      ]
    },
    {
      id:'voice_of_conscience_choice',
      when:()=>p.stats.integrity<70 || p.stats.sportsmanship<70 || hasCompetitionExperience(),
      title:'양심의 소리',
      body:'대회 전 훈련 중 애매한 접촉이 있었습니다. 그냥 넘어가면 아무도 모를 수 있지만, 마음 한편이 계속 불편합니다.',
      meta:{speaker:p.name, role:'player', art:'night', imageKey:'voice_of_conscience', icon:'⚖️', tag:'선택', quote:'이 정도는 경기 중에도 흔한 일이라고 넘겨도 되는 걸까?', expression:'serious'},
      choices:[
        {text:'먼저 사과하고 상황을 정리한다', stats:{integrity:2, sportsmanship:2, mental:1}, relationships:{friendlyAthlete:3}, status:{stress:-2}, dialogueSpeaker:'상대 선수', dialogue:'말해 줘서 고마워. 나도 조심할게.', log:'양심에 따라 행동해 인성과 스포츠맨십이 성장했습니다.'},
        {text:'코치에게만 조용히 말한다', stats:{tactics:1, integrity:1}, relationships:{coach:3}, status:{stress:-1}, dialogueSpeaker:'코치', dialogue:'좋아. 이런 판단이 오래 간다.', log:'코치와 상황을 공유하며 판단력을 키웠습니다.'},
        {text:'경기에서는 이런 일도 있다고 넘긴다', stats:{fighting:1, integrity:-2, sportsmanship:-1}, status:{stress:3}, dialogueSpeaker:p.name, dialogue:'모두가 이렇게 하는 거라면…', log:'넘어가기로 했지만 마음의 찝찝함이 남았습니다.'}
      ]
    },
    {
      id:'school_training_conflict_event',
      when:()=>p.age<=18,
      title:'학업과 훈련의 충돌',
      body:'중요한 과제 제출일과 훈련 일정이 겹쳤습니다. 어느 쪽도 완전히 놓치기 어려운 상황입니다.',
      meta:{speaker:'담임교사', role:'coach', art:'family', imageKey:'school_training_conflict', icon:'📚', tag:'성장기', quote:'운동도 중요하지만, 네 생활 전체를 무너뜨리면 안 돼.', expression:'calm'},
      choices:[
        {text:'훈련 시간을 줄이고 과제를 마무리한다', stats:{integrity:1, mental:1}, status:{condition:2, fatigue:-3}, relationships:{family:2}, dialogueSpeaker:p.name, dialogue:'오늘은 균형을 잡아야 해.', log:'학업과 훈련의 균형을 맞추며 마음이 안정되었습니다.'},
        {text:'과제는 최소한으로 하고 훈련에 집중한다', stats:{fighting:2, acceleration:1}, status:{stress:3, fatigue:3}, dialogueSpeaker:p.name, dialogue:'이번 주 기록이 더 중요해.', log:'훈련 집중으로 승부욕이 올랐지만 생활 부담이 커졌습니다.'},
        {text:'코치와 교사에게 일정을 조율해 달라고 요청한다', stats:{tactics:1, integrity:1}, relationships:{coach:3, family:2}, status:{stress:-2}, dialogueSpeaker:'코치', dialogue:'혼자 끌어안지 않은 건 좋은 판단이야.', log:'주변 도움을 받아 일정을 조율했습니다.'}
      ]
    },
    {
      id:'growth_spurt_balance',
      when:()=>p.age<=16,
      title:'성장기 변화',
      body:'키와 근력이 조금씩 변하면서 예전과 같은 자세가 어색해졌습니다. 당장은 답답하지만 새로운 몸에 맞는 주행을 익혀야 합니다.',
      meta:{speaker:'트레이너', role:'clinic', art:'clinic', imageKey:'growth_spurt', icon:'🌱', tag:'성장기', quote:'몸이 변하면 기술도 다시 맞춰야 해. 조급해하지 말자.', expression:'soft'},
      choices:[
        {text:'균형 훈련을 늘린다', stats:{stability:2, cornering:1}, status:{fatigue:2}, dialogueSpeaker:'트레이너', dialogue:'좋아. 지금은 기본 축을 다시 세우는 시기야.', log:'성장기 변화에 맞춰 안정성과 코너링을 다졌습니다.'},
        {text:'순발력 훈련으로 새 힘을 끌어낸다', stats:{fighting:1, acceleration:2}, status:{fatigue:5, injuryRisk:3}, dialogueSpeaker:p.name, dialogue:'몸이 바뀌었으면 더 빠르게 써 봐야지.', log:'성장기 변화 속에서 가속 감각을 끌어냈습니다.'},
        {text:'훈련 강도를 낮추고 적응 기간을 둔다', stats:{recovery:1, mental:1}, status:{condition:5, fatigue:-5, injuryRisk:-4}, dialogueSpeaker:'코치', dialogue:'쉬는 것도 성장의 일부야.', log:'몸의 변화에 적응하며 회복했습니다.'}
      ]
    }
  );

  events.push(
    {
      id:'overtraining_breakdown',
      when:()=>p.fatigue>=72 || p.injuryRisk>=68,
      title:'몸이 먼저 보내는 경고',
      body:'훈련 강도를 계속 올린 탓인지 다리의 반응이 평소보다 둔합니다. 기록은 아직 나쁘지 않지만 몸이 먼저 경고를 보내고 있습니다.',
      meta:{speaker:'트레이너', role:'clinic', art:'clinic', icon:'⚠️', tag:'과훈련', quote:'강해지는 것과 망가지는 것은 한 끗 차이야.', expression:'injured'},
      choices:[
        {text:'즉시 강도를 낮추고 회복한다', stats:{topSpeed:-1,acceleration:-1,recovery:1}, status:{condition:7,fatigue:-12,injuryRisk:-10,stress:-3}, dialogueSpeaker:'트레이너', dialogue:'잘 멈췄어. 지금 잃은 속도감은 다시 찾을 수 있다.', log:'회복을 우선해 속도 감각은 조금 떨어졌지만 부상 위험이 크게 줄었습니다.'},
        {text:'훈련량은 유지하되 기술만 가볍게 한다', stats:{stability:1,stamina:-1}, status:{condition:2,fatigue:-5,injuryRisk:-4}, dialogueSpeaker:'코치', dialogue:'타협안으로는 괜찮다. 다만 다음 주도 몸을 봐야 해.', log:'훈련량을 크게 줄이지 않고 기술 감각을 유지하려 했습니다.'},
        {text:'이번 주만 버티면 된다고 밀어붙인다', stats:{fighting:1,stability:-2,recovery:-1}, status:{condition:-6,fatigue:10,injuryRisk:12,stress:4}, dialogueSpeaker:'코치', dialogue:'그 선택은 대가가 크다. 몸이 버텨 줄 거라고만 믿으면 안 돼.', log:'강행으로 승부욕은 올랐지만 안정성과 회복력이 떨어졌습니다.'}
      ]
    },
    {
      id:'confidence_crack',
      when:()=>p.stress>=45 || p.condition<=45,
      title:'자신감이 흔들리는 밤',
      body:'잠들기 전 오늘 훈련 영상을 돌려 보는데, 자꾸 실수 장면만 눈에 들어옵니다.',
      meta:{speaker:p.name, role:'player', art:'night', icon:'🌙', tag:'부정 이벤트', quote:'나는 정말 좋아지고 있는 걸까?', expression:'sad'},
      choices:[
        {text:'영상 시청을 멈추고 잠을 잔다', stats:{mental:-1,recovery:1}, status:{condition:5,fatigue:-6,stress:-5}, dialogueSpeaker:p.name, dialogue:'오늘은 그만 보자. 내일 다시 타면 돼.', log:'잠을 선택해 회복은 되었지만 멘탈이 잠시 흔들렸습니다.'},
        {text:'실수 원인을 세 가지로 정리한다', stats:{tactics:1,mental:-1,stability:1}, status:{stress:-2}, dialogueSpeaker:p.name, dialogue:'막연한 불안이 문제점으로 바뀌니까 조금 낫다.', log:'실수 원인을 정리하며 전술과 안정성이 조금 올랐습니다.'},
        {text:'분해서 새벽 추가 훈련을 한다', stats:{fighting:1,topSpeed:-1,stability:-1}, status:{fatigue:9,injuryRisk:7,stress:3}, dialogueSpeaker:p.name, dialogue:'가만히 있으면 더 불안해. 그런데 몸이 무겁다.', log:'추가 훈련으로 승부욕은 올랐지만 속도감과 안정성이 떨어졌습니다.'}
      ]
    },
    {
      id:'bad_training_day',
      when:()=>true,
      title:'훈련이 안 풀리는 날',
      body:'이상하게 같은 동작을 반복해도 감각이 맞지 않습니다. 억지로 밀어붙일지, 흐름을 바꿀지 선택해야 합니다.',
      meta:{speaker:'코치', role:'coach', art:'training', icon:'🧊', tag:'부정 이벤트', quote:'안 되는 날을 어떻게 넘기느냐도 선수의 실력이다.', expression:'tired'},
      choices:[
        {text:'오늘 훈련 목표를 낮춘다', stats:{stamina:-1,recovery:1}, status:{condition:4,fatigue:-5,stress:-3}, dialogueSpeaker:'코치', dialogue:'오늘은 낮추는 게 맞다. 대신 내일 다시 쌓자.', log:'목표를 낮추며 지구력 감각은 조금 떨어졌지만 회복되었습니다.'},
        {text:'동작을 쪼개서 천천히 반복한다', stats:{topSpeed:-1,stability:1,tactics:1}, status:{fatigue:2,stress:-1}, dialogueSpeaker:'코치', dialogue:'속도는 줄었지만 동작은 더 명확해졌다.', log:'느린 반복으로 최고속도 감각은 줄었지만 안정성과 전술 이해가 올랐습니다.'},
        {text:'될 때까지 같은 훈련을 반복한다', stats:{fighting:1,mental:-1,cornering:-1}, status:{fatigue:8,injuryRisk:5,stress:5}, dialogueSpeaker:p.name, dialogue:'끝까지 해 보겠어. 그런데 점점 더 굳어지는 느낌이야.', log:'반복 강행으로 승부욕은 올랐지만 멘탈과 코너링 감각이 떨어졌습니다.'}
      ]
    }
  );

  events.push(
    {
      id:'perfect_training_rhythm',
      when:()=>p.lastReadiness && p.lastReadiness.value>=1.18 && !p.injury,
      title:'훈련 리듬이 완벽한 날',
      body:'몸이 가볍고 집중도 잘 됩니다. 컨디션, 피로도, 부상위험, 스트레스가 모두 안정적이라 훈련 흡수력이 좋습니다.',
      meta:{speaker:'코치', role:'coach', art:'training', icon:'✨', tag:'훈련 효율', quote:'오늘 같은 날은 양보다 질로 깊게 새기는 게 좋아.', expression:'happy'},
      choices:[
        {text:'핵심 동작을 반복해 감각을 굳힌다', stats:{stability:1,cornering:1,mental:1}, status:{stress:-2}, dialogueSpeaker:'코치', dialogue:'좋아. 무리하지 않아도 몸이 잘 받아들이고 있어.', log:'좋은 몸 상태를 활용해 훈련 효율이 높아졌습니다.'},
        {text:'기록 측정까지 시도한다', stats:{topSpeed:1,fighting:1}, status:{fatigue:5,injuryRisk:2}, dialogueSpeaker:p.name, dialogue:'오늘은 한 번 재봐도 괜찮을 것 같아.', log:'좋은 흐름을 기록 측정으로 이어 갔습니다.'},
        {text:'좋은 상태를 아끼기 위해 가볍게 마무리한다', stats:{recovery:1,mental:1}, status:{condition:3,fatigue:-4,stress:-3}, dialogueSpeaker:'코치', dialogue:'좋은 컨디션을 오래 가져가는 것도 실력이다.', log:'무리하지 않고 좋은 흐름을 유지했습니다.'}
      ]
    },
    {
      id:'training_absorption_drop',
      when:()=>p.lastReadiness && p.lastReadiness.value<.70,
      title:'훈련이 몸에 들어오지 않는 날',
      body:'컨디션이 좋지 않거나 피로·부상위험·스트레스가 높아 같은 훈련을 해도 효과가 잘 나지 않습니다.',
      meta:{speaker:'트레이너', role:'clinic', art:'clinic', icon:'⚠️', tag:'훈련 효율 저하', quote:'오늘은 더 하는 것보다 왜 안 들어오는지 보는 게 먼저야.', expression:'tired'},
      choices:[
        {text:'훈련을 중단하고 회복 루틴으로 바꾼다', stats:{recovery:1}, status:{condition:6,fatigue:-8,injuryRisk:-6,stress:-5}, dialogueSpeaker:'트레이너', dialogue:'잘 멈췄어. 오늘 멈춘 덕분에 다음 훈련을 살릴 수 있어.', log:'회복 루틴으로 전환해 몸 상태를 되돌렸습니다.'},
        {text:'강도를 낮추고 기본기만 확인한다', stats:{stability:1,topSpeed:-1}, status:{fatigue:-3,injuryRisk:-2}, dialogueSpeaker:'코치', dialogue:'속도는 조금 내려놓고 자세만 보자.', log:'속도 감각은 조금 떨어졌지만 안정성을 지켰습니다.'},
        {text:'그래도 계획대로 밀어붙인다', stats:{fighting:1,stability:-1,recovery:-1}, status:{fatigue:8,injuryRisk:8,stress:5,condition:-4}, dialogueSpeaker:'코치', dialogue:'지금은 정신력만으로 해결할 문제가 아니야.', log:'무리한 강행으로 회복력과 안정성이 떨어졌습니다.'}
      ]
    },
    {
      id:'fan_expectation_pressure',
      when:()=>p.fame>=70 || p.fan>=180,
      title:'팬들의 기대가 부담되는 날',
      body:'팬이 늘어나며 응원도 커졌지만, 동시에 결과를 기대하는 시선도 무겁게 느껴집니다.',
      meta:{speaker:p.name, role:'player', art:'crowd', icon:'📣', tag:'팬·명성', quote:'응원이 힘이 되는데, 가끔은 그 기대가 무섭기도 해.', expression:'sad'},
      choices:[
        {text:'감사 인사를 전하고 루틴에 집중한다', stats:{mental:1,integrity:1}, status:{fan:18,stress:-3}, dialogueSpeaker:'팬', dialogue:'응원할게요. 다치지 말고 오래 타 주세요!', log:'팬들과 건강한 관계를 만들며 멘탈을 지켰습니다.'},
        {text:'결과로만 증명하겠다고 마음먹는다', stats:{fighting:1}, status:{stress:5,fan:5}, dialogueSpeaker:p.name, dialogue:'기대에 답하려면 결국 이겨야 해.', log:'승부욕은 올랐지만 부담도 함께 커졌습니다.'},
        {text:'SNS 반응을 계속 확인한다', stats:{mental:-1,stability:-1}, status:{stress:8,fan:10}, dialogueSpeaker:'코치', dialogue:'반응을 보는 시간이 훈련보다 길어지면 위험해.', log:'팬 반응에 흔들리며 멘탈과 안정성이 낮아졌습니다.'}
      ]
    },
    {
      id:'viral_fairplay_clip',
      when:()=>p.stats.sportsmanship>=75 && p.fan>=50,
      title:'페어플레이 영상 확산',
      body:'경기 후 상대를 배려한 장면이 짧은 영상으로 퍼지며 팬들의 호응을 얻고 있습니다.',
      meta:{speaker:'기자', role:'media', art:'crowd', icon:'🎥', tag:'명성·팬', quote:'기록만큼 태도도 인상적이라는 반응이 많습니다.', expression:'happy'},
      choices:[
        {text:'담담하게 감사 인사를 전한다', stats:{sportsmanship:1,integrity:1}, status:{fame:4,fan:35,stress:-2}, dialogueSpeaker:p.name, dialogue:'좋게 봐 주셔서 감사합니다. 당연히 해야 할 일이었어요.', log:'겸손한 반응으로 명성과 팬이 늘었습니다.'},
        {text:'팀과 코치에게 공을 돌린다', stats:{relay:1,integrity:1}, relationships:{coach:3,teammates:3}, status:{fan:25}, dialogueSpeaker:'코치', dialogue:'좋다. 네가 혼자 빛나려 하지 않아서 더 빛난다.', log:'주변과 공을 나누며 팀 관계가 좋아졌습니다.'},
        {text:'이 흐름을 활용해 홍보를 늘린다', stats:{tactics:1}, status:{fame:6,fan:45,stress:4}, dialogueSpeaker:'매니저', dialogue:'좋은 타이밍이긴 하지만, 훈련 리듬도 잊지 말죠.', log:'명성과 팬은 크게 늘었지만 일정 부담도 커졌습니다.'}
      ]
    }
  );
  events.push(...makeRelationshipBranchEvents());
  events.push(...makeStateStatusBranchEvents());
  events.push(...makeSkillStatBranchEvents());
  return events.filter(e=>!e.when || e.when());
}

function tickEventCooldowns(){
  ensureGameDefaults();
  const state=game.eventState;
  Object.keys(state.cooldowns||{}).forEach(k=>{
    state.cooldowns[k]--;
    if(state.cooldowns[k]<=0) delete state.cooldowns[k];
  });
}
function eventKey(event){
  return event?.id || event?.title || "event";
}
function eventProbability(){
  ensureGameDefaults();
  const p=game.player;
  let prob=RANDOM_EVENT_BASE_CHANCE;
  if((p.stress||0)>=70 || p.fatigue>=80 || p.injuryRisk>=70) prob += 0.04;
  if(hasCompetitionExperience()) prob += 0.02;
  if(getThisWeekCompetitions && getThisWeekCompetitions().length) prob += 0.03;
  if(game.week > REGULAR_WEEKS) prob -= 0.06;
  if(game.eventState.seasonalCount >= RANDOM_EVENT_SEASON_LIMIT) return 0;
  return Math.max(0.05, Math.min(0.24, prob));
}

function isRivalBranchEvent(e){
  const raw = `${e?.title||""} ${e?.body||""} ${e?.meta?.role||""} ${e?.meta?.tag||""} ${e?.meta?.art||""}`;
  return /라이벌|rival/.test(raw);
}
function rivalEventAllowed(e){
  if(!isRivalBranchEvent(e)) return true;
  ensureGameDefaults();
  const state=game.eventState;
  if(state.rivalLastWeek === undefined) state.rivalLastWeek = -99;
  if(state.rivalSeasonCount === undefined) state.rivalSeasonCount = 0;
  // 12.3: 라이벌 이벤트가 너무 자주 나오지 않도록 시즌당 최대 2회, 최소 14주 간격.
  if(state.rivalSeasonCount >= 2) return false;
  if(game.week - state.rivalLastWeek < 14) return false;
  // 라이벌 관계가 매우 낮거나 높을 때만 조금 더 자연스럽게 등장.
  const rel=game.player?.relationships?.rival ?? 0;
  const narrativeNeed = rel>=45 || rel<=-8 || (game.player?.rivalWins||0)+(game.player?.rivalLosses||0)>=2;
  return narrativeNeed ? chance(.42) : chance(.16);
}
function markRivalEventIfNeeded(e){
  if(!isRivalBranchEvent(e)) return;
  const state=game.eventState;
  state.rivalLastWeek=game.week;
  state.rivalSeasonCount=(state.rivalSeasonCount||0)+1;
}

function handleRandomEvent(){
  if(!game) return;
  ensureGameDefaults();
  const state=game.eventState;
  if(game.week - (state.lastWeek ?? -99) < RANDOM_EVENT_MIN_GAP_WEEKS) return;
  if(!chance(eventProbability())) return;
  let pool = makeBranchingEvents();
  pool = pool.filter(e => {
    const key=eventKey(e);
    return !state.cooldowns[key] && !(state.recent||[]).includes(key) && rivalEventAllowed(e);
  });
  if(!pool.length){
    pool = makeBranchingEvents().filter(e=>!state.cooldowns[eventKey(e)] && rivalEventAllowed(e));
  }
  if(!pool.length) return;
  const imagePool = pool.filter(ev=>ev.meta && ev.meta.imageKey);
  if(imagePool.length && chance(.65)) pool=imagePool;
  const e = pick(pool);
  const key=eventKey(e);
  state.lastWeek=game.week;
  state.seasonalCount=(state.seasonalCount||0)+1;
  state.cooldowns[key]=RANDOM_EVENT_COOLDOWN_WEEKS;
  state.recent=[key,...(state.recent||[]).filter(x=>x!==key)].slice(0,RANDOM_EVENT_RECENT_LIMIT);
  markRivalEventIfNeeded(e);
  openEvent(e.title, e.body, e.choices, e.meta || {});
}
function unlockCoachSystem(){
  if(game.flags.coachUnlocked) return;
  game.flags.coachUnlocked=true;
  openEvent("소속팀 제안", "실력이 인정받아 전문 코치와 소속팀 선택지가 열렸습니다.",
    [
      {text:"스피드 코치와 훈련한다", fn:()=>{game.player.coach="스피드 코치";game.player.stats.topSpeed=clamp(game.player.stats.topSpeed+3);addLog("해금","스피드 코치를 선택했습니다.");}},
      {text:"전술 코치와 훈련한다", fn:()=>{game.player.coach="전술 코치";game.player.stats.tactics=clamp(game.player.stats.tactics+3);addLog("해금","전술 코치를 선택했습니다.");}},
      {text:"재활 코치와 훈련한다", fn:()=>{game.player.coach="재활 코치";game.player.stats.recovery=clamp(game.player.stats.recovery+3);addLog("해금","재활 코치를 선택했습니다.");}}
    ]);
}
function finalCareerEnding(){
  const best = calculateEndingScores()[0];
  return best || {title:"완주한 선수", icon:"⛸️", desc:"끝까지 시즌을 완주한 선수", value:0};
}
function finalCareerSummaryHtml(){
  const p=game.player;
  const total=(p.medals.gold||0)+(p.medals.silver||0)+(p.medals.bronze||0);
  const best=finalCareerEnding();
  const bestTimes=["500m","1000m","1500m"].map(ev=>`${ev} ${p.bestTimes?.[ev]?fmtTime(p.bestTimes[ev]):"-"}`).join(" · ");
  return `마지막 시즌: ${seasonLabel()} · ${olympicCycleText()}<br>
    최종 엔딩: ${escapeHtml(best.icon)} <strong>${escapeHtml(best.title)}</strong><br>
    메달 ${total}개(금 ${p.medals.gold||0}, 은 ${p.medals.silver||0}, 동 ${p.medals.bronze||0}) · 올림픽 메달 ${p.olympicMedals||0}개 · 레전드 점수 ${p.score}<br>라이벌 전적: ${p.rivalWins||0}승 ${p.rivalLosses||0}패 · ${escapeHtml(game.rival?.name || "라이벌")}<br>
    개인 최고기록: ${bestTimes}<br>
    <span style="color:#475569">${escapeHtml(best.desc)}</span>`;
}
const AGING_DECLINE_STATS = ["reaction","acceleration","topSpeed","stamina","cornering","passing","stability","recovery","relay","fighting"];
function agingDeclineAmount(age, statValue){
  if(age < 25) return 0;
  let amount = age<=26 ? .35 : age<=28 ? .62 : 0.90;
  if(statValue>=90) amount += .22;
  if(statValue>=97) amount += .18;
  return amount;
}
function applyAgingDecline(){
  ensureGameDefaults();
  const p=game.player;
  if(p.age < 25) return;
  const declined=[];
  AGING_DECLINE_STATS.forEach(stat=>{
    const value=p.stats[stat]||0;
    const amount=agingDeclineAmount(p.age, value);
    if(amount>0){
      p.stats[stat]=clamp(value-amount,1,100);
      if(amount>=.5) declined.push(STAT_LABELS[stat]);
    }
  });
  const veteranBoost = p.age>=25 ? Math.min(5, Math.floor((p.age-24)/2)+1) : 0;
  if(veteranBoost){
    p.stats.tactics=clamp((p.stats.tactics||1)+veteranBoost*.35,1,100);
    p.stats.mental=clamp((p.stats.mental||1)+veteranBoost*.25,1,100);
  }
  if(declined.length){
    addLog("베테랑 시즌 관리", `${p.age}세 시즌을 앞두고 신체 능력 유지가 어려워졌습니다. ${declined.slice(0,5).join(", ")} 관리가 중요합니다. 전술과 멘탈은 경험으로 조금 보완됩니다.`);
  }
}

function finishCareer(){
  ensureGameDefaults();
  game.careerEnded=true;
  game.week=TOTAL_WEEKS+1;
  const best=finalCareerEnding();
  unlockAlbum("legend");
  addLog("커리어 종료", `${seasonLabel()} 시즌 종료와 함께 커리어가 마무리되었습니다. 최종 엔딩: ${best.icon} ${best.title}.`);
  game.lastSpeaker="코치";
  game.lastDialogue=`세 번째 올림픽 시즌까지 달려왔다. 이제 ${game.player.name}의 이야기를 엔딩으로 남기자.`;
  game.scene="podium";
}

function endSeason(){
  const p=game.player;
  const totalMedals=p.medals.gold+p.medals.silver+p.medals.bronze;
  const statValues=Object.values(p.stats).filter(v=>Number.isFinite(Number(v)));
  const avg=statValues.length ? statValues.reduce((a,b)=>a+Number(b),0)/statValues.length : 0;
  let rating="아쉬운 시즌";
  if(p.score>900 || p.medals.gold>=5) rating="전설적인 시즌";
  else if(p.score>600 || p.medals.gold>=2) rating="국가대표급 시즌";
  else if(avg>65 || totalMedals>=3) rating="성장 가능성이 큰 시즌";
  else if(avg>50) rating="평범한 시즌";
  if(p.score>1200) unlockAlbum("legend");
  addLog("시즌 종료", `${seasonLabel()} 시즌 평가: ${rating}`);
  if(isFinalCareerSeason()){
    finishCareer();
  }else{
    game.lastDialogue=`${rating}. 이제 다음 시즌을 준비하자.`;
  }
  render();
}
function nextSeason(){
  ensureGameDefaults();
  if(isCareerEnded() || isFinalCareerSeason()){
    finishCareer();
    render();
    saveGame(false);
    toast("커리어가 종료되었습니다.");
    return;
  }
  const hadAuto = !!game.player.autoSelectedNextSeason;
  game.season++;
  game.seasonStartYear = (game.seasonStartYear || 2026) + 1;
  game.week=1;
  game.player.age++;
  applyAgingDecline();
  game.player.condition=clamp(game.player.condition+20,0,100);
  game.player.fatigue=clamp(game.player.fatigue-35,0,100);
  game.player.injuryRisk=clamp(game.player.injuryRisk-25,0,100);
  game.player.selectionRank1=null;
  game.player.juniorNationalSelected=false;
  game.player.juniorNationalRank=null;
  game.player.substituteStarts=0;
  game.player.officialCompetitionCount=0;
  game.player.internationalCompetitionCount=0;
  game.player.lastOfficialCompetitionWeek=0;
  game.competitionResults={};
  game.opportunities={};
  game.eventState={season:game.season,lastWeek:-99,recent:[],cooldowns:{},seasonalCount:0,rivalLastWeek:-99,rivalSeasonCount:0};
  game.competitionAlerts={};
  if(hadAuto){
    game.player.nationalTeamRank=1;
    game.player.nationalTeamSelected=true;
    game.player.nationalTeamAuto=true;
    game.player.autoSelectedNextSeason=false;
    addLog("새 시즌", `${seasonLabel()} 시즌 시작. 전 시즌 세계선수권 조건 충족으로 국가대표 1위 자동 선발이 확정되었습니다.`);
  }else{
    game.player.nationalTeamRank=null;
    game.player.nationalTeamSelected=false;
    game.player.nationalTeamAuto=false;
    addLog("새 시즌", `${seasonLabel()} 시즌이 시작되었습니다. 초반에는 훈련과 국내대회로 준비하고, 시즌 중반 국가대표 선발전에 도전합니다.`);
  }
  growRivalForNewSeason();
  game.scene="training";
  game.lastSpeaker="코치";
  game.lastDialogue=`${seasonLabel()} 시즌 시작. 바로 선발전이 아니라, 먼저 몸을 만들고 국내대회로 감각을 올리자.`;
  render();
  saveGame(false);
}


function snapshotGameState(){
  ensureGameDefaults();
  const p=game.player;
  return {
    stats:{...p.stats},
    status:{
      condition:p.condition, fatigue:p.fatigue, injuryRisk:p.injuryRisk,
      money:p.money||0, fame:p.fame||0, fan:p.fan||0, stress:p.stress||0, score:p.score||0
    },
    relationships:{...p.relationships},
    progress:{...(p.statProgress||{})},
    romance:{...(p.romance||{})},
    rivalPower:game.rival?.power || 0,
    aftereffects:p.aftereffects ? p.aftereffects.length : 0,
    flags:p.storyFlags ? p.storyFlags.length : 0
  };
}
function formatDelta(v){
  if(v > 0) return `<span class="change-up">+${v}</span>`;
  if(v < 0) return `<span class="change-down">${v}</span>`;
  return `<span class="change-neutral">0</span>`;
}
function collectStateChanges(before, after){
  const changes=[];
  const statusLabels={
    condition:"컨디션", fatigue:"피로도", injuryRisk:"부상 위험",
    money:"자금", fame:"명성", fan:"팬 수", stress:"스트레스", score:"레전드 점수"
  };
  const relLabels={
    coach:"코치 신뢰", rival:"라이벌 관계", family:"가족 지지", teammates:"팀원 호흡",
    friendlyAthlete:"우호 선수", hostileAthlete:"적대 선수", partner:"연애 관계"
  };
  Object.entries(STAT_LABELS).forEach(([k,label])=>{
    const a=before.stats?.[k] ?? 0;
    const b=after.stats?.[k] ?? 0;
    if(a!==b) changes.push({group:"능력치", label, delta:b-a, after:b});
    else {
      const pa=before.progress?.[k] ?? 0;
      const pb=after.progress?.[k] ?? 0;
      const pd=Math.round((pb-pa)*100)/100;
      if(Math.abs(pd)>=0.01) changes.push({group:"성장 게이지", label, delta:pd, after:Math.round(pb*100)/100});
    }
  });
  Object.entries(statusLabels).forEach(([k,label])=>{
    const a=before.status?.[k] ?? 0;
    const b=after.status?.[k] ?? 0;
    if(a!==b) changes.push({group:"상태", label, delta:b-a, after:b});
  });
  Object.entries(relLabels).forEach(([k,label])=>{
    const a=before.relationships?.[k] ?? 0;
    const b=after.relationships?.[k] ?? 0;
    if(a!==b) changes.push({group:"관계", label, delta:b-a, after:b});
  });
  if((before.rivalPower||0)!==(after.rivalPower||0)){
    changes.push({group:"라이벌", label:"라이벌 전력", delta:(after.rivalPower||0)-(before.rivalPower||0), after:after.rivalPower||0});
  }
  if((before.aftereffects||0)!==(after.aftereffects||0)){
    changes.push({group:"부상", label:"후유증", delta:(after.aftereffects||0)-(before.aftereffects||0), after:after.aftereffects||0});
  }
  if((before.flags||0)!==(after.flags||0)){
    changes.push({group:"분기", label:"스토리 플래그", delta:(after.flags||0)-(before.flags||0), after:after.flags||0});
  }
  const romanceBefore=before.romance?.status || "none";
  const romanceAfter=after.romance?.status || "none";
  if(romanceBefore!==romanceAfter){
    changes.push({group:"관계", label:"연애 상태", text:`${romanceBefore==="dating"?"교제 중":"없음"} → ${romanceAfter==="dating"?"교제 중":"없음"}`});
  }
  return changes;
}
function buildChoiceResultHtml(choice, before, after){
  const narrativeOnly = !!choice?.narrativeOnly;
  const changes = narrativeOnly ? [] : collectStateChanges(before, after);
  const resultGroup = choice?.resultGroup || "상태 변화";
  const items = narrativeOnly
    ? `<li><span>${escapeHtml(resultGroup)}</span><strong class="change-neutral">${escapeHtml(choice?.resultNarrative || choice?.log || "선수의 상태가 달라졌습니다.")}</strong></li>`
    : (changes.length
      ? changes.map(c=>{
          if(c.text) return `<li><span>[${escapeHtml(c.group)}] ${escapeHtml(c.label)}</span><strong class="change-neutral">${escapeHtml(c.text)}</strong></li>`;
          return `<li><span>[${escapeHtml(c.group)}] ${escapeHtml(c.label)}</span><strong>${formatDelta(c.delta)} <span class="change-neutral">현재 ${escapeHtml(c.after)}</span></strong></li>`;
        }).join("")
      : `<li><span>수치 변화</span><strong class="change-neutral">눈에 보이는 수치 변화는 없습니다.</strong></li>`);
  const dialogue = choice?.dialogue || game.lastDialogue || "";
  const log = (!narrativeOnly && choice?.log) ? `<div class="choice-note"><strong>결과:</strong> ${escapeHtml(choice.log)}</div>` : "";
  const variation = choice?.variationNote ? `<div class="choice-note"><strong>추가 변동:</strong> ${escapeHtml(choice.variationNote)}</div>` : "";
  const speech = dialogue ? `<div class="choice-note"><strong>${escapeHtml(choice?.dialogueSpeaker || choice?.speaker || game.lastSpeaker || "선수")}:</strong> “${escapeHtml(dialogue)}”</div>` : "";
  return `<div class="choice-result">
    <h3>선택 결과</h3>
    <div><strong>선택:</strong> ${escapeHtml(choice?.text || "선택 완료")}</div>
    ${log}
    ${variation}
    <ul class="change-list">${items}</ul>
    ${speech}
  </div>`;
}
function closeEventAfterResult(){
  document.getElementById("eventModal").classList.remove("open");
  const action = window.afterEventConfirmAction;
  window.afterEventConfirmAction = null;
  render();
  saveGame(false);
  if(typeof action === "function") setTimeout(action, 0);
}

function openEvent(title, body, choices, meta={}){
  document.getElementById("eventTitle").textContent=title;
  document.getElementById("eventBody").innerHTML=buildEventArt(body, {...meta, title});
  document.getElementById("eventChoices").innerHTML=choices.map((c,i)=>`<button class="choice-btn" onclick="chooseEvent(${i})">${escapeHtml(c.text)}</button>`).join("");
  window.currentEventChoices=choices;
  window.currentEventMeta=meta;
  document.getElementById("eventModal").classList.add("open");
}
function chooseEvent(i){
  const c=window.currentEventChoices?.[i];
  const before=snapshotGameState();
  if(c?.fn) c.fn();
  registerNegativeChoice(c);
  applyChoicePayload(c);
  if(c?.afterEvent){ addStoryFlag(c.afterEvent); }
  window.afterEventConfirmAction = c?.afterConfirm || null;
  const after=snapshotGameState();
  const originalBody=document.getElementById("eventBody").innerHTML;
  document.getElementById("eventBody").innerHTML = originalBody + buildChoiceResultHtml(c, before, after);
  document.getElementById("eventChoices").innerHTML = `<button class="choice-btn" onclick="closeEventAfterResult()">확인</button>`;
  render();
  saveGame(false);
}
function unlockAlbum(id){ if(game) game.album[id]=true; }

function addLog(title,text){
  game.logs.unshift({season:game.season,week:game.week,title,text});
  game.logs=game.logs.slice(0,120);
}


function seasonLabel(){
  ensureGameDefaults();
  const y=game.seasonStartYear || 2026;
  return `${y}-${String((y+1)%100).padStart(2,"0")}`;
}
function weekMonthLabel(week){
  const y=game?.seasonStartYear || 2026;
  const months=["4월","4월","4월","4월","5월","5월","5월","5월","6월","6월","6월","6월","7월","7월","7월","7월","8월","8월","8월","8월","9월","9월","9월","9월","9월","10월","10월","10월","10월","11월","11월","11월","11월","12월","12월","12월","12월","1월","1월","1월","1월","2월","2월","2월","2월","3월","3월","3월","3월","3월","3월","3월"];
  const m=months[Math.max(0,Math.min(51,(week||1)-1))] || "3월";
  const year = (["1월","2월","3월"].includes(m)) ? y+1 : y;
  return `${year}년 ${m}`;
}
function isOlympicSeason(){
  ensureGameDefaults();
  // 첫 올림픽 시즌: 2029-30, 이후 4년 주기. 올림픽 시즌은 월드투어 4차까지만 진행.
  return (game.seasonStartYear || 2026) >= FIRST_OLYMPIC_SEASON_START &&
         ((game.seasonStartYear - FIRST_OLYMPIC_SEASON_START) % 4 === 0);
}
function isFinalCareerSeason(){
  ensureGameDefaults();
  return (game.seasonStartYear || 2026) >= FINAL_OLYMPIC_SEASON_START;
}
function isCareerEnded(){
  return !!game?.careerEnded || (game && isFinalCareerSeason() && game.week>TOTAL_WEEKS);
}
function olympicCycleText(){
  const y=game?.seasonStartYear || 2026;
  if(y < FIRST_OLYMPIC_SEASON_START) return `첫 올림픽 시즌: ${FIRST_OLYMPIC_SEASON_START}-${String((FIRST_OLYMPIC_SEASON_START+1)%100).padStart(2,"0")}`;
  const n = Math.floor((y - FIRST_OLYMPIC_SEASON_START)/4) + 1;
  return isOlympicSeason() ? `${n}번째 올림픽 시즌` : `다음 올림픽을 향한 시즌`;
}
function compId(base, week){
  return `${seasonLabel()}_${base}_${week}`;
}
function getSeasonCompetitions(){
  ensureGameDefaults();
  const age=game.player.age;
  const senior=age>=18;
  const comps=[];
  const add=(week, base, name, opts={})=>comps.push({
    id:compId(base,week), base, week, name, events:opts.events||["500m","1000m","1500m"], kind:opts.kind||"race",
    senior:!!opts.senior, international:!!opts.international, requires:opts.requires||null, grade:opts.grade||"국내", desc:opts.desc||""
  });
  if(age<15){
    add(8,"local_youth","지역 유소년 대회",{grade:"지역",events:["500m","1000m","1500m"]});
    add(20,"national_dream","전국 꿈나무 대회",{grade:"전국",events:["500m","1000m","1500m","Relay"]});
    add(32,"winter_regional","동계체전 지역 예선",{grade:"예선",events:["500m","1000m","1500m"]});
    add(44,"winter_middle","전국동계체육대회 중등부",{grade:"전국",events:["500m","1000m","1500m","Relay"]});
  }else if(age<18){
    add(18,"junior_events","전국 종별 쇼트트랙 대회",{grade:"전국",events:["500m","1000m","1500m","Relay"]});
    add(30,"junior_selection","주니어 대표 선발전",{grade:"선발전",events:["500m","1000m","1500m"],kind:"juniorSelection"});
    add(42,"junior_worlds","세계 주니어 선수권",{grade:"국제",events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"juniorNational"});
  }else{
    // 12.7: 시작하자마자 국가대표 선발전을 치르지 않도록 시니어 시즌을 52주 흐름으로 재배치.
    // 초반은 훈련·국내대회로 몸을 만들고, 시즌 중반에 선발전을 치른 뒤 국제대회로 이어집니다.
    add(8,"senior_domestic_open","전국 종별 쇼트트랙 대회",{grade:"전국",senior:true,events:["500m","1000m","1500m","Relay"]});
    add(14,"senior_winter_cup","전국동계체육대회 일반부",{grade:"전국",senior:true,events:["500m","1000m","1500m","Relay"]});
    add(18,"senior_trial1","국가대표 1차 선발전",{grade:"선발전",kind:"seniorTrial1",senior:true,events:["selection"]});
    add(19,"senior_trial2","국가대표 2차 선발전(최종)",{grade:"선발전",kind:"seniorTrial2",senior:true,events:["selection"]});
    if(isOlympicSeason()){
      add(24,"wt1","월드투어 1차",{grade:"국제",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
      add(28,"wt2","월드투어 2차",{grade:"국제",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
      add(32,"wt3","월드투어 3차",{grade:"국제",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
      add(36,"wt4","월드투어 4차",{grade:"국제",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
      add(45,"olympics","동계올림픽",{grade:"올림픽",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
      add(50,"worlds","세계선수권",{grade:"세계선수권",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
    }else{
      add(27,"wt1","월드투어 1차",{grade:"국제",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
      add(30,"wt2","월드투어 2차",{grade:"국제",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
      add(34,"wt3","월드투어 3차",{grade:"국제",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
      add(37,"wt4","월드투어 4차",{grade:"국제",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
      add(43,"wt5","월드투어 5차",{grade:"국제",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
      add(46,"wt6","월드투어 6차",{grade:"국제",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
      add(50,"worlds","세계선수권",{grade:"세계선수권",senior:true,international:true,events:["500m","1000m","1500m","Relay","Mixed Relay"],requires:"seniorTeam"});
    }
  }
  return comps;
}
function getThisWeekCompetitions(){
  return getSeasonCompetitions().filter(c=>c.week===game.week);
}
function getNextCompetition(){
  return getSeasonCompetitions().find(c=>c.week>=game.week) || null;
}
function averageCoreStats(){
  const s=game.player.stats;
  const keys=["reaction","acceleration","topSpeed","stamina","cornering","passing","tactics","mental","stability","fighting","sportsmanship","integrity","relay","recovery"];
  return keys.reduce((sum,k)=>sum+(s[k]||50),0)/keys.length;
}
function averageRecordPotential(events=["500m","1000m","1500m"]){
  return events.reduce((sum,ev)=>{
    const perf=calculatePerformance(ev);
    return sum + eventRecordPotential(ev, perf.score);
  },0)/events.length;
}
function selectionTrialTimeSummary(){
  const events=["500m","1000m","1500m"];
  return events.map(ev=>{
    const perf=calculatePerformance(ev);
    const time=makeTime(ev, perf.score + rand(-3,3), {grade:"선발전"});
    if(!game.player.bestTimes[ev] || time<game.player.bestTimes[ev]) game.player.bestTimes[ev]=time;
    return `${ev} ${fmtTime(time)}`;
  }).join(" · ");
}
function simulateSelectionRank(finalRound){
  const p=game.player;
  let score=averageRecordPotential(["500m","1000m","1500m"]);
  score += p.condition*.05 - p.fatigue*.04 - p.injuryRisk*.025 - (p.stress||0)*.02;
  score += equipmentBonus("race");
  score += rand(-4,4);
  if(p.hidden?.includes("큰 경기 체질")) score+=3;
  if(p.stats.sportsmanship>=75 && p.stats.integrity>=75) score+=1.5;

  // 8.9: 시니어 대표 선발권은 남녀 기준 기록이 시니어 국가대표권에 가까울 때 열립니다.
  let rank;
  if(score>=86.5) rank=Math.round(rand(1,2));        // 국제 메달권
  else if(score>=80.5) rank=Math.round(rand(2,4));   // 개인전 대표권 유력
  else if(score>=74.5) rank=Math.round(rand(4,7));   // 대표팀/계주권
  else if(score>=68.5) rank=Math.round(rand(7,9));   // 예비권
  else if(score>=62.5) rank=Math.round(rand(9,11));
  else rank=Math.round(rand(11,12));

  if(finalRound && p.selectionRank1) rank = Math.round((rank + p.selectionRank1)/2 + rand(-.6,.8));
  return Math.max(1, Math.min(12, rank));
}
function simulateJuniorSelectionRank(){
  const p=game.player;
  let score=averageRecordPotential(["500m","1000m","1500m"]);
  score += p.condition*.05 - p.fatigue*.04 - p.injuryRisk*.025 - (p.stress||0)*.02;
  score += equipmentBonus("race");
  score += rand(-4,4);
  if(p.hidden?.includes("큰 경기 체질")) score+=2.5;

  // 주니어 대표 선발은 주니어 국가대표권 기록에 가까워야 1~3위권.
  let rank;
  if(score>=78.5) rank=Math.round(rand(1,2));
  else if(score>=70.5) rank=Math.round(rand(2,3));
  else if(score>=64.5) rank=Math.round(rand(4,6));
  else if(score>=58.5) rank=Math.round(rand(6,9));
  else rank=Math.round(rand(9,12));
  return Math.max(1, Math.min(12, rank));
}
function seniorTeamRightsText(rank){
  if(rank<=3) return "개인전 전 종목과 남녀계주, 혼성계주까지 전 종목 출전권을 확보했습니다.";
  if(rank<=6) return "남녀계주 중심 대표권을 확보했습니다. 개인전은 1~3위 선수의 포기 시 드물게 차순위 기회를 기다립니다. 혼성계주는 1~3위 중심입니다.";
  if(rank<=8) return "예비 대표권을 확보했습니다. 부상·포기·일정 조정으로 자리가 생기면 선순위로 당겨질 수 있습니다.";
  return "이번 시즌 시니어 국제대회 대표팀 선발에는 실패했습니다.";
}
function runNationalSelection(kind){
  ensureGameDefaults();
  const p=game.player;
  if(p.nationalTeamAuto){
    addLog("국가대표 선발", `${seasonLabel()} 시즌은 전 시즌 세계선수권 자동 선발 조건 충족으로 국가대표 1위가 확정되어 있습니다.`);
    game.lastSpeaker="대표팀 코치";
    game.lastDialogue="지난 세계선수권의 결과가 너를 다시 1번 자리에 세웠다. 이제 시즌을 책임질 차례야.";
    render();
    openSelectionResultPopup("국가대표 자동 선발", 1, "전 시즌 세계선수권 자동 선발 조건 충족으로 국가대표 1위가 확정되었습니다.", "-", levelTimeSummary("seniorNational"));
    saveGame(false); toast("자동 1위 선발 확정"); return;
  }
  if(kind==="seniorTrial1"){
    const rank=simulateSelectionRank(false);
    const times=selectionTrialTimeSummary();
    p.selectionRank1=rank;
    p.condition=clamp(p.condition-6,0,100); p.fatigue=clamp(p.fatigue+12,0,100); p.injuryRisk=clamp(p.injuryRisk+3,0,100);
    const rights="1차 선발전 중간 순위입니다. 다음 주 최종 선발전 결과로 시즌 대표 순위가 결정됩니다.";
    addLog("국가대표 1차 선발전", `1차 선발전 중간 순위 ${rank}위. ${levelTimeSummary("seniorNational")} / 측정 기록: ${times}. 다음 주 최종 선발전 결과로 시즌 대표 순위가 결정됩니다.`);
    game.lastSpeaker="코치"; game.lastDialogue=`1차 ${rank}위. 바로 다음 주가 최종 선발전이야. 지금부터는 회복이 곧 실력이다.`;
    game.scene="race";
    render();
    handlePostCompetitionMentalOutcome({kind:"selection", label:"국가대표 1차 선발전", rank, failed:rank>10, major:true, fullRights:rank<=3});
    openSelectionResultPopup("국가대표 1차 선발전", rank, rights, times, levelTimeSummary("seniorNational"));
    saveGame(false);
    return;
  }else{
    const rank=simulateSelectionRank(true);
    const times=selectionTrialTimeSummary();
    p.nationalTeamRank=rank;
    p.nationalTeamSelected=rank<=8;
    p.nationalTeamAuto=false;
    p.condition=clamp(p.condition-8,0,100); p.fatigue=clamp(p.fatigue+15,0,100); p.injuryRisk=clamp(p.injuryRisk+4,0,100);
    const rights=seniorTeamRightsText(rank);
    if(rank<=3){
      addLog("국가대표 최종 선발전", `최종 ${rank}위로 선발. ${rights} ${levelTimeSummary("seniorNational")} / 측정 기록: ${times}.`);
      game.lastDialogue=`최종 ${rank}위! 이번 시즌 모든 종목 출전권을 손에 넣었다.`;
    }else if(rank<=6){
      addLog("국가대표 최종 선발전", `최종 ${rank}위로 선발. ${rights} ${levelTimeSummary("seniorNational")} / 측정 기록: ${times}.`);
      game.lastDialogue=`최종 ${rank}위. 대표팀에는 들었지만 개인전은 차순위 기회를 노려야 한다.`;
    }else if(rank<=8){
      addLog("국가대표 최종 선발전", `최종 ${rank}위로 예비 대표권 확보. ${rights} ${levelTimeSummary("seniorNational")} / 측정 기록: ${times}.`);
      game.lastDialogue=`최종 ${rank}위. 아직 끝난 게 아니야. 시즌 중 기회가 올 수 있다.`;
    }else{
      addLog("국가대표 최종 선발전", `최종 ${rank}위. ${rights} ${levelTimeSummary("seniorNational")} / 측정 기록: ${times}.`);
      game.lastDialogue=`최종 ${rank}위. 아쉽지만 이번 시즌은 다시 훈련으로 쌓아야 한다.`;
    }
    game.lastSpeaker="코치"; game.scene=rank<=8?"podium":"race";
    const failed = rank>8;
    const label = "국가대표 최종 선발전";
    render();
    handlePostCompetitionMentalOutcome({kind:"selection", label, rank, failed, major:true, fullRights:rank<=3});
    openSelectionResultPopup(label, rank, rights, times, levelTimeSummary("seniorNational"));
    saveGame(false);
    return;
  }
  render(); saveGame(false);
}
function juniorTeamRightsText(rank){
  if(rank<=3) return "개인전 전 종목과 혼성계주 출전권을 확보했습니다. 남녀계주는 팀 사정에 따라 추가 배정될 수 있습니다.";
  if(rank<=5) return "남녀계주 중심 출전권을 확보했습니다. 개인전은 1~3위 선수의 포기 시 차순위 기회를 기다립니다.";
  if(rank===6) return "차순위 예비 대표입니다. 개인전·계주 모두 결원 발생 시 기회가 생길 수 있습니다.";
  return "주니어 세계선수권 대표팀 선발에는 실패했습니다.";
}
function runJuniorSelection(){
  const rank=simulateJuniorSelectionRank();
  game.player.juniorNationalRank = rank;
  game.player.juniorNationalSelected = rank<=6;
  const times=selectionTrialTimeSummary();
  const rights=game.player.juniorNationalSelected ? juniorTeamRightsText(rank) : "주니어 세계선수권 출전권을 얻지 못했습니다.";
  addLog("주니어 대표 선발전", game.player.juniorNationalSelected
    ? `최종 ${rank}위. ${rights} ${levelTimeSummary("juniorNational")} / 측정 기록: ${times}.`
    : `최종 ${rank}위. 주니어 대표 선발 실패. ${rights} ${levelTimeSummary("juniorNational")} / 측정 기록: ${times}.`);
  game.lastSpeaker="코치";
  game.lastDialogue=game.player.juniorNationalSelected ? `최종 ${rank}위. ${rights}` : `최종 ${rank}위. 이번엔 아쉽지만 아직 성장할 시간이 있다.`;
  render();
  handlePostCompetitionMentalOutcome({kind:"selection", label:"주니어 대표 선발전", rank, failed:!game.player.juniorNationalSelected, major:true, fullRights:rank<=3});
  openSelectionResultPopup("주니어 대표 선발전", rank, rights, times, levelTimeSummary("juniorNational"));
  saveGame(false);
}
function isCompetitionEligible(comp){
  const p=game.player;
  if(comp.requires==="juniorNational" && !p.juniorNationalSelected) return {ok:false, reasons:["주니어 대표 선발전 1~6위 안에 들어야 참가 가능"]};
  if(comp.requires==="seniorTeam" && !p.nationalTeamSelected) return {ok:false, reasons:["국가대표 최종 선발전에서 선발되어야 참가 가능"]};
  return {ok:true, reasons:[]};
}
function chanceForRank(rank,event){
  if(rank<=3) return 1;
  const individual=["500m","1000m","1500m"].includes(event);
  if(event==="Relay") return rank<=6 ? 1 : ({7:.20,8:.12}[rank]||0);
  if(event==="Mixed Relay") return 0;
  // 1~3위 선수의 포기/양보는 매우 드물게. 시즌당 한두 경기만 열리도록 별도 캡도 적용.
  if(individual && rank<=6) return ({4:.12,5:.08,6:.05}[rank]||0);
  if(individual && rank<=8) return ({7:.03,8:.02}[rank]||0);
  return 0;
}
function chanceForJuniorRank(rank,event){
  if(rank<=3) return 1; // 주니어 대표 1~3위도 국제대회 전 종목 출전
  const individual=["500m","1000m","1500m"].includes(event);
  if(event==="Relay") return rank<=5 ? 1 : ({6:.18}[rank]||0);
  if(event==="Mixed Relay") return 0;
  if(individual && rank<=5) return ({4:.06,5:.04}[rank]||0);
  if(individual && rank===6) return .02;
  return 0;
}
function juniorOpportunityReason(rank,event,allowed){
  const individual=["500m","1000m","1500m"].includes(event);
  if(rank<=3){
    if(individual || event==="Mixed Relay") return "주니어 대표 1~3위: 개인전 및 혼성계주 출전 가능";
    if(event==="Relay") return allowed ? "주니어 대표 1~3위: 남녀계주 추가 배정" : "주니어 대표 1~3위: 남녀계주는 4~5위 중심 배정";
  }
  if(rank<=5){
    if(event==="Relay") return "주니어 대표 4~5위: 남녀계주 출전 가능";
    return allowed ? `주니어 대표 ${rank}위: 상위 선수 포기로 차순위 출전 기회 발생` : `주니어 대표 ${rank}위: 개인전·혼성계주는 1~3위 중심`;
  }
  if(rank===6){
    return allowed ? "주니어 대표 6위: 결원 발생으로 차순위 출전 기회 발생" : "주니어 대표 6위: 차순위 대기";
  }
  return "주니어 대표 선발권 없음";
}

function getCompetitionOpportunity(comp){
  ensureGameDefaults();
  if(!game.opportunities[comp.id]) game.opportunities[comp.id]={};
  const store=game.opportunities[comp.id];
  const p=game.player;
  comp.events.forEach(ev=>{
    if(ev==="selection") return;
    if(store[ev]) return;
    let allowed=true, reason="";
    const elig=isCompetitionEligible(comp);
    if(!elig.ok){ allowed=false; reason=elig.reasons.join(", "); }
    else if(comp.requires==="juniorNational"){
      const rank=p.juniorNationalRank || 99;
      const prob=chanceForJuniorRank(rank,ev);
      const guaranteed = (rank<=3 && (["500m","1000m","1500m","Mixed Relay"].includes(ev))) || (rank>=4 && rank<=5 && ev==="Relay");
      allowed = guaranteed || (p.substituteStarts<2 && Math.random()<prob);
      if(allowed && !guaranteed && rank>3) p.substituteStarts=(p.substituteStarts||0)+1;
      reason = juniorOpportunityReason(rank, ev, allowed);
      if(allowed && !guaranteed && rank>3) reason += ` · 시즌 차순위 기회 ${p.substituteStarts}/2`;
    }
    else if(comp.senior && comp.international){
      const rank=p.nationalTeamRank || 99;
      const guaranteed = rank<=3 || (rank<=6 && ev==="Relay");
      const prob=chanceForRank(rank,ev);
      allowed = guaranteed || (p.substituteStarts<2 && Math.random()<prob);
      if(allowed && !guaranteed && rank>3) p.substituteStarts=(p.substituteStarts||0)+1;
      if(rank<=3) reason="대표 선발 1~3위: 출전 가능";
      else if(rank<=6 && ev==="Relay") reason="대표 선발 4~6위: 남녀계주 기본 출전 가능";
      else if(allowed) reason=`대표 선발 ${rank}위: 상위 선수 포기/결원으로 차순위 출전 기회 발생 · 시즌 차순위 기회 ${p.substituteStarts}/2`;
      else reason=`대표 선발 ${rank}위: 현재 ${ev} 출전권 없음`;
    }
    store[ev]={allowed, reason};
  });
  return store;
}
function competitionAlreadyEntered(comp,event){
  return !!game.competitionResults?.[comp.id]?.[event];
}
function competitionHasAnyEntry(comp){
  const result = game.competitionResults?.[comp.id] || {};
  return Object.entries(result).some(([key,value]) => key !== "_skipped" && value);
}
function competitionSkipped(comp){
  return !!game.competitionResults?.[comp.id]?._skipped;
}
function markCompetitionEntered(comp,event){
  if(!game.competitionResults[comp.id]) game.competitionResults[comp.id]={};
  game.competitionResults[comp.id][event]=true;
}
function medalText(medal){
  if(medal==="gold") return "금메달";
  if(medal==="silver") return "은메달";
  if(medal==="bronze") return "동메달";
  return "메달 없음";
}
function raceResultChips(res){
  const chips=[
    `<span class="result-chip">최종 ${res.rank}위</span>`,
    `<span class="result-chip">${medalText(res.medal)}</span>`
  ];
  if(res.time!=null) chips.push(`<span class="result-chip">기록 ${fmtTime(res.time)}</span>`);
  return chips.join("");
}
function raceResultCard(res){
  return `<div class="week-result-item competition-result-card">
    <strong>${res.event} 결과: ${res.summary}</strong>
    <div class="competition-result-summary">${raceResultChips(res)}</div>
    <div>${res.logs || "세부 라운드 기록이 없습니다."}</div>
  </div>`;
}
function openCompetitionResultPopup(comp, results=[], note=""){
  const title = comp?.name ? `${comp.name} 결과` : "대회 결과";
  document.getElementById("competitionResultTitle").textContent=title;
  const best = results.length ? [...results].sort((a,b)=>a.rank-b.rank)[0] : null;
  const mood = best?.medal ? "시상대에 오른 경기입니다. 세부 라운드와 기록을 바로 확인하세요." : "대회가 끝났습니다. 순위, 기록, 라운드 흐름을 바로 확인하세요.";
  document.getElementById("competitionResultSummary").innerHTML =
    `<strong>${title}</strong><br>${mood}${note?`<br><span style="color:#475569">${note}</span>`:""}`;
  document.getElementById("competitionResultList").innerHTML = results.length
    ? results.map(raceResultCard).join("")
    : `<div class="week-result-item">표시할 종목 결과가 없습니다.</div>`;
  document.getElementById("competitionResultModal").classList.add("open");
}
function selectionResultCard(title, rank, rights, times, standard){
  return `<div class="week-result-item competition-result-card">
    <strong>${title}: 최종 ${rank}위</strong>
    <div class="competition-result-summary">
      <span class="result-chip">순위 ${rank}위</span>
      <span class="result-chip">${rank<=3?"개인전/혼성계주":rank<=6?"대표권/차순위":"선발 실패"}</span>
    </div>
    <div>${rights}</div>
    <div style="margin-top:7px"><strong>측정 기록</strong><br>${times}</div>
    <div style="margin-top:7px;color:#475569">${standard}</div>
  </div>`;
}
function openSelectionResultPopup(title, rank, rights, times, standard){
  const visuals = buildSelectionVisuals(title, rank);
  document.getElementById("competitionResultTitle").textContent=`${title} 결과`;
  document.getElementById("competitionResultSummary").innerHTML =
    `<strong>${title}</strong><br>선발전 결과와 출전권을 바로 확인하세요.${visuals}`;
  document.getElementById("competitionResultList").innerHTML =
    selectionResultCard(title, rank, rights, times, standard);
  document.getElementById("competitionResultModal").classList.add("open");
}
function closeCompetitionResultModal(){
  document.getElementById("competitionResultModal").classList.remove("open");
}

function enterCompetition(compId,event){
  ensureGameDefaults();
  const comp=getSeasonCompetitions().find(c=>c.id===compId);
  if(!comp || comp.week!==game.week){ toast("이번 주 대회가 아닙니다."); return; }
  if(competitionSkipped(comp)){ toast("이미 이번 대회를 포기했습니다."); return; }
  if(comp.kind==="seniorTrial1" || comp.kind==="seniorTrial2"){
    if(competitionAlreadyEntered(comp,"selection")){ toast("이미 참가한 선발전입니다."); return; }
    try{
      registerOfficialCompetition(comp);
      runNationalSelection(comp.kind);
      markCompetitionEntered(comp,"selection");
      render();
      saveGame(false);
    }catch(err){
      console.error("selection failed", err);
      toast("선발전 결과를 여는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
    return;
  }
  if(comp.kind==="juniorSelection"){
    if(competitionAlreadyEntered(comp,"selection")){ toast("이미 참가한 선발전입니다."); return; }
    try{
      registerOfficialCompetition(comp);
      runJuniorSelection();
      markCompetitionEntered(comp,"selection");
      render();
      saveGame(false);
    }catch(err){
      console.error("junior selection failed", err);
      toast("선발전 결과를 여는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
    return;
  }
  const elig=isCompetitionEligible(comp);
  if(!elig.ok){ toast(elig.reasons[0] || "참가 조건 미충족"); return; }
  const opp=getCompetitionOpportunity(comp)[event];
  if(opp && !opp.allowed){ toast(opp.reason || "출전권 없음"); return; }
  if(competitionAlreadyEntered(comp,event)){ toast("이미 참가한 종목입니다."); return; }
  if(maybeOpenRaceSkillEvent(comp,event)) return;
  registerOfficialCompetition(comp);
  const res=simulateRace(event,"normal", comp);
  markCompetitionEntered(comp,event);
  game.lastSpeaker="코치";
  game.lastDialogue=`${comp.name} ${event} 결과: ${res.summary}`;
  addLog(comp.name, `${event} 참가 완료. ${res.summary}`);
  handlePostCompetitionMentalOutcome({kind:"race", label:`${comp.name} ${event}`, rank:res.rank, medal:res.medal, major:!!comp.international});
  if(comp.base==="worlds" && ["500m","1000m","1500m"].includes(event) && res.medal==="gold" && res.rank===1){
    // 같은 성별 대표팀 내 최고 성적 여부를 간단히 확률화. 금메달이면 대체로 높게 평가.
    const bestInTeam = chance(.72 + Math.max(0,(game.player.nationalTeamRank||8)<=3 ? .18 : 0));
    if(bestInTeam){
      game.player.autoSelectedNextSeason=true;
      addLog("자동 선발 조건 충족", "세계선수권에서 해당 성별 대표팀 최고 성적과 개인전 금메달을 동시에 달성했습니다. 다음 시즌 국가대표 1위 자동 선발권을 확보했습니다.");
      game.lastDialogue="세계선수권 금메달, 그리고 대표팀 내 최고 성적. 다음 시즌 1위 자동 선발 조건을 충족했다!";
    }
  }
  render();
  openCompetitionResultPopup(comp, [res], opp?.reason || "");
  saveGame(false);
}
function skipCompetition(compId){
  const comp=getSeasonCompetitions().find(c=>c.id===compId);
  if(!comp) return;
  if(competitionHasAnyEntry(comp)){ toast("이미 대회에 참가해서 포기할 수 없습니다."); return; }
  if(!game.competitionResults[comp.id]) game.competitionResults[comp.id]={};
  game.competitionResults[comp.id]._skipped=true;
  game.player.condition=clamp(game.player.condition+5,0,100);
  game.player.fatigue=clamp(game.player.fatigue-8,0,100);
  game.player.injuryRisk=clamp(game.player.injuryRisk-4,0,100);
  addLog("대회 포기", `${comp.name} 참가를 포기하고 컨디션 관리에 집중했습니다.`);
  game.lastSpeaker="코치";
  game.lastDialogue="대회를 포기하는 선택도 시즌 운영의 일부다. 중요한 목표에 맞춰 몸을 아끼자.";
  render(); saveGame(false);
}

function competitionAlertKey(){
  return `${seasonLabel()}_${game.week}`;
}
function currentCompetitionAlertInfo(){
  const comps=getThisWeekCompetitions();
  if(!comps.length) return null;
  const lines=comps.map(comp=>{
    const elig=isCompetitionEligible(comp);
    if(!elig.ok){
      return `· ${comp.name}: 참가 불가 - ${elig.reasons.join(", ")}`;
    }
    if(comp.kind==="seniorTrial1" || comp.kind==="seniorTrial2" || comp.kind==="juniorSelection"){
      return `· ${comp.name}: 선발전입니다. 참가하지 않으면 이후 관련 대회 출전권을 얻기 어렵습니다.`;
    }
    const opp=getCompetitionOpportunity(comp);
    const available=comp.events.filter(ev=>opp[ev]?.allowed && !competitionAlreadyEntered(comp,ev));
    if(available.length){
      return `· ${comp.name}: 참가 가능 종목 ${available.join(", ")}`;
    }
    return `· ${comp.name}: 현재 배정된 출전 종목이 없습니다. 상위 선수 포기/결원 발생 시 차순위 기회가 생길 수 있습니다.`;
  });
  return {comps, lines};
}
function hasUnhandledCurrentCompetition(){
  const info=currentCompetitionAlertInfo();
  if(!info) return false;
  return info.comps.some(comp=>{
    if(competitionHasAnyEntry(comp) || competitionSkipped(comp)) return false;
    const elig=isCompetitionEligible(comp);
    if(!elig.ok) return false;
    if(comp.kind==="seniorTrial1" || comp.kind==="seniorTrial2" || comp.kind==="juniorSelection") return true;
    const opp=getCompetitionOpportunity(comp);
    return comp.events.some(ev=>opp[ev]?.allowed);
  });
}
function showCompetitionWeekAlertIfNeeded(force=false){
  if(!game) return;
  ensureGameDefaults();
  const info=currentCompetitionAlertInfo();
  if(!info) return;
  const key=competitionAlertKey();
  if(!force && game.competitionAlerts[key]) return;
  if(!force && document.querySelector(".event-modal.open")) return;
  game.competitionAlerts[key]=true;
  const body = `이번 주에는 공식 대회가 있습니다.<br><br>${info.lines.join("<br>")}<br><br>선발전에서 선발되지 않으면 주니어 세계선수권, 월드투어, 올림픽, 세계선수권처럼 상위 대회에 참가할 수 없습니다.`;
  document.getElementById("eventTitle").textContent="이번 주 대회 알림";
  document.getElementById("eventBody").innerHTML=buildEventArt(body,{title:"이번 주 대회 알림",speaker:"코치",role:"coach",art:"crowd",icon:"🏟️",tag:"대회 알림",quote:"이번 주는 그냥 넘기면 안 되는 주야.",expression:"focus"});
  document.getElementById("eventChoices").innerHTML=`<button class="choice-btn" onclick="closeCompetitionWeekAlert()">대회 카드 확인</button>`;
  document.getElementById("eventModal").classList.add("open");
  saveGame(false);
}
function closeCompetitionWeekAlert(){
  document.getElementById("eventModal").classList.remove("open");
  document.getElementById("competitionPanel")?.scrollIntoView({behavior:"smooth", block:"start"});
}

function renderCompetitionPanel(){
  const panel=document.getElementById("competitionPanel");
  if(!panel || !game) return;
  ensureGameDefaults();
  const comps=getThisWeekCompetitions();
  const next=getNextCompetition();
  let html="";
  if(comps.length){
    html += comps.map(comp=>renderCompetitionCard(comp,true)).join("");
  }else{
    html += `<div class="competition-card"><div class="competition-top"><div><div class="competition-title">이번 주 공식 대회 없음</div><div class="competition-meta">${seasonLabel()} · ${game.week}주 · ${weekMonthLabel(game.week)}</div></div><span class="competition-badge">훈련 주간</span></div>`;
    if(next) html += `<p>다음 대회: <strong>${next.name}</strong> · ${next.week}주(${weekMonthLabel(next.week)})</p>`;
    else html += `<p>이번 시즌 남은 공식 대회가 없습니다. 시즌 마무리와 회복에 집중하세요.</p>`;
    html += `</div>`;
  }
  const schedule=getSeasonCompetitions();
  html += `<div class="competition-card"><div class="competition-title">${seasonLabel()} 시즌 주요 대회</div><div class="competition-meta">초반 국내대회와 시즌 중반 선발전을 거쳐, 올림픽 시즌은 월드투어 4차까지, 비올림픽 시즌은 월드투어 6차까지 진행됩니다.</div><div class="season-schedule">`;
  html += schedule.map(c=>`<div class="season-row ${c.week===game.week?'current':''}"><div class="week">${c.week}주</div><div class="name">${c.name}</div><div class="status">${c.grade}</div></div>`).join("");
  html += `</div></div>`;
  panel.innerHTML=html;
}
function renderCompetitionCard(comp,current){
  const p=game.player;
  const elig=isCompetitionEligible(comp);
  const competitionVisual = buildCompetitionCardVisual(comp);
  let body=`<div class="competition-card ${current?'current':''}"><div class="competition-top"><div><div class="competition-title">${comp.name}</div><div class="competition-meta">${seasonLabel()} · ${comp.week}주 · ${weekMonthLabel(comp.week)} · ${comp.grade}</div></div><span class="competition-badge">${current?'이번 주 대회':'예정'}</span></div>`;
  if(competitionVisual) body += competitionVisual;
  if(comp.kind==="seniorTrial1"){
    const done=competitionHasAnyEntry(comp);
    const disabled=(!current || done || competitionSkipped(comp)) ? "disabled" : "";
    if(p.nationalTeamAuto) body += `<p>전 시즌 세계선수권 자동 선발 조건 충족으로 이번 시즌 국가대표 1위가 확정되어 있습니다.</p><div class="event-button-grid"><button type="button" class="event-chip-btn" onclick="enterCompetition('${comp.id}','selection')" ${!current?'disabled':''}>${current?'자동 선발 확인':'해당 주차에 확인 가능'}</button></div>`;
    else body += `<p>시즌 중반 1차 선발전입니다. 다음 주 최종 선발전과 합산해 시즌 대표 순위가 결정됩니다.</p><div class="event-button-grid"><button type="button" class="event-chip-btn" onclick="enterCompetition('${comp.id}','selection')" ${disabled}>${done?'1차 선발전 참가 완료':current?'1차 선발전 참가':'해당 주차에 참가 가능'}</button></div>`;
  }else if(comp.kind==="seniorTrial2"){
    const done=competitionHasAnyEntry(comp);
    const disabled=(!current || done || competitionSkipped(comp)) ? "disabled" : "";
    if(p.nationalTeamAuto) body += `<p>이미 자동 1위 선발이 확정되어 있습니다.</p>`;
    else body += `<p>시즌 중반 최종 선발전입니다. 여기서 정해진 순위에 따라 이번 시즌 출전 가능한 종목이 달라집니다.</p><div class="event-button-grid"><button type="button" class="event-chip-btn" onclick="enterCompetition('${comp.id}','selection')" ${disabled}>${done?'최종 선발전 참가 완료':current?'최종 선발전 참가':'해당 주차에 참가 가능'}</button></div>`;
  }else if(comp.kind==="juniorSelection"){
    const done=competitionAlreadyEntered(comp,"selection");
    const disabled=(!current || done || competitionSkipped(comp)) ? "disabled" : "";
    body += `<p>세계 주니어 선수권 출전을 위한 선발전입니다.</p><div class="event-button-grid"><button type="button" class="event-chip-btn" onclick="enterCompetition('${comp.id}','selection')" ${disabled}>${done?'선발전 참가 완료':current?'선발전 참가':'해당 주차에 참가 가능'}</button></div>`;
  }else if(!elig.ok){
    body += `<p>참가 불가</p><ul class="reason-list">${elig.reasons.map(r=>`<li>${r}</li>`).join("")}</ul>`;
  }else{
    const opp=getCompetitionOpportunity(comp);
    body += `<p>${comp.desc || "참가 가능한 종목을 선택하세요."}</p><div class="event-button-grid">`;
    body += comp.events.map(ev=>{
      const o=opp[ev] || {allowed:true, reason:"참가 가능"};
      const entered=competitionAlreadyEntered(comp,ev);
      return `<button type="button" class="event-chip-btn" title="${o.reason||''}" onclick="enterCompetition('${comp.id}','${ev}')" ${(!current||!o.allowed||entered)?'disabled':''}>${ev}${entered?' 완료':current?'':' 예정'}</button>`;
    }).join("");
    body += `</div>`;
    const notes=comp.events.map(ev=>opp[ev]?.reason).filter(Boolean);
    if(notes.length) body += `<ul class="reason-list">${[...new Set(notes)].map(n=>`<li>${n}</li>`).join("")}</ul>`;
    const hasEntry = competitionHasAnyEntry(comp);
    const skipped = competitionSkipped(comp);
    body += `<div class="event-button-grid"><button class="event-chip-btn" onclick="skipCompetition('${comp.id}')" ${(hasEntry||skipped)?'disabled':''}>${hasEntry?'이미 참가함':skipped?'대회 포기 완료':'이번 대회 포기/컨디션 관리'}</button></div>`;
  }
  if(p.nationalTeamSelected && comp.senior){
    body += `<p class="competition-meta">현재 대표 순위: ${p.nationalTeamRank}위 · ${p.nationalTeamRank<=3?'전 종목 출전 가능':p.nationalTeamRank<=6?'남녀계주 중심, 개인전은 차순위 기회':p.nationalTeamRank<=8?'예비 대표, 결원 발생 시 기회':'대표팀 미선발'}</p>`;
  }
  body += `</div>`;
  return body;
}

function getSceneVisualInfo(){
  ensureGameDefaults();
  const p=game.player;
  if(p.injury){
    return {sceneClass:"scene clinic", title:"재활실"};
  }
  const sceneType=game.scene||"training";
  if(sceneType==="podium") return {sceneClass:"scene podium", title:"포디움"};
  if(sceneType==="rest") return {sceneClass:"scene rest", title:"라커룸"};
  if(sceneType==="race") {
    const comps=getThisWeekCompetitions();
    const hasSelection=comps.some(comp=>["seniorTrial1","seniorTrial2","juniorSelection"].includes(comp.kind) || /선발전/.test(comp.name));
    if(hasSelection) return {sceneClass:"scene race selection", title:"국가대표 선발전"};
    const hasInternational=comps.some(comp=>comp.international || ["국제","올림픽","세계선수권"].includes(comp.grade));
    if(hasInternational) return {sceneClass:"scene race international", title:"국제대회장"};
    return {sceneClass:"scene race domestic", title:"대회장"};
  }
  if(sceneType==="training") return {sceneClass:"scene training", title:"훈련 링크"};
  return {sceneClass:`scene ${sceneType}`, title:"쇼트트랙 아카데미"};
}


function initMobileMainLayout(){
  const allCards=[...document.querySelectorAll(".game-shell>section>.card")];
  allCards.forEach(card=>{
    if(card.querySelector(".schedule-board")) card.classList.add("mobile-main-schedule");
    if(card.querySelector("#competitionPanel")) card.classList.add("mobile-main-competition");
    if(card.querySelector("#playerName")) card.dataset.mobilePanel="profile";
    if(card.querySelector("#statsBox")) card.dataset.mobilePanel="stats";
    if(card.querySelector("#best500")) card.dataset.mobilePanel="records";
    if(card.querySelector("#moneyValue")) card.dataset.mobilePanel="life";
    if(card.querySelector("#ethicsNetworkGrid")) card.dataset.mobilePanel="ethics";
    if(card.querySelector("#endingPreviewGrid")) card.dataset.mobilePanel="ending";
    if(card.querySelector("#galleryGrid")) card.dataset.mobilePanel="album";
    if(card.querySelector("#logList")) card.dataset.mobilePanel="log";
  });
}
function mobilePanelTitle(type){
  const titles={profile:"선수 프로필",stats:"능력치",records:"기록·메달",life:"생활·명성",ethics:"인성·관계",ending:"엔딩 후보",album:"추억 앨범",log:"진행 로그"};
  return titles[type] || "정보";
}
function openMobilePanel(type){
  initMobileMainLayout();
  const card=document.querySelector(`.game-shell>section>.card[data-mobile-panel="${type}"]`);
  const body=document.getElementById("mobileInfoBody");
  const title=document.getElementById("mobileInfoTitle");
  if(!card || !body || !title){ toast("해당 정보를 찾을 수 없습니다."); return; }
  title.textContent=mobilePanelTitle(type);
  body.innerHTML=card.outerHTML;
  body.querySelectorAll("[id]").forEach(el=>el.removeAttribute("id"));
  document.getElementById("mobileInfoModal").classList.add("open");
}
function closeMobilePanel(){
  document.getElementById("mobileInfoModal").classList.remove("open");
  document.getElementById("mobileInfoBody").innerHTML="";
}

function render(){
  ensureGameDefaults();
  if(!game){
    openNewGameModal();
    populateActivities();
    return;
  }
  const p=game.player;
  document.getElementById("playerName").textContent=p.name;
  document.getElementById("playerMeta").textContent=`${p.gender==="Women"?"여자":"남자"} · ${p.country} · ${p.age}세`;
  document.getElementById("seasonMeta").textContent=`${seasonLabel()} · ${game.season}년 차 · ${game.week>TOTAL_WEEKS?"시즌 종료":game.week+"주"} · ${weekMonthLabel(game.week)}`;
  document.getElementById("skaterProfile").textContent=`${stageLabel()} · ${getProfile()}`;
  document.getElementById("personalityValue").textContent=p.personality.join(" + ");
  document.getElementById("hiddenTraitValue").textContent=p.hidden.join(" / ");
  document.getElementById("rivalValue").textContent=`${game.rival.name} · ${game.rival.typeLabel || "라이벌"} · 전력 ${Math.round(game.rival.power||0)}`;
  document.getElementById("coachValue").textContent=`${p.coach || "기본 코치"} · ${p.team || "개인 훈련"}`;

  document.getElementById("quickCondition").textContent=p.condition;
  document.getElementById("quickFatigue").textContent=p.fatigue;
  document.getElementById("quickInjury").textContent=p.injuryRisk;
  document.getElementById("sceneWeek").textContent=`${game.season}년 차 ${Math.min(game.week,TOTAL_WEEKS)}주`;
  document.getElementById("dialogueName").textContent=game.lastSpeaker || p.name;
  document.getElementById("dialogueText").innerHTML=getMainCardDialogue();

  const scene=document.getElementById("scene");
  const sceneVisual = getSceneVisualInfo();
  scene.className = sceneVisual.sceneClass;
  document.getElementById("sceneTitle").textContent = sceneVisual.title;

  const mood = p.injury?"injured":p.condition<35||p.fatigue>75?"tired":p.condition>75?"happy":"normal";
  const avatar=document.getElementById("avatar");
  const avatarWrap=document.getElementById("avatarWrap");
  avatar.className=`avatar ${mood} ${getSuitClass()}`;
  avatarWrap.className=`avatar-wrap portrait-mode ${mood}`;
  updatePortraitDisplays();

  renderStats();
  renderEthicsNetwork();
  renderCompetitionPanel();
  renderRecords();
  renderLife();
  renderEndingPreview();
  renderAlbum();
  renderLogs();
  renderSeasonEndBox();
  setTimeout(()=>showCompetitionWeekAlertIfNeeded(false), 0);
}

function renderEthicsNetwork(){
  if(!game || !game.player || !document.getElementById("ethicsNetworkGrid")) return;
  ensureGameDefaults();
  const p=game.player;
  const romanceText = p.romance.status==="dating"
    ? `교제 중 · ${p.romance.partnerName || socialName("partner")} · ${p.relationships.partner}`
    : p.romance.cooldown>0 ? `휴식기 · ${p.romance.cooldown}주` : "없음";
  const items = [
    {label:"스포츠맨십", value:`${p.stats.sportsmanship || 0} · ${sportsmanshipLabel(p.stats.sportsmanship||0)}`, tone:ethicsTone(p.stats.sportsmanship||0)},
    {label:"인성", value:`${p.stats.integrity || 0} · ${sportsmanshipLabel(p.stats.integrity||0)}`, tone:ethicsTone(p.stats.integrity||0)},
    {label:"연애 상태", value:romanceText, tone:p.romance.status==="dating"?"good":"warn"},
    {label:"착한 라이벌", value:socialName("goodRival"), tone:"good"},
    {label:"나쁜 라이벌", value:socialName("badRival"), tone:"bad"},
    {label:"우호 선수", value:`${socialName("friendlyAthlete")} · ${p.relationships.friendlyAthlete}`, tone:"good"},
    {label:"적대 선수", value:`${socialName("hostileAthlete")} · ${p.relationships.hostileAthlete}`, tone:"bad"},
    {label:"적대 국가", value:p.social.hostileCountry || "-", tone:"warn"},
    {label:"페어플레이 평판", value:(p.stats.sportsmanship||0)+(p.stats.integrity||0)>=150?"매우 좋음":(p.stats.sportsmanship||0)+(p.stats.integrity||0)<90?"위험":"보통", tone:(p.stats.sportsmanship||0)+(p.stats.integrity||0)>=150?"good":(p.stats.sportsmanship||0)+(p.stats.integrity||0)<90?"bad":"warn"}
  ];
  document.getElementById("ethicsNetworkGrid").innerHTML = items.map(i=>`<div class="ethics-box ${safeClassToken(i.tone)}"><div class="label">${escapeHtml(i.label)}</div><div class="value">${escapeHtml(i.value)}</div></div>`).join("");
}

function renderStats(){
  const p=game.player;
  const statusItems=[
    ["컨디션",p.condition,"good"],
    ["피로도",p.fatigue,p.fatigue>70?"bad":"warn"],
    ["부상 위험",p.injuryRisk,p.injuryRisk>60?"bad":"warn"]
  ];
  const htmlStatus=statusItems.map(([label,val,cls])=>`
    <div class="bar-row">
      <div class="bar-label"><span>${label}</span><span>${val}</span></div>
      <div class="bar-track"><div class="bar-fill ${cls}" style="width:${val}%"></div></div>
    </div>`).join("");
  const htmlStats=Object.entries(STAT_LABELS).map(([key,label])=>{
    const v=p.stats[key]; const g=grade(v);
    return `<div class="bar-row">
      <div class="bar-label"><span>${label}</span><span>${v}<span class="grade ${gradeClass(g)}">${g}</span></span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${v}%"></div></div>
    </div>`;
  }).join("");
  document.getElementById("statsBox").innerHTML=`<div>${htmlStatus}</div><div>${htmlStats}</div>`;
}
function renderRecords(){
  const p=game.player;
  document.getElementById("best500").textContent=fmtTime(p.bestTimes["500m"]);
  document.getElementById("best1000").textContent=fmtTime(p.bestTimes["1000m"]);
  document.getElementById("best1500").textContent=fmtTime(p.bestTimes["1500m"]);
  document.getElementById("bestRelay").textContent=p.bestRelay?`${p.bestRelay.event} ${p.bestRelay.result}`:"-";
  document.getElementById("goldValue").textContent=p.medals.gold;
  document.getElementById("silverValue").textContent=p.medals.silver;
  document.getElementById("bronzeValue").textContent=p.medals.bronze;
  document.getElementById("legendScore").textContent=p.score;
}

function renderLife(){
  const p=game.player;
  document.getElementById("moneyValue").textContent=`${p.money} G`;
  document.getElementById("fameValue").textContent=p.fame;
  document.getElementById("fanValue").textContent=p.fan;
  document.getElementById("stressValue").textContent=p.stress;
  const slots=[...new Set(Object.values(EQUIPMENT).map(e=>e.slot))];
  const eq=slots.map(s=>getEquipped(s)).filter(Boolean);
  document.getElementById("equipmentSummary").innerHTML=eq.map(e=>`<span class="equip-chip">${e.name}</span>`).join("");
  const profileInfo=getProfileDetails();
  let hint=`현재 성장 방향은 <strong>${profileInfo.label}</strong>입니다. <span class="profile-detail">${profileInfo.detail}<br>※ 개인 기록과 대회 결과는 모든 스탯을 반영하되, 종목별 핵심 스탯의 비중이 가장 크게 계산됩니다.<br>※ 연계 효과: 근지구력은 피로 누적, 회복력은 회복·부상위험, 안정성은 사고위험, 멘탈은 스트레스와 부담 이벤트에 영향을 줍니다.<br>※ 이벤트로 떨어진 스탯은 크게 즉시 깎이기보다 하락 게이지로 누적되며, 낮아진 스탯은 훈련으로 더 빨리 회복됩니다.<br>※ 10.9부터 전체 스탯 성장 속도를 추가로 낮췄고, 안정성은 특히 천천히 오릅니다. 승부욕은 실전 감각·결정적 순간 훈련에서 보완됩니다.<br>※ 25세 이후에는 신체 능력 유지가 어려워져 스탯이 조금씩 내려가며, 전술·멘탈을 활용한 노련한 훈련 관리가 중요해집니다.<br>※ 기록은 현실 기준에 맞추되, 종목 핵심 스탯이 최대치에 가까우면 세계신기록에 거의 근접하고 운이 좋으면 경신할 수 있습니다. 올림픽 금메달은 정말 잘 키운 선수에게만 열리도록 난이도를 높였습니다.</span>`;
  if(p.lastReadiness) hint += ` <span class="profile-detail"><strong>최근 훈련 효율:</strong> ${p.lastReadiness.label} (${Math.round(p.lastReadiness.value*100)}%) · ${p.lastReadiness.activity}</span>`;
  if((p.stats.mental||0)<70) hint += ` <span class="profile-detail"><strong>멘탈 성장:</strong> 멘탈은 이제 빠르게 오르지 않고, 반복된 루틴·상담·대회 경험을 통해 천천히 쌓입니다.</span>`;
  if(p.slump) hint += ` <span class="slump-pill">슬럼프 ${Number(p.slump.weeks)||0}주 남음 · ${escapeHtml(p.slump.reason)}</span>`;
  if(p.stress>70) hint += " 스트레스가 높아 이벤트가 나빠질 수 있습니다.";
  else if(p.fame>80) hint += " 명성이 올라 특별 이벤트가 열릴 수 있습니다.";
  else if(p.relationships.teammates>70) hint += " 팀원과의 호흡이 좋아 계주 성적을 기대할 수 있습니다.";
  document.getElementById("storyHint").innerHTML=hint;
}
function endingDiversityBonus(ending, g){
  const p=g.player;
  const s=p.stats||{};
  const bonuses={
    olympic: (p.olympicGold||0)>0 ? 35 : 0,
    olympicMulti: (p.olympicMedals||0)>=3 ? 45 : 0,
    olympicNoGoldLegend: (p.olympicGold||0)===0 && (p.internationalCompetitionCount||0)>=6 ? 35 : 0,
    nationalAce: (p.nationalTeamRank||99)<=3 ? 38 : 0,
    steadyInternational: (p.internationalCompetitionCount||0)>=8 ? 34 : 0,
    rivalChampion: (p.rivalWins||0)>(p.rivalLosses||0) ? 30 : 0,
    eternalRival: Math.min(p.rivalWins||0,p.rivalLosses||0)>=2 ? 42 : 0,
    relayLegend: s.relay>=72 || p.bestRelay ? 38 : 0,
    worldRecord: Math.max(s.topSpeed||0,s.acceleration||0)>=82 ? 32 : 0,
    comeback: g.album?.injury_return || (p.aftereffects?.length||0)>0 ? 46 : 0,
    tactician: (s.tactics||0)>=75 && (s.passing||0)>=65 ? 36 : 0,
    idol: (p.fame||0)>=80 || (p.fan||0)>=120 ? 34 : 0
  };
  return bonuses[ending.id] || 0;
}
function calculateEndingScores(){
  const scored = ENDINGS.map(e=>{
    const raw = Math.max(0, e.score(game) + endingDiversityBonus(e, game));
    // 11.0: 일부 루트가 레전드 점수/메달 총량만으로 독식하지 않도록 완만한 곡선으로 압축.
    const value = Math.round(Math.pow(raw, .92));
    return {...e, value};
  }).sort((a,b)=>b.value-a.value);

  // 후보 화면에서는 너무 한 가지 엔딩만 압도적으로 보이지 않도록 2~4위권을 약간 보정한다.
  // 최종 순위를 뒤집는 강제 랜덤이 아니라, 이미 가까운 후보들을 살리는 표시 보정이다.
  if(scored.length>=4){
    for(let i=1;i<Math.min(5,scored.length);i++){
      const gap=scored[0].value-scored[i].value;
      if(gap>120) scored[i].value += Math.round(Math.min(55, gap*.18));
    }
    scored.sort((a,b)=>b.value-a.value);
  }
  return scored;
}

function endingThumbFor(e){
  const id=e?.id||"";
  if(id==="olympic" || id==="olympicMulti" || id==="olympicNoGoldLegend") return UI_ILLUSTRATIONS.competition.olympics;
  if(id==="nationalAce") return UI_ILLUSTRATIONS.special.selectionSuccess;
  if(id==="steadyInternational" || id==="tactician") return UI_ILLUSTRATIONS.competition.worldTour;
  if(id==="rivalChampion" || id==="eternalRival" || id==="relayLegend" || id==="worldRecord") return UI_ILLUSTRATIONS.competition.worlds;
  if(id==="comeback" || id==="burnout") return UI_ILLUSTRATIONS.special.injury;
  if(id==="taintedAce" || id==="isolatedTalent") return UI_ILLUSTRATIONS.result.noMedal;
  if(id==="idol") return UI_ILLUSTRATIONS.special.legendEnding;
  return UI_ILLUSTRATIONS.special.seasonEnd;
}
function renderEndingPreview(){
  const list=calculateEndingScores().slice(0,4);
  const html=list.map((e,i)=>{
    const thumb=endingThumbFor(e);
    const img=thumb ? `<img class="ending-thumb" src="${thumb}" alt="${e.title} 이미지">` : "";
    return `<div class="ending-box ${i===0?'best':''}">${img}<div class="label">${i===0?'가장 유력':'후보'}</div><div class="value">${e.icon} ${e.title}</div><div class="label" style="margin-top:6px">가능성 ${e.value}</div></div>`;
  }).join("");
  const el=document.getElementById("endingPreviewGrid");
  if(el) el.innerHTML=html;
}

function renderAlbum(){
  document.getElementById("galleryGrid").innerHTML=ALBUM.map(a=>{
    const unlocked=!!game.album[a.id];
    return `<div class="memory ${unlocked?"unlocked":""}"><div class="icon">${unlocked?a.icon:"🔒"}</div><strong>${unlocked?a.title:"미해금"}</strong></div>`;
  }).join("");
}
function renderLogs(){
  document.getElementById("logList").innerHTML=game.logs.length?game.logs.map(l=>`
    <div class="log-item"><strong>${escapeHtml(l.title)}</strong> <span class="log-tag">${Number(l.season)||1}년 ${Number(l.week)||1}주</span><br>${sanitizeLogHtml(l.text)}</div>
  `).join(""):`<div class="log-item">아직 로그가 없습니다.</div>`;
}
function renderSeasonEndBox(){
  const box=document.getElementById("seasonEndBox");
  if(game.week<=TOTAL_WEEKS){ box.classList.add("hidden"); return; }
  const p=game.player;
  const total=p.medals.gold+p.medals.silver+p.medals.bronze;
  box.classList.remove("hidden");
  if(isCareerEnded()){
    box.innerHTML=`${buildSeasonEndVisualBlock(true)}<strong>${escapeHtml(p.name)}의 커리어 종료</strong><br>
      ${finalCareerSummaryHtml()}<br>
      <button class="btn primary" style="margin-top:8px" onclick="openEndingModal()">최종 엔딩 후보 보기</button>
      <button class="btn soft" style="margin-top:8px" onclick="openNewGameModal()">새 선수 시작</button>`;
  }else{
    box.innerHTML=`${buildSeasonEndVisualBlock(false)}<strong>${game.season}년 차 시즌 종료</strong><br>
      ${olympicCycleText()} · 메달 ${total}개 · 레전드 점수 ${p.score} · 현재 유형 ${getProfile()}<br>
      <button class="btn primary" style="margin-top:8px" onclick="nextSeason()">다음 시즌 시작</button>`;
  }
}



function openWeekModal(summary){
  if(!summary) return;
  document.getElementById("weekModalTitle").textContent=summary.title + " 결과";
  const meta = summary.scene==='podium'
    ? {speaker:'코치', role:'coach', art:'victory', icon:'🏅', tag:'주간 리포트', quote:'좋아. 이런 순간을 자주 만들자.', mood:'happy'}
    : summary.scene==='race'
    ? {speaker:'코치', role:'coach', art:'crowd', icon:'🏟️', tag:'주간 리포트', quote:'레이스는 끝났지만, 분석은 지금부터다.', mood:'serious'}
    : summary.scene==='clinic'
    ? {speaker:'트레이너', role:'clinic', art:'clinic', icon:'🩹', tag:'주간 리포트', quote:'회복도 커리어의 일부입니다.', mood:'soft', imageKey:'부상 발생'}
    : summary.scene==='rest'
    ? {speaker:'가족', role:'family', art:'family', icon:'🌿', tag:'주간 리포트', quote:'숨을 고르고 다시 달릴 힘을 모으자.', mood:'soft'}
    : {speaker:'코치', role:'coach', art:'training', icon:'⛸️', tag:'주간 리포트', quote:'한 주의 선택이 선수의 커리어를 만든다.', mood:'calm'};
  document.getElementById("weekModalBody").innerHTML=buildEventArt(game.lastDialogue, meta);
  document.getElementById("weekResultList").innerHTML=
    buildWeekTrainingCards(summary.activities || []) +
    (summary.races?.length?summary.races.map(r=>raceResultCard(r)).join(""):"");
  document.getElementById("weekModal").classList.add("open");
}
function closeWeekModal(){ document.getElementById("weekModal").classList.remove("open"); showCompetitionWeekAlertIfNeeded(false); }
function openShopModal(){ renderShopModal(); document.getElementById("shopModal").classList.add("open"); }
function closeShopModal(){ document.getElementById("shopModal").classList.remove("open"); }
function renderShopModal(){
  ensureGameDefaults();
  document.getElementById("shopMoney").textContent=`${game.player.money} G`;
  const active = Object.entries(game.player.equipment || {}).map(([slot,id])=>{
    const item = EQUIPMENT[id];
    if(!item) return "";
    return `· ${item.name}: ${itemBonusText(item)}`;
  }).filter(Boolean).join("<br>");
  document.getElementById("shopGrid").innerHTML=
    `<div class="shop-active-bonus"><strong>현재 착용 효과</strong><br>${active || "기본 장비만 착용 중입니다."}<br><span style="color:#475569">※ 성장, 경기력, 명성, 안정성, 보호 장비 보정은 실제 게임 계산에 적용됩니다. 단, 상대 선수에 의한 충돌 변수는 완전히 없앨 수 없습니다.</span></div>`+
    Object.entries(EQUIPMENT).map(([id,item])=>{
      const owned=game.player.ownedEquipment.includes(id);
      const equipped=game.player.equipment[item.slot]===id;
      return `<div class="shop-item ${owned?'owned':''}"><strong>${item.name} ${equipped?'✅':''}</strong><div>${item.desc}</div><div class="price">가격: ${item.price} G · 부위: ${item.slot}</div><div class="shop-bonus">${itemBonusText(item)}</div><button class="btn ${owned?'soft':'primary'}" onclick="${owned?`equipItem('${id}')`:`buyItem('${id}')`}">${owned?'착용':'구매'}</button></div>`;
    }).join("");
}
function buyItem(id){
  const item=EQUIPMENT[id];
  if(!item) return;
  if(game.player.ownedEquipment.includes(id)){ equipItem(id); return; }
  if(game.player.money < item.price){ toast("자금이 부족합니다."); return; }
  game.player.money -= item.price;
  game.player.ownedEquipment.push(id);
  equipItem(id);
  addLog("장비 구매", `${item.name}을 구매하고 착용했습니다.`);
  renderShopModal(); render(); saveGame(false);
}
function equipItem(id){
  const item=EQUIPMENT[id]; if(!item) return;
  game.player.equipment[item.slot]=id;
  toast(`${item.name} 착용`);
  renderShopModal(); render(); saveGame(false);
}
function openSocialModal(){ renderSocialModal(); document.getElementById("socialModal").classList.add("open"); }
function closeSocialModal(){ document.getElementById("socialModal").classList.remove("open"); }
function renderSocialModal(){
  ensureGameDefaults();
  const rel=game.player.relationships;
  const data=[['코치 신뢰',rel.coach],[`핵심 라이벌(${game.rival.typeLabel||"라이벌"})`,rel.rival],['가족 지지',rel.family],['팀원 호흡',rel.teammates]];
  document.getElementById("socialModalGrid").innerHTML=data.map(([k,v])=>{
    const width=clamp(Number(v)||0,0,100);
    return `<div class="social-box"><div class="label">${escapeHtml(k)}</div><div class="value">${escapeHtml(relationshipLabel(v))} · ${width}</div><div class="relationship-bar"><span style="width:${width}%"></span></div></div>`;
  }).join("");
  document.getElementById("socialAdvice").innerHTML = rel.coach<35 ? "코치 신뢰가 낮습니다. 전술 훈련이나 상담 이벤트를 통해 회복하세요." : rel.teammates>75 ? "팀원과의 호흡이 좋습니다. 계주 대회에 도전해 보세요." : "관계는 안정적입니다. 일정표에 관리 일정을 섞으면 관계가 좋아집니다.";
}
function openEndingModal(){ renderEndingModal(); document.getElementById("endingModal").classList.add("open"); }
function closeEndingModal(){ document.getElementById("endingModal").classList.remove("open"); }
function renderEndingModal(){
  const list=calculateEndingScores();
  const ended=isCareerEnded();
  const hero = ended ? `<div class="ending-visual-hero">${buildSeasonEndVisualBlock(true)}</div>` : '';
  document.getElementById("endingModalGrid").innerHTML=hero + list.map((e,i)=>`<div class="ending-box ${i===0?'best':''}"><div class="label">${i+1}순위 · ${ended?'최종 점수':'가능성'} ${e.value}</div><div class="value">${e.icon} ${e.title}</div><div class="label" style="margin-top:7px;line-height:1.45">${e.desc}</div></div>`).join("");
}

function helpSections(){
  return [
    ["게임 목표", "국가대표 선발과 국제대회 커리어가 1순위입니다. 올림픽 금메달, 성장 서사, 기록 도전이 그 뒤를 받칩니다."],
    ["시작 나이", "추천은 15세입니다. 12세는 성장 속도가 빠르고, 18세는 시작 능력은 높지만 성장 속도가 느립니다."],
    ["피로·부상", "강훈련을 남발하면 위험하지만, 휴식·재활·컨디션 조절을 섞으면 회복 가능합니다. 다만 쇼트트랙 특성상 내가 잘 타도 상대 선수 접촉으로 넘어지거나 부상을 당할 수 있습니다. 보호 장비는 위험을 낮추지만 완전히 없애지는 못합니다."],
    ["멘탈", "멘탈은 평소보다 선발전·세계선수권·올림픽 같은 큰 대회에서 더 중요하게 반영됩니다."],
    ["국가대표 선발", "1~3위는 개인전과 혼성계주 중심, 4~6위는 남녀계주 중심입니다. 개인전 차순위 기회는 한 시즌에 많아야 한두 번 정도입니다."],
    ["올림픽 시즌", "첫 올림픽은 2029-30, 이후 2033-34, 2037-38입니다. 세 번째 올림픽 시즌이 끝나면 최종 엔딩이 확정됩니다."],
    ["라이벌", "플레이마다 라이벌 성격이 달라집니다. 승패, 선택, 스포츠맨십·인성이 관계와 엔딩에 반영됩니다."],
    ["엔딩", "11.0부터 엔딩 점수 계산을 보정해 올림픽·대표팀·라이벌·계주·기록·부상 극복·전술·스타성 루트가 더 고르게 후보로 올라오도록 조정했습니다."]
  ];
}
function openHelpModal(){
  document.getElementById("helpModalList").innerHTML=helpSections().map(([t,b])=>`<div class="week-result-item"><div class="help-title">${t}</div>${b}</div>`).join("");
  document.getElementById("helpModal").classList.add("open");
}
function closeHelpModal(){ document.getElementById("helpModal").classList.remove("open"); }
function openTutorialModal(){ document.getElementById("tutorialModal").classList.add("open"); }
function closeTutorialModal(){ document.getElementById("tutorialModal").classList.remove("open"); }

function openNewGameModal(){
  document.getElementById("newGameModal").classList.add("open");
  ["newName","newGender","newCountry","newAge","newDifficulty"].forEach(id=>{
    const el=document.getElementById(id);
    if(el && !el.dataset.candidateWatch){
      el.addEventListener("input", invalidateCandidatePreview);
      el.addEventListener("change", invalidateCandidatePreview);
      el.dataset.candidateWatch="1";
    }
  });
  invalidateCandidatePreview();
}
function closeNewGameModal(){ document.getElementById("newGameModal").classList.remove("open"); }
function openSaveModal(){ document.getElementById("saveModal").classList.add("open"); exportSaveCode(); }
function closeSaveModal(){ document.getElementById("saveModal").classList.remove("open"); }

function saveGame(show){
  if(!game){ toast("저장할 게임이 없습니다."); return; }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
  if(show) toast("저장했습니다.");
}
function loadGame(show){
  const raw=localStorage.getItem(STORAGE_KEY);
  if(!raw){ if(show) toast("저장된 게임이 없습니다."); return false; }
  try{
    game=normalizeLoadedGameData(JSON.parse(raw));
    ensureGameDefaults();
    saveGame(false);
    populateActivities();
    render();
    if(show) toast("불러왔습니다.");
    return true;
  }catch(e){ toast("저장 데이터를 불러오지 못했습니다."); return false; }
}
function resetSavedGame(){
  if(confirm("저장 데이터를 삭제할까요?")){
    localStorage.removeItem(STORAGE_KEY);
    toast("저장 데이터를 삭제했습니다.");
  }
}
function exportSaveCode(){
  document.getElementById("saveCodeBox").value = game ? btoa(unescape(encodeURIComponent(JSON.stringify(game)))) : "";
}
function importSaveCode(){
  const code=document.getElementById("saveCodeBox").value.trim();
  if(!code){ toast("저장 코드를 붙여넣어 주세요."); return; }
  try{
    game=normalizeLoadedGameData(JSON.parse(decodeURIComponent(escape(atob(code)))));
    ensureGameDefaults();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
    closeSaveModal();
    populateActivities();
    render();
    toast("저장 코드를 불러왔습니다.");
  }catch(e){ toast("저장 코드 형식이 올바르지 않습니다."); }
}
function toast(msg){
  const el=document.getElementById("toast");
  el.textContent=msg;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>el.classList.remove("show"),1700);
}

document.addEventListener("DOMContentLoaded",()=>{
  populateActivities();
  if(!loadGame(false)) openNewGameModal();
});
