// بيانات نسب النبي محمد ﷺ
const lineage = [
  { id: "muhammad", name: "محمد ﷺ", title: "خاتم الأنبياء", info: "ولد في مكة عام الفيل، وتوفي في المدينة سنة 11 هجرية.", father: "abdullah", mother: "aminah", gender: "male", symbol: "⭐" },
  
  { id: "abdullah", name: "عبد الله", title: "والد النبي ﷺ", info: "توفي وهو شاب قبل ولادة النبي ﷺ أثناء رحلة تجارية إلى الشام.", father: "abdulmuttalib", gender: "male", symbol: "📜" },
  
  { id: "aminah", name: "آمنة", title: "أم النبي ﷺ", info: "بنت وهب من بني زهرة، توفيت عندما كان النبي ﷺ في السادسة من عمره.", father: "wahb", gender: "female", symbol: "📜" },
  
  { id: "abdulmuttalib", name: "عبد المطلب", title: "جد النبي ﷺ لأبيه", info: "اسمه شيبة الحمد، كان سيد قريش وزعيمها، وهو الذي حفر بئر زمزم بعد أن اندثرت.", father: "hashim", gender: "male", symbol: "📜" },
  
  { id: "wahb", name: "وهب", title: "جد النبي ﷺ لأمه", info: "ابن عبد مناف بن زهرة، كان سيد بني زهرة ووجيهًا في قومه.", father: "abdumanaf_zuhri", gender: "male", symbol: "📜" },
  
  { id: "hashim", name: "هاشم", title: "جد النبي ﷺ الثاني", info: "كان من سادات قريش، وإليه تنسب القبيلة الهاشمية، وهو الذي سن رحلتي الشتاء والصيف.", father: "abdumanaf", gender: "male", symbol: "📜" },
  
  { id: "abdumanaf_zuhri", name: "عبد مناف الزهري", title: "أبو وهب", info: "من سادات بني زهرة وأحد أجداد النبي ﷺ من جهة الأم.", father: "zuhrah", gender: "male", symbol: "📜" },
  
  { id: "abdumanaf", name: "عبد مناف", title: "جد النبي ﷺ الثالث", info: "كان من أشراف قريش وساداتها، تولى الحجابة والسقاية والرفادة بعد وفاة والده.", father: "qusai", gender: "male", symbol: "📜" },
  
  { id: "zuhrah", name: "زهرة", title: "جد بني زهرة", info: "جد بني زهرة، وهم أخوال النبي ﷺ، وإليه تنتسب قبيلة بني زهرة.", father: "kilab", gender: "male", symbol: "📜" },
  
  { id: "qusai", name: "قصي", title: "جد النبي ﷺ الرابع", info: "اسمه زيد، وهو الذي جمع قريشًا بعد تفرقهم وأسكنهم في مكة، وكان يلقب بمجمع.", father: "kilab", gender: "male", symbol: "📜" },
  
  { id: "kilab", name: "كلاب", title: "جد النبي ﷺ الخامس", info: "وهو جد مشترك لكل من الأب والأم، حيث تلتقي سلسلة النسب عنده.", father: "murrah", gender: "male", symbol: "📜" },
  
  { id: "murrah", name: "مرة", title: "جد النبي ﷺ السادس", info: "ومن أجداد النبي ﷺ من قريش.", father: "kaab", gender: "male", symbol: "📜" },
  
  { id: "kaab", name: "كعب", title: "جد النبي ﷺ السابع", info: "كان من سادات العرب، وهو أول من سمى يوم الجمعة بيوم العروبة.", father: "luayy", gender: "male", symbol: "📜" },
  
  { id: "luayy", name: "لؤي", title: "جد النبي ﷺ الثامن", info: "وكان من زعماء قريش وأشرافها.", father: "ghalib", gender: "male", symbol: "📜" },
  
  { id: "ghalib", name: "غالب", title: "جد النبي ﷺ التاسع", info: "من أجداد النبي ﷺ من قريش.", father: "fihr", gender: "male", symbol: "📜" },
  
  { id: "fihr", name: "فهر", title: "قريش", info: "وهو المسمى قريشًا، وإليه تنتسب قبيلة قريش.", father: "malik", gender: "male", symbol: "📜" },
  
  { id: "malik", name: "مالك", title: "ابن النضر", info: "من أجداد النبي ﷺ من كنانة.", father: "alnadr", gender: "male", symbol: "📜" },
  
  { id: "alnadr", name: "النضر", title: "ابن كنانة", info: "من سلسلة أجداد النبي ﷺ.", father: "kinanah", gender: "male", symbol: "📜" },
  
  { id: "kinanah", name: "كنانة", title: "ابن خزيمة", info: "وإليه تنتسب قبيلة كنانة.", father: "khuzaymah", gender: "male", symbol: "📜" },
  
  { id: "khuzaymah", name: "خزيمة", title: "ابن مدركة", info: "وكان من كبار زعماء العرب.", father: "mudrikah", gender: "male", symbol: "📜" },
  
  { id: "mudrikah", name: "مدركة", title: "ابن إلياس", info: "من سلسلة أجداد النبي ﷺ.", father: "ilyas", gender: "male", symbol: "📜" },
  
  { id: "ilyas", name: "إلياس", title: "ابن مضر", info: "وكان من أشراف العرب.", father: "mudar", gender: "male", symbol: "📜" },
  
  { id: "mudar", name: "مضر", title: "ابن نزار", info: "وإليه تنتسب قبيلة مضر، وكان يلقب بالحمراء.", father: "nizar", gender: "male", symbol: "📜" },
  
  { id: "nizar", name: "نزار", title: "ابن معد", info: "من سلسلة أجداد النبي ﷺ.", father: "maad", gender: "male", symbol: "📜" },
  
  { id: "maad", name: "معد", title: "ابن عدنان", info: "من سلسلة أجداد النبي ﷺ.", father: "adnan", gender: "male", symbol: "📜" },
  
  { id: "adnan", name: "عدنان", title: "جد العرب العدنانية", info: "وإليه ينتهي نسب النبي ﷺ المتفق عليه. وينتهي نسبه إلى إسماعيل بن إبراهيم عليهما السلام.", gender: "male", symbol: "📜" }
];