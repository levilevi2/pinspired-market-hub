
import Header from "@/components/Header";
import SiteMap from "@/components/SiteMap";
import AnimatedWorldMap from "@/components/AnimatedWorldMap";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedWorldMap />
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-8 relative z-10">
        <div className="glass-card p-6 mx-4 md:mx-8 lg:mx-12">
          <div className="text-white space-y-4 text-sm leading-relaxed text-center max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-lg">
              ברוכים הבאים למועדון התעופה שלנו – המקום שבו חלום ההמראה פוגש הזדמנות אמיתית.
            </h1>
            
            <p className="mb-4">
              אנחנו קהילה שנועדה לקרב את עולם התעופה לכל אחד ואחת מכם – בין אם אתם חובבי טיסה, 
              פרחי טיס בתחילת הדרך, או פשוט מחפשים חוויה ייחודית ושונה.
            </p>
            
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4">באתר תוכלו למצוא:</h2>
              
              <div className="space-y-3 text-right">
                <p>✈️ מכירת מוצרים ואביזרים ייחודיים לפרחי טיס – ציוד, גאדג'טים, מתנות ומזכרות מעולם התעופה.</p>
                <p>📚 שיעורי טיסה מוזלים – בשיתוף מדריכי טיסה מוסמכים ובתי ספר לטיסה מובילים.</p>
                <p>📅 סגירת שיעורי טיסה ותיאום תאריכים ישירות מול מדריך דרך האתר – קל, מהיר ומדויק.</p>
                <p>🎁 חבילות טיסה משתלמות – הכוללות מספר שיעורים, התנסות בפיקוד או סיורים אוויריים.</p>
                <p>🎉 הגרלות תקופתיות – כל רכישה באתר מקנה כרטיס להשתתפות בהגרלות, כשהפרס הגדול הוא רישיון טיס פרטי בשווי 50,000 ש"ח!</p>
              </div>
            </div>
            
            <p className="mb-4">
              המטרה שלנו היא לא רק למכור – אלא לבנות מסלול המראה שלם עבורכם.
              להפוך את עולם התעופה לנגיש, מהנה, שיתופי וחווייתי.
            </p>
            
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4">מה מייחד אותנו?</h2>
              
              <div className="grid md:grid-cols-2 gap-4 text-right">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm">שילוב בין מכירת מוצרים לבין אפשרות ממשית להתחיל ללמוד לטוס</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm">מערכת נוחה לסגירת שיעורים וחבילות טיסה אונליין</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm">חוויית קנייה עם ערך מוסף – כל רכישה מקדמת אתכם צעד נוסף לעבר השמיים</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm">קהילה גדלה של חובבי טיסה, טייסים, מדריכים ושותפים לדרך</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm font-semibold bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              בין אם אתם רק חולמים להמריא או כבר בדרך לקבל את הכנפיים – אנחנו כאן בשבילכם, עם כל הכלים, התמיכה וההזדמנויות שאתם צריכים כדי לעוף קדימה.
            </p>
          </div>
        </div>
      </main>
      
      <SiteMap />
    </div>
  );
};

export default About;
