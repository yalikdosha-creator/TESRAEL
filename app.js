const M3 = 'Model 3 (כולל Highland)';
const MY = 'Model Y (כולל Juniper)';
const MS = 'Model S';
const MX = 'Model X';
const CT = 'Cybertruck';

function v(material, color, priceDelta, rating, desc) {
  return { material, color, label: `${material} · ${color}`, priceDelta, rating, desc };
}
const DEF_RATING = 4.6;

const BASE_PRODUCTS = [
  { baseId: 'p1', name: 'צלונים לגג הפנורמי', category: 'Sun Protection', models: [M3, MY, MS, CT], price: 89.00, desc: 'צלוני רשת בהתאמה אישית להפחתת חום וסנוור דרך הגג הפנורמי.', rating: 4.7,
    variants: [v('Mesh Fabric','Black',0,4.7,'רשת שחורה קלאסית להפחתת סנוור מרבית.'), v('Mesh Fabric','Gray',0,4.6,'רשת אפורה בהירה המשתלבת עם פנים בהיר.'), v('Reflective Mesh','Silver',10,4.8,'שכבה מחזירת אור משופרת לדחיית חום מוגברת.')] },
  { baseId: 'p2', name: 'צלונים לגג / לשמשה הפנורמית העליונה', category: 'Sun Protection', models: [MX], price: 95.00, desc: 'צלונים בהתאמה אישית לגג הפנורמי ולאזור השמשה העליונה.', rating: 4.7,
    variants: [v('Mesh Fabric','Black',0,4.7,'רשת שחורה מותאמת לזכוכית העליונה של Model X.'), v('Reflective Mesh','Silver',10,4.8,'אפשרות כסופה מחזירת אור לחסימת שמש חזקה יותר.')] },
  { baseId: 'p3', name: 'גגון נשיאה', category: 'Exterior', models: [M3, MY, MS], price: 449.00, desc: 'מערכת גגון חזקה לנשיאת מטען, אופניים וציוד נסיעה.', rating: 4.8,
    variants: [v('Aluminum','Matte Black',0,4.8,'מוטות רוחב מאלומיניום שחור מט קל משקל.'), v('Aluminum','Silver',0,4.7,'גימור אלומיניום כסוף למראה נקי דמוי מקורי.')] },
  { baseId: 'p4', name: 'גגון נשיאה / מוטות רוחב', category: 'Exterior', models: [CT], price: 499.00, desc: 'גגון ומוטות רוחב חזקים במיוחד לנשיאת ציוד על ה-Cybertruck.', rating: 4.8,
    variants: [v('Steel','Black',0,4.8,'מוטות רוחב מפלדה שחורה מחוספסת לעומסים כבדים.'), v('Aluminum','Matte Black',20,4.7,'אפשרות אלומיניום קלה יותר בגימור שחור מט.')] },
  { baseId: 'p5', name: 'מגן שמש לשמשה הקדמית', category: 'Sun Protection', models: [M3, MY, MS, MX, CT], price: 39.00, desc: 'צלון מתקפל מחזיר אור לשמירה על תא נוסעים קריר יותר בחניה.', rating: 4.6,
    variants: [v('Reflective Foil','Silver',0,4.6,'ציפוי כסוף מחזיר אור סטנדרטי לדחיית חום.'), v('Reflective Foil','Black/Silver',5,4.7,'עיצוב דו-גוני עם צד פנימי שחור.')] },
  { baseId: 'p6', name: 'מגירות ארגון לקונסולה המרכזית', category: 'Storage', models: [M3, MY, MS, MX, CT], price: 29.00, desc: 'מגשים עם תאים מרובים לארגון מסודר של פריטים בקונסולה המרכזית.', rating: 4.5,
    variants: [v('ABS Plastic','Black',0,4.5,'מגש ABS שחור קשיח עם תאים מרובים.'), v('Silicone Lined','Black',4,4.6,'מגש ABS עם בטנת סיליקון להפחתת רעשים.')] },
  { baseId: 'p7', name: 'מתאמים למחזיקי כוסות', category: 'Interior', models: [M3, MY, MS, MX, CT], price: 19.00, desc: 'תוספות סיליקון נגד החלקה לייצוב כוסות והפחתת נשפכים.', rating: 4.5,
    variants: [v('Silicone','Black',0,4.5,'תוספות סיליקון שחורות קלאסיות.'), v('Silicone','Gray',0,4.4,'סיליקון אפור להתאמה לפנים בהיר.'), v('Silicone','White',0,4.4,'סיליקון לבן לנגיעה בהירה.')] },
  { baseId: 'p8', name: 'תא אחסון נסתר למשענת היד', category: 'Storage', models: [M3, MY, MS, MX], price: 34.00, desc: 'תא אחסון דיסקרטי המותאם לתוך משענת היד.', rating: 4.4,
    variants: [v('ABS Plastic','Black',0,4.4,'תא אחסון נסתר מפלסטיק ABS שחור ועמיד.'), v('Flocked ABS','Black',5,4.6,'גימור פנימי פלוק למגע רך ושקט יותר.')] },
  { baseId: 'p9', name: 'תא אחסון מתחת למסך המרכזי', category: 'Storage', models: [M3, MY], price: 24.00, desc: 'מגש נוח מתחת למסך לפריטים קטנים לשימוש יומיומי.', rating: 4.5,
    variants: [v('ABS Plastic','Black',0,4.5,'מגש שחור סטנדרטי מתחת למסך.'), v('Silicone','Black',3,4.6,'מגש סיליקון רך עם משטח נגד החלקה.')] },
  { baseId: 'p10', name: 'תאי אחסון מתחת למושבים הקדמיים', category: 'Storage', models: [M3, MY], price: 59.00, desc: 'קופסאות אחסון נמוכות המיועדות להתאמה מתחת למושבים הקדמיים.', rating: 4.5,
    variants: [v('TPE','Black',0,4.5,'קופסאות TPE שחורות גמישות, קלות לניקוי.'), v('ABS Plastic','Black',6,4.6,'קופסאות ABS קשיחות עם תאים מובנים.')] },
  { baseId: 'p11', name: 'תאי אחסון מתחת למושבים האחוריים', category: 'Storage', models: [CT], price: 64.00, desc: 'תאי אחסון המיועדים לאזור שמתחת לספסל האחורי.', rating: 4.6,
    variants: [v('TPE','Black',0,4.6,'תאי TPE שחורים עמידים לאחסון מתחת למושב האחורי.'), v('ABS Plastic','Black',6,4.5,'תאי ABS קשיחים עם חלוקה מוגדרת.')] },
  { baseId: 'p12', name: 'ארגונית לתא הכפפות', category: 'Storage', models: [M3, MY, MS, MX], price: 22.00, desc: 'מארגן מחולק לשמירה על סדר במסמכים ואביזרים בתא הכפפות.', rating: 4.4,
    variants: [v('ABS Plastic','Black',0,4.4,'מארגן ABS שחור עם מחיצות.'), v('Felt Lined','Black',4,4.5,'מארגן מרופד לבד לאחסון שקט יותר.')] },
  { baseId: 'p13', name: 'תאי אחסון לגומחות הצדדיות בתא המטען', category: 'Storage', models: [M3, MY, MS], price: 49.00, desc: 'תאים עמידים המנצלים את החללים הצדדיים בתא המטען לאחסון מסודר נוסף.', rating: 4.6,
    variants: [v('TPE','Black',0,4.6,'תאי צד TPE שחורים גמישים.'), v('Felt','Black',8,4.5,'תאי לבד איכותיים בגימור רך.')] },
  { baseId: 'p14', name: 'ארגונית מתקפלת לתא המטען', category: 'Storage', models: [M3, MY, MS, MX], price: 45.00, desc: 'מארגן מתקפל עם תאים לקיבוע קניות וציוד בתא המטען.', rating: 4.6,
    variants: [v('Oxford Fabric','Black',0,4.6,'מארגן מבד אוקספורד שחור ועמיד.'), v('Oxford Fabric','Gray',0,4.5,'מארגן בד אפור עם גימור כהה.')] },
  { baseId: 'p15', name: 'ארגונית מתקפלת לארגז האחורי / תא המטען', category: 'Storage', models: [CT], price: 55.00, desc: 'מארגן מתקפל לקיבוע פריטים בארגז המטען או בתא המטען.', rating: 4.6,
    variants: [v('Heavy-Duty Fabric','Black',0,4.6,'בד שחור מחוזק לשימוש בארגז/תא המטען.'), v('Heavy-Duty Fabric','Gray',0,4.5,'בד אפור מחוזק עם תפירה חסינה.')] },
  { baseId: 'p16', name: 'וו תלייה לשקיות קניות בתא המטען', category: 'Storage', models: [M3], price: 12.00, desc: 'וו פשוט לשמירה על שקיות קניות זקופות בזמן נסיעה.', rating: 4.3,
    variants: [v('ABS Plastic','Black',0,4.3,'וו פלסטיק שחור פשוט.'), v('Metal','Black',3,4.5,'וו מתכת חזק יותר בציפוי שחור.')] },
  { baseId: 'p17', name: 'פח אשפה לדלת או לקונסולה', category: 'Interior', models: [M3, MY, MS, MX], price: 18.00, desc: 'פח אשפה קומפקטי המתחבר לכיס הדלת או לאזור הקונסולה.', rating: 4.3,
    variants: [v('ABS Plastic','Black',0,4.3,'פח אשפה פלסטיק שחור קומפקטי.'), v('Silicone','Black',4,4.4,'פח אשפה סיליקון מתקפל.')] },
  { baseId: 'p18', name: 'פח אשפה לקונסולה', category: 'Interior', models: [CT], price: 18.00, desc: 'פח אשפה קומפקטי המיועד להתאמה באזור הקונסולה המרכזית.', rating: 4.3,
    variants: [v('ABS Plastic','Black',0,4.3,'פח אשפה פלסטיק שחור המותאם לקונסולה.'), v('Silicone','Black',4,4.4,'פח אשפה סיליקון גמיש לקונסולה.')] },
  { baseId: 'p19', name: 'שטיחי גומי תלת-ממדיים (לתא הנוסעים, לבגאז׳ ול-Frunk)', category: 'Interior Protection', models: [M3, MS, MX], price: 189.00, desc: 'שטיחי 3D לכל מזג אוויר בכיסוי מלא לתא הנוסעים, תא המטען והתא הקדמי.', rating: 4.8,
    variants: [v('TPE','Black',0,4.8,'שטיחי TPE שחורים עמידים לכל מזג אוויר.'), v('TPE','Gray',10,4.7,'שטיחי TPE אפורים למראה פנים דו-גוני.')] },
  { baseId: 'p20', name: 'שטיחי גומי תלת-ממדיים (לתא הנוסעים, לבגאז׳, לגב המושבים ול-Frunk)', category: 'Interior Protection', models: [MY], price: 209.00, desc: 'שטיחי 3D לכל מזג אוויר בכיסוי מלא כולל הגנה לגב המושבים עבור Model Y.', rating: 4.8,
    variants: [v('TPE','Black',0,4.8,'סט TPE שחור לכל מזג אוויר עם מגני גב מושב.'), v('TPE','Gray',10,4.7,'סט TPE אפור כולל הגנה לגב המושב.')] },
  { baseId: 'p21', name: 'שטיחי גומי תלת-ממדיים (לתא הנוסעים, לארגז האחורי ול-Frunk)', category: 'Interior Protection', models: [CT], price: 219.00, desc: 'שטיחי 3D חזקים לכל מזג אוויר לתא הנוסעים, ארגז המטען והתא הקדמי.', rating: 4.8,
    variants: [v('Heavy-Duty TPE','Black',0,4.8,'שטיחי TPE שחורים מחוספסים לתא נוסעים, ארגז ותא קדמי.'), v('Heavy-Duty TPE','Gray',10,4.7,'שטיחי TPE אפורים חזקים במיוחד.')] },
  { baseId: 'p22', name: 'מגן מסך קדמי (זכוכית מחוסמת מט)', category: 'Screen Protection', models: [M3, MY, MS, MX, CT], price: 35.00, desc: 'מגן זכוכית מחוסמת מט למסך הקדמי להפחתת סנוור וטביעות אצבע.', rating: 4.7,
    variants: [v('Tempered Glass','Matte Clear',0,4.7,'זכוכית מחוסמת בגימור מט נגד סנוור.'), v('Tempered Glass','Gloss Clear',0,4.6,'זכוכית מחוסמת מבריקה בבהירות גבוהה.')] },
  { baseId: 'p23', name: 'מגן מסך אחורי', category: 'Screen Protection', models: [M3, MY, MS, MX, CT], price: 25.00, desc: 'סרט מגן שקוף למסך הנוסעים האחורי.', rating: 4.6,
    variants: [v('Tempered Glass','Matte Clear',0,4.6,'מגן מסך אחורי מט להפחתת סנוור.'), v('Tempered Glass','Gloss Clear',0,4.5,'מגן שקוף מבריק לבהירות מרבית.')] },
  { baseId: 'p24', name: 'מדבקות הגנה לספי הדלתות ולסף תא המטען', category: 'Exterior Protection', models: [M3, MY, MS, MX], price: 27.00, desc: 'מדבקות מגן לשמירה על ספי הדלת ושפת תא המטען מפני שפשופים ושריטות.', rating: 4.5,
    variants: [v('Carbon Fiber Vinyl','Black',0,4.5,'סרט מגן שחור במרקם סיבי פחמן.'), v('TPU Film','Clear',3,4.6,'סרט TPU שקוף להגנה דיסקרטית.')] },
  { baseId: 'p25', name: 'מדבקות הגנה לספי הדלתות', category: 'Exterior Protection', models: [CT], price: 24.00, desc: 'מדבקות מגן לשמירה על ספי הדלת מפני שפשופים ושריטות.', rating: 4.5,
    variants: [v('Carbon Fiber Vinyl','Black',0,4.5,'מדבקות ויניל שחורות במרקם סיבי פחמן.'), v('TPU Film','Clear',3,4.6,'מדבקות TPU שקופות להגנה עדינה.')] },
  { baseId: 'p26', name: 'מגיני בוץ לגלגלים', category: 'Exterior Protection', models: [M3, MY, MS, MX, CT], price: 42.00, desc: 'מגני בוץ עמידים לסיוע בהגנה על הצבע מפני פסולת והתזה מהכביש.', rating: 4.6,
    variants: [v('TPE','Black',0,4.6,'מגני בוץ TPE שחורים גמישים.'), v('PP Plastic','Black',4,4.5,'מגני בוץ פוליפרופילן שחורים קשיחים.')] },
  { baseId: 'p27', name: 'מגן קצה דלתות נגד שריטות בחניה', category: 'Exterior Protection', models: [M3, MY, MS, MX, CT], price: 16.00, desc: 'מגנים דקים המגנים על קצות הדלתות מפני שבבים ופגיעה בצבע.', rating: 4.4,
    variants: [v('Rubber','Black',0,4.4,'מגני קצוות גומי שחורים.'), v('Rubber','Clear',0,4.3,'מגני גומי שקופים למראה עדין.')] },
  { baseId: 'p28', name: 'ציפוי הגנה שקוף לצבע הרכב (PPF)', category: 'Exterior Protection', models: [M3, MY, MS, MX], price: 299.00, desc: 'ערכה של סרט מגן שקוף להגנה על אזורים חשופים מפני שריטות ושבבים.', rating: 4.7,
    variants: [v('TPU PPF','Gloss Clear',0,4.7,'סרט TPU שקוף מבריק עם שיקום עצמי.'), v('TPU PPF','Matte Clear',30,4.8,'PPF בגימור מט למראה סאטן.')] },
  { baseId: 'p29', name: 'ציפוי הגנה שקוף לצבע / עיטוף ויניל (PPF / Wrap)', category: 'Exterior Protection', models: [CT], price: 349.00, desc: 'ערכה של סרט מגן או עטיפת ויניל להגנה על משטחי החוץ.', rating: 4.7,
    variants: [v('TPU PPF','Gloss Clear',0,4.7,'סרט מגן שקוף מבריק.'), v('Vinyl Wrap','Matte Black',40,4.8,'עטיפת ויניל שחורה מט להגנה ולסטייל.')] },
  { baseId: 'p30', name: 'כיסוי הגנה למושבים ולגב המושב', category: 'Interior Protection', models: [M3, MY, MS, MX, CT], price: 79.00, desc: 'כיסויי מושבים עם מגני בעיטה לשמירה על הריפוד נקי מבלאי וסימנים.', rating: 4.5,
    variants: [v('PU Leather','Black',0,4.5,'כיסויים מדמוי עור PU שחור קלים לניקוי.'), v('PU Leather','White',10,4.4,'דמוי עור PU לבן למראה יוקרתי.'), v('Fabric','Gray',-5,4.5,'כיסויי בד אפור נושם.')] },
  { baseId: 'p31', name: 'כריות תמיכה לצוואר ולגב התחתון', category: 'Comfort', models: [M3, MY, MS, MX, CT], price: 36.00, desc: 'כריות ארגונומיות לתמיכה נוספת בצוואר ובגב התחתון בזמן נהיגה.', rating: 4.6,
    variants: [v('Memory Foam','Black',0,4.6,'כריות ספוג זיכרון שחורות.'), v('Memory Foam','Gray',0,4.5,'כריות ספוג זיכרון אפורות.'), v('Memory Foam','Beige',0,4.5,'כריות בז׳ לפנים בהיר יותר.')] },
  { baseId: 'p32', name: 'שולחן מתקפל להגה', category: 'Interior', models: [M3, MY], price: 28.00, desc: 'מגש נייד המתחבר להגה לעבודה או לארוחה בזמן חניה.', rating: 4.2,
    variants: [v('ABS Plastic','Black',0,4.2,'מגש ABS שחור קל משקל.'), v('Bamboo','Natural',6,4.4,'מגש בגימור במבוק טבעי.')] },
  { baseId: 'p33', name: 'שולחן מתקפל להגה (להגה עגול)', category: 'Interior', models: [MS, MX], price: 28.00, desc: 'מגש נייד המיועד להגה עגול, לשימוש בזמן חניה.', rating: 4.2,
    variants: [v('ABS Plastic','Black',0,4.2,'מגש ABS שחור להגה עגול.'), v('Bamboo','Natural',6,4.4,'מגש בגימור במבוק להגה עגול.')] },
  { baseId: 'p34', name: 'רשתות הגנה לפתחי המיזוג מתחת למושבים', category: 'Interior Protection', models: [M3, MY], price: 21.00, desc: 'מכסים מגנים למניעת כניסת לכלוך לפתחי האוורור שמתחת למושב.', rating: 4.4,
    variants: [v('ABS Mesh','Black',0,4.4,'מכסי פתחי אוורור מרשת ABS שחורה.'), v('Stainless Mesh','Black',5,4.5,'מכסים מחוזקים מרשת נירוסטה.')] },
  { baseId: 'p35', name: 'מפצל USB לקונסולה המרכזית', category: 'Electronics', models: [M3, MY, MS], price: 39.00, desc: 'רכזת USB עם יציאות מרובות לטעינת מכשירים והרחבת קישוריות בקונסולה.', rating: 4.5,
    variants: [v('Plastic','Black',0,4.5,'רכזת USB שחורה קומפקטית עם יציאות מרובות.'), v('Aluminum','Space Gray',8,4.6,'רכזת במארז אלומיניום איכותי.')] },
  { baseId: 'p36', name: 'כונן SSD מהיר למצלמת הדרך', category: 'Electronics', models: [M3, MY, MS, MX, CT], price: 119.00, desc: 'כונן SSD מהיר ואמין המותאם להקלטות מצלמת דרך ומצב זקיף.', rating: 4.8,
    variants: [v('SSD 500GB','Black',0,4.8,'כונן SSD בנפח 500GB לעמידות גבוהה.'), v('SSD 1TB','Black',40,4.9,'כונן SSD בנפח 1TB לעמידות גבוהה ולהקלטה ממושכת.')] },
  { baseId: 'p37', name: 'מעמד מגנטי לטלפון (MagSafe)', category: 'Electronics', models: [M3, MY, MS, MX, CT], price: 32.00, desc: 'תושבת מגנטית מאובטחת התואמת MagSafe לגישה נוחה לטלפון.', rating: 4.6,
    variants: [v('Aluminum','Black',0,4.6,'תושבת מגנטית מאלומיניום שחור.'), v('Aluminum','Silver',0,4.5,'תושבת מגנטית מאלומיניום כסוף.')] },
  { baseId: 'p38', name: 'תאורת לוגו טסלה לדלתות', category: 'Lighting', models: [M3, MY, MS], price: 30.00, desc: 'תאורת ברכה בדלתות המקרינה הארה חדה של לוגו על הקרקע.', rating: 4.5,
    variants: [v('LED','White',0,4.5,'הקרנת לוגו בלבן בהיר.'), v('LED','Red',2,4.4,'הקרנת לוגו בגוון אדום.')] },
  { baseId: 'p39', name: 'תאורת לוגו טסלה לדלתות (לדלתות הקדמיות)', category: 'Lighting', models: [MX], price: 30.00, desc: 'תאורת ברכה בדלתות הקדמיות המקרינה הארה חדה של לוגו על הקרקע.', rating: 4.5,
    variants: [v('LED','White',0,4.5,'הקרנת לוגו לבנה בדלתות הקדמיות.'), v('LED','Red',2,4.4,'הקרנת לוגו אדומה בדלתות הקדמיות.')] },
  { baseId: 'p40', name: 'תאורת לוגו לדלתות', category: 'Lighting', models: [CT], price: 30.00, desc: 'תאורת ברכה בדלתות לנראות ועיצוב משופרים בעת כניסה ויציאה.', rating: 4.5,
    variants: [v('LED','White',0,4.5,'תאורת ברכה בלבן בהיר.'), v('LED','Cool White',2,4.4,'תאורת ברכה LED בלבן קריר.')] },
  { baseId: 'p41', name: 'תאורת אווירה פנימית (לד)', category: 'Lighting', models: [M3, MY], price: 65.00, desc: 'ערכת תאורת LED להעצמת האווירה בתא הנוסעים.', rating: 4.6,
    variants: [v('LED Strip','RGB',0,4.6,'ערכת תאורת אווירה RGB רב-צבעית.'), v('LED Strip','Warm White',-5,4.5,'ערכת תאורת אווירה בלבן חם.')] },
  { baseId: 'p42', name: 'כפתורים פיזיים חכמים לקיצורי דרך (S3XY Buttons)', category: 'Electronics', models: [M3, MY, MS, MX, CT], price: 129.00, desc: 'כפתורי קיצור דרך פיזיים הניתנים לתכנות לגישה מהירה לפעולות נפוצות ברכב.', rating: 4.7,
    variants: [v('Plastic','Black',0,4.7,'סט כפתורים שחור הניתן לתכנות.'), v('Plastic','White',0,4.6,'סט כפתורים לבן הניתן לתכנות.')] },
  { baseId: 'p43', name: 'מיקרופון קריוקי אלחוטי לרכב', category: 'Entertainment', models: [M3, MY, MS, MX, CT], price: 49.00, desc: 'מיקרופון אלחוטי לקריוקי ובידור בתוך הרכב.', rating: 4.4,
    variants: [v('Metal/Plastic','Black',0,4.4,'מיקרופון קריוקי אלחוטי שחור.'), v('Metal/Plastic','Silver',0,4.4,'מיקרופון קריוקי אלחוטי כסוף.')] },
  { baseId: 'p44', name: 'כוס תרמית עם תצוגת טמפרטורה', category: 'Lifestyle', models: [M3, MY, MS, MX, CT], price: 26.00, desc: 'ספל תרמי מבודד עם תצוגת טמפרטורה מובנית.', rating: 4.5,
    variants: [v('Stainless Steel','Black',0,4.5,'ספל תרמוס מבודד שחור.'), v('Stainless Steel','White',0,4.4,'ספל תרמוס מבודד לבן.'), v('Stainless Steel','Red',0,4.4,'ספל תרמוס מבודד אדום.')] },
  { baseId: 'p45', name: 'שואב אבק אלחוטי קומפקטי לרכב', category: 'Maintenance', models: [M3, MY, MS, MX, CT], price: 59.00, desc: 'שואב אבק אלחוטי נייד לניקוי מהיר של פנים הרכב.', rating: 4.5,
    variants: [v('Plastic','Black',0,4.5,'שואב אבק אלחוטי קומפקטי שחור.'), v('Plastic','Gray',0,4.4,'שואב אבק אלחוטי קומפקטי אפור.')] },
  { baseId: 'p46', name: 'משאבת אוויר ניידת וערכת תיקון פנצ׳רים', category: 'Maintenance', models: [M3, MY, MS, MX, CT], price: 74.00, desc: 'קומפרסור קומפקטי עם ציוד חיוני לתיקון צמיגים למקרי חירום בדרכים.', rating: 4.7,
    variants: [v('Standard Kit','Black',0,4.7,'קומפרסור עם כלי תיקון צמיגים בסיסיים.'), v('Deluxe Kit','Black',15,4.8,'כולל תוספות, כלים ותיק נשיאה.')] },
  { baseId: 'p47', name: 'מתאמי הרמה (Jack Pads)', category: 'Maintenance', models: [M3, MY, MS, MX, CT], price: 22.00, desc: 'משטחי הרמה מגנים המיועדים להרמה בטוחה בנקודות הג׳ק של הרכב.', rating: 4.8,
    variants: [v('Rubber','Black',0,4.8,'משטחי גומי שחורים עמידים להרמה (סט).'), v('Polyurethane','Black',5,4.7,'משטחי הרמה מפוליאוריתן בעל חוזק גבוה.')] },
  { baseId: 'p48', name: 'מתאם טעינה (J1772 / Type 2) לעמדות ציבוריות', category: 'Charging', models: [M3, MY, MS, MX, CT], price: 55.00, desc: 'מתאם לחיבור לעמדות טעינה ציבוריות תואמות J1772 / Type 2.', rating: 4.7,
    variants: [v('J1772 Adapter','Black',0,4.7,'מתאם J1772 לטסלה לעמדות ציבוריות.'), v('Type 2 Adapter','Black',5,4.7,'גרסת מתאם תואמת Type 2.')] },
  { baseId: 'p49', name: 'מטען נייד לשקע ביתי', category: 'Charging', models: [M3, MY, MS, MX, CT], price: 230.00, desc: 'מטען נייד לטעינה נוחה משקעים ביתיים תואמים.', rating: 4.8,
    variants: [v('Standard','Black',0,4.8,'מטען נייד עם תקע לשקע סטנדרטי.'), v('Dual Plug Kit','Black',25,4.8,'כולל מתאם תקע נוסף לשקע.')] },
  { baseId: 'p50', name: 'וו ארגון לכבל הטעינה', category: 'Charging', models: [M3, MY, MS, MX, CT], price: 17.00, desc: 'וו תלוי לקיר לאחסון וארגון מסודר של כבל הטעינה.', rating: 4.6,
    variants: [v('ABS Plastic','Black',0,4.6,'וו כבל שחור לקיר.'), v('Metal','Black',4,4.7,'וו כבל מתכת חזק במיוחד.')] },
  { baseId: 'p51', name: 'כיסוי חיצוני מלא לרכב', category: 'Exterior Protection', models: [M3, MY, MS, MX, CT], price: 149.00, desc: 'כיסוי חיצוני לכל מזג אוויר להגנה על הרכב בחניה בחוץ או בפנים.', rating: 4.6,
    variants: [v('Polyester','Silver',0,4.6,'כיסוי כסוף מחזיר אור לכל מזג אוויר.'), v('Polyester','Black',0,4.5,'כיסוי שחור לכל מזג אוויר.'), v('Multi-Layer','Gray',20,4.7,'כיסוי אפור רב-שכבתי איכותי להגנה מוגברת.')] },
  { baseId: 'p52', name: 'ערכת חירום (פטיש ניפוץ חלונות וחותך חגורות)', category: 'Safety', models: [M3, MY, MS, MX, CT], price: 15.00, desc: 'כלי חירום קומפקטי עם שובר חלון וחותך חגורת בטיחות.', rating: 4.8,
    variants: [v('ABS/Steel','Red',0,4.8,'כלי חירום אדום לנראות גבוהה.'), v('ABS/Steel','Black',0,4.7,'כלי חירום שחור בעל פרופיל נמוך.')] },
  { baseId: 'p53', name: 'טאסות מעוצבות לגלגלים', category: 'Exterior', models: [M3, MY, CT], price: 99.00, desc: 'כיסויי גלגלים מעוצבים לרענון המראה ולסיוע בשיפור האווירודינמיקה.', rating: 4.5,
    variants: [v('ABS Plastic','Matte Black',0,4.5,'כיסויי גלגלים אווירודינמיים בשחור מט.'), v('ABS Plastic','Gloss Black',5,4.4,'כיסויי גלגלים בשחור מבריק.'), v('ABS Plastic','Silver',5,4.4,'כיסויי גלגלים בגימור כסוף.')] },
  { baseId: 'p54', name: 'ספוילר אחורי', category: 'Exterior', models: [M3, MY, MS], price: 179.00, desc: 'ספוילר אחורי ספורטיבי לשדרוג מראה החוץ.', rating: 4.7,
    variants: [v('ABS Plastic','Matte Black',0,4.7,'ספוילר ספורט בשחור מט.'), v('ABS Plastic','Gloss Black',10,4.7,'ספוילר ספורט בשחור מבריק.'), v('Carbon Fiber','Gloss Carbon',60,4.8,'ספוילר במראה סיבי פחמן אמיתי.')] },
  { baseId: 'p55', name: 'דוושות ספורט ממתכת', category: 'Interior', models: [M3, MY, MS, MX, CT], price: 45.00, desc: 'כיסויי דוושות ממתכת מוברשת למראה ספורטיבי ואחיזה משופרת.', rating: 4.6,
    variants: [v('Aluminum','Silver',0,4.6,'דוושות אלומיניום מוברש כסוף.'), v('Aluminum','Black',5,4.6,'דוושות אלומיניום מאנודייז שחור.')] },
  { baseId: 'p56', name: 'כיסוי להגה', category: 'Interior', models: [M3, MY], price: 29.00, desc: 'כיסוי הגה נוח לאחיזה טובה יותר ולהגנה.', rating: 4.4,
    variants: [v('Leather','Black',0,4.5,'כיסוי עור שחור קלאסי.'), v('Leather','White',3,4.4,'כיסוי עור לבן.'), v('Alcantara','Black',8,4.6,'כיסוי איכותי בסגנון אלקנטרה שחור.')] },
  { baseId: 'p57', name: 'כיסוי להגה (להגה עגול)', category: 'Interior', models: [MS, MX], price: 29.00, desc: 'כיסוי הגה נוח המיועד להגה עגול.', rating: 4.4,
    variants: [v('Leather','Black',0,4.5,'כיסוי עור שחור להגה עגול.'), v('Leather','Beige',3,4.4,'כיסוי עור בז׳ להגה עגול.'), v('Alcantara','Black',8,4.6,'כיסוי בסגנון אלקנטרה שחור להגה עגול.')] },
  { baseId: 'p58', name: 'גומיות אטימה להפחתת רעשי רוח בדלתות', category: 'Exterior Protection', models: [M3, MY, MS, MX], price: 38.00, desc: 'אטמי מזג אוויר המיועדים להפחתת רעש רוח ולשיפור אטימות התא.', rating: 4.5,
    variants: [v('EPDM Rubber','Black',0,4.5,'אטמי גומי EPDM שחורים סטנדרטיים.'), v('Double-Layer Rubber','Black',8,4.7,'אטמים דו-שכבתיים עבים יותר להפחתת רעש נוספת.')] }
];

function modelKey(m) {
  if (m.startsWith('Model 3')) return 'm3';
  if (m.startsWith('Model Y')) return 'my';
  if (m.startsWith('Model S')) return 'ms';
  if (m.startsWith('Model X')) return 'mx';
  if (m.startsWith('Cybertruck')) return 'ct';
  return 'all';
}
function modelLabelForImage(m) {
  if (m.startsWith('Model 3')) return 'Tesla Model 3 Highland';
  if (m.startsWith('Model Y')) return 'Tesla Model Y Juniper';
  return 'Tesla ' + m;
}
function imageFor(name, model, variant) {
  const variantText = variant ? ` ${variant.material} ${variant.color}` : '';
  const q = encodeURIComponent(`${name}${variantText} for ${modelLabelForImage(model)} accessory`);
  return `https://tse2.mm.bing.net/th?q=${q}&w=640&h=360&c=7&rs=1&p=0&dpr=1&pid=1.7&mkt=en-US&adlt=moderate`;
}

function expandBase(p) {
  const baseRating = p.rating || DEF_RATING;
  const variants = (p.variants && p.variants.length) ? p.variants : [v('Standard', 'Default', 0, baseRating, p.desc)];
  return p.models.flatMap(m => {
    const vlist = variants.map((vr, i) => ({ ...vr, id: `v${i + 1}`, image: imageFor(p.name, m, vr) }));
    return [{
      id: `${p.baseId}-${modelKey(m)}`,
      baseId: p.baseId,
      name: p.name,
      category: p.category,
      models: [m],
      basePrice: p.price,
      desc: p.desc,
      rating: baseRating,
      variants: vlist,
      selectedVariant: 0
    }];
  });
}

const PRODUCTS = BASE_PRODUCTS.flatMap(expandBase);

const state = {
  model: 'All',
  category: 'All',
  query: '',
  cart: loadCart(),
  selections: {},
  modalProductId: null
};

const els = {
  grid: document.getElementById('productGrid'),
  meta: document.getElementById('catalogMeta'),
  search: document.getElementById('searchInput'),
  category: document.getElementById('categorySelect'),
  productSelect: document.getElementById('productSelect'),
  productSuggestions: document.getElementById('productSuggestions'),
  modelFilters: document.getElementById('modelFilters'),
  cartCount: document.getElementById('cartCount'),
  cartDrawer: document.getElementById('cartDrawer'),
  cartItems: document.getElementById('cartItems'),
  cartTotal: document.getElementById('cartTotal'),
  overlay: document.getElementById('overlay'),
  openCart: document.getElementById('openCartBtn'),
  closeCart: document.getElementById('closeCartBtn'),
  checkout: document.getElementById('checkoutBtn'),
  toast: document.getElementById('toast'),
  year: document.getElementById('year'),
  productModal: document.getElementById('productModal'),
  productModalInner: document.getElementById('productModalInner')
};

function formatPrice(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function loadCart() {
  try { return JSON.parse(localStorage.getItem('vd_cart') || '{}'); } catch { return {}; }
}
function saveCart() { localStorage.setItem('vd_cart', JSON.stringify(state.cart)); }

function initCategories() {
  const cats = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category))).sort()];
  els.category.innerHTML = cats.map(c => `<option value="${c}">${c === 'All' ? 'כל הקטגוריות' : c}</option>`).join('');
}

function initProductPicker() {
  const names = Array.from(new Set(PRODUCTS.map(p => p.name))).sort((a,b) => a.localeCompare(b, 'he'));
  els.productSelect.innerHTML = `<option value="">כל המוצרים (בחירת מוצר ספציפי)</option>` + names.map(n => `<option value="${n.replace(/"/g,'&quot;')}">${n}</option>`).join('');
  els.productSuggestions.innerHTML = names.map(n => `<option value="${n.replace(/"/g,'&quot;')}"></option>`).join('');
}

function filteredProducts() {
  return PRODUCTS.filter(p => {
    const modelOk = state.model === 'All' || p.models.some(m => m.startsWith(state.model));
    const catOk = state.category === 'All' || p.category === state.category;
    const q = state.query.trim().toLowerCase();
    const vtext = p.variants.map(vr => `${vr.label} ${vr.material} ${vr.color} ${vr.desc}`).join(' ');
    const qOk = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.models.some(m => m.toLowerCase().includes(q)) || vtext.toLowerCase().includes(q);
    return modelOk && catOk && qOk;
  });
}

function stars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  const s = '★'.repeat(full) + (half ? '⯪' : '') + '☆'.repeat(empty);
  return `<span class="stars" aria-label="דירוג ${rating} מתוך 5">${s} <span class="rating-num">${rating.toFixed(1)}</span></span>`;
}

function currentVariant(p) {
  const idx = state.selections[p.id] ?? 0;
  return p.variants[idx] || p.variants[0];
}
function variantPrice(p, vr) { return p.basePrice + (vr.priceDelta || 0); }

function renderProducts() {
  const items = filteredProducts();
  const modelLabel = state.model === 'All' ? '' : (state.model === 'Model 3' ? M3 : state.model === 'Model Y' ? MY : state.model);
  els.meta.textContent = `מציג ${items.length} מוצרים${modelLabel ? ' עבור ' + modelLabel : ''}`;
  if (!items.length) {
    els.grid.innerHTML = `<div class="empty">לא נמצאו מוצרים התואמים לסינון. נסו דגם, קטגוריה או חיפוש אחרים.</div>`;
    return;
  }
  els.grid.innerHTML = items.map(p => {
    const idx = state.selections[p.id] ?? 0;
    const vr = p.variants[idx] || p.variants[0];
    const options = p.variants.map((vopt, i) => `<option value="${i}" ${i === idx ? 'selected' : ''}>${vopt.label} (${formatPrice(variantPrice(p, vopt))})</option>`).join('');
    return `
    <article class="card clickable" data-open-product="${p.id}" tabindex="0" role="button" aria-label="צפייה בפרטים עבור ${p.name}">
      <div class="card-top">
        <span class="badge">${p.category}</span>
        <span class="meta">${p.models.join(', ')}</span>
      </div>
      <img class="part-image" src="${vr.image}" alt="${p.name} ${vr.label} עבור ${p.models[0]}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.replaceWith(Object.assign(document.createElement('div'),{className:'part-icon',textContent:'תמונה לא זמינה'}));">
      <h3>${p.name}</h3>
      <div class="rating-row">${stars(p.rating)} <span class="meta">מוצר</span></div>
      <p class="item-desc"><strong>מוצר:</strong> ${p.desc}</p>
      <div class="variant-box" data-stop-open="true">
        <label class="variant-label">סוג / חומר / צבע
          <select class="variant-select" data-variant-for="${p.id}">${options}</select>
        </label>
        <div class="variant-meta">${stars(vr.rating)} <span class="meta">סוג נבחר</span></div>
        <p class="variant-desc"><strong>סוג:</strong> ${vr.desc}</p>
      </div>
      <div class="price-row">
        <span class="price">${formatPrice(variantPrice(p, vr))}</span>
        <div class="card-actions">
          <button class="btn btn-secondary add-btn" data-add="${p.id}" data-stop-open="true">הוסף לעגלה</button>
          <span class="view-hint">צפייה בפרטים</span>
        </div>
      </div>
    </article>`;
  }).join('');
}

function parseCartKey(key) {
  const idx = key.lastIndexOf('::');
  if (idx === -1) return { pid: key, vid: null };
  return { pid: key.slice(0, idx), vid: key.slice(idx + 2) };
}
function cartEntries() {
  return Object.entries(state.cart).map(([key, qty]) => {
    const { pid, vid } = parseCartKey(key);
    const product = PRODUCTS.find(p => p.id === pid);
    if (!product) return null;
    const variant = product.variants.find(vr => vr.id === vid) || product.variants[0];
    return { key, product, variant, qty };
  }).filter(Boolean);
}

function cartTotal() {
  return cartEntries().reduce((sum, e) => sum + variantPrice(e.product, e.variant) * e.qty, 0);
}

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((s, e) => s + e.qty, 0);
  els.cartCount.textContent = count;
  els.cartTotal.textContent = formatPrice(cartTotal());
  if (!entries.length) {
    els.cartItems.innerHTML = `<div class="empty">העגלה ריקה. עיינו בקטלוג כדי להוסיף מוצרים.</div>`;
    return;
  }
  els.cartItems.innerHTML = entries.map(({ key, product: p, variant, qty }) => `
    <div class="cart-item">
      <h4>${p.name}</h4>
      <div class="meta">${p.models.join(', ')} · ${variant.label}</div>
      <div class="meta">${formatPrice(variantPrice(p, variant))} ליחידה</div>
      <div class="cart-row">
        <div class="qty-controls">
          <button class="qty-btn" data-qty="${key}" data-delta="-1" aria-label="הפחתת כמות">−</button>
          <span>${qty}</span>
          <button class="qty-btn" data-qty="${key}" data-delta="1" aria-label="הוספת כמות">+</button>
        </div>
        <button class="remove-btn" data-remove="${key}">הסר</button>
      </div>
    </div>
  `).join('');
}

function openCart() {
  closeProductModal();
  els.cartDrawer.classList.add('open');
  els.cartDrawer.setAttribute('aria-hidden', 'false');
  els.overlay.hidden = false;
}
function closeCart() {
  els.cartDrawer.classList.remove('open');
  els.cartDrawer.setAttribute('aria-hidden', 'true');
  if (!els.productModal.classList.contains('open')) els.overlay.hidden = true;
}

function renderProductModal() {
  const p = PRODUCTS.find(x => x.id === state.modalProductId);
  if (!p) { closeProductModal(); return; }
  const idx = state.selections[p.id] ?? 0;
  const vr = p.variants[idx] || p.variants[0];
  const options = p.variants.map((vopt, i) => `
    <button class="variant-choice ${i===idx?'active':''}" data-modal-variant="${i}">
      <span class="vname">${vopt.label}</span>
      <span class="vprice">${formatPrice(variantPrice(p, vopt))}</span>
      <span class="vrating">${stars(vopt.rating)}</span>
    </button>`).join('');
  els.productModalInner.innerHTML = `
    <div class="modal-topbar">
      <div>
        <span class="badge">${p.category}</span>
        <span class="meta">${p.models.join(', ')}</span>
      </div>
      <button class="icon-btn" id="closeModalBtn" aria-label="סגירת פרטים">&times;</button>
    </div>
    <div class="modal-content">
      <div class="modal-media">
        <img class="modal-image" src="${vr.image}" alt="${p.name} ${vr.label} עבור ${p.models[0]}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.replaceWith(Object.assign(document.createElement('div'),{className:'part-icon modal-fallback',textContent:'תמונה לא זמינה'}));">
      </div>
      <div class="modal-info">
        <h2>${p.name}</h2>
        <div class="rating-row">${stars(p.rating)} <span class="meta">דירוג מוצר</span></div>
        <p class="item-desc"><strong>תיאור מוצר:</strong> ${p.desc}</p>
        <div class="modal-section">
          <h3>בחירת סוג / חומר / צבע</h3>
          <div class="variant-choices">${options}</div>
        </div>
        <div class="modal-section selected-type-box">
          <h3>פרטי הסוג הנבחר</h3>
          <p><strong>${vr.label}</strong></p>
          <div class="variant-meta">${stars(vr.rating)} <span class="meta">דירוג סוג</span></div>
          <p class="variant-desc">${vr.desc}</p>
          <p class="modal-price">${formatPrice(variantPrice(p, vr))}</p>
        </div>
        <div class="modal-actions">
          <button class="btn btn-primary" id="modalAddBtn" data-add="${p.id}">הוסף את הסוג הנבחר לעגלה</button>
          <p class="notice-inline">חנות תצוגה — התשלום אינו זמין עדיין.</p>
        </div>
      </div>
    </div>`;
}

function openProductModal(pid) {
  state.modalProductId = pid;
  renderProductModal();
  els.productModal.classList.add('open');
  els.productModal.setAttribute('aria-hidden', 'false');
  els.overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeProductModal() {
  state.modalProductId = null;
  els.productModal.classList.remove('open');
  els.productModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (!els.cartDrawer.classList.contains('open')) els.overlay.hidden = true;
}

let toastTimer;
function showToast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 3200);
}

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const vr = currentVariant(p);
  const key = `${id}::${vr.id}`;
  state.cart[key] = (state.cart[key] || 0) + 1;
  saveCart();
  renderCart();
  showToast(`${p.name} (${vr.label}) נוסף לעגלה.`);
}

function bindEvents() {
  els.modelFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-model]');
    if (!btn) return;
    state.model = btn.dataset.model;
    els.modelFilters.querySelectorAll('.model-chip').forEach(b => b.classList.toggle('active', b === btn));
    renderProducts();
  });

  els.search.addEventListener('input', (e) => {
    state.query = e.target.value;
    if (els.productSelect && els.productSelect.value && els.productSelect.value !== e.target.value) {
      els.productSelect.value = '';
    }
    renderProducts();
  });
  if (els.productSelect) {
    els.productSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      state.query = val;
      if (els.search) els.search.value = val;
      renderProducts();
    });
  }
  els.category.addEventListener('change', (e) => { state.category = e.target.value; renderProducts(); });

  els.grid.addEventListener('click', (e) => {
    if (e.target.closest('[data-stop-open="true"]') || e.target.closest('select') || e.target.closest('button[data-add]')) {
      const btn = e.target.closest('[data-add]');
      if (btn) { e.stopPropagation(); addToCart(btn.dataset.add); }
      return;
    }
    const card = e.target.closest('[data-open-product]');
    if (card) openProductModal(card.dataset.openProduct);
  });

  els.grid.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('[data-open-product]') && !e.target.closest('select,button,[data-stop-open="true"]')) {
      e.preventDefault();
      openProductModal(e.target.closest('[data-open-product]').dataset.openProduct);
    }
  });

  els.grid.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-variant-for]');
    if (!sel) return;
    const pid = sel.dataset.variantFor;
    state.selections[pid] = Number(sel.value) || 0;
    renderProducts();
    if (state.modalProductId === pid) renderProductModal();
  });

  els.productModal.addEventListener('click', (e) => {
    if (e.target.id === 'productModal') closeProductModal();
    if (e.target.closest('#closeModalBtn')) closeProductModal();
    const vbtn = e.target.closest('[data-modal-variant]');
    if (vbtn && state.modalProductId) {
      state.selections[state.modalProductId] = Number(vbtn.dataset.modalVariant) || 0;
      renderProductModal();
      renderProducts();
    }
    const addBtn = e.target.closest('#modalAddBtn');
    if (addBtn) addToCart(addBtn.dataset.add);
  });

  els.openCart.addEventListener('click', openCart);
  els.closeCart.addEventListener('click', closeCart);
  els.overlay.addEventListener('click', () => { closeCart(); closeProductModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeProductModal(); closeCart(); }
  });

  els.cartItems.addEventListener('click', (e) => {
    const qtyBtn = e.target.closest('[data-qty]');
    const remBtn = e.target.closest('[data-remove]');
    if (qtyBtn) {
      const key = qtyBtn.dataset.qty;
      const delta = Number(qtyBtn.dataset.delta);
      state.cart[key] = (state.cart[key] || 0) + delta;
      if (state.cart[key] <= 0) delete state.cart[key];
      saveCart(); renderCart();
    }
    if (remBtn) {
      delete state.cart[remBtn.dataset.remove];
      saveCart(); renderCart();
    }
  });

  els.checkout.addEventListener('click', () => {
    const count = cartEntries().reduce((s, e) => s + e.qty, 0);
    if (!count) { showToast('העגלה ריקה. הוסיפו מוצרים לפני מעבר לתשלום.'); return; }
    showToast('רכישה מקוונת אינה זמינה עדיין. התשלום יתווסף בקרוב — העגלה והמחירים נשמרים לתצוגה מקדימה.');
  });
}

function init() {
  els.year.textContent = new Date().getFullYear();
  initCategories();
  initProductPicker();
  bindEvents();
  renderProducts();
  renderCart();
}

init();
