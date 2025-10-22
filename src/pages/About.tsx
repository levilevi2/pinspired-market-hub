import Header from "@/components/Header";
import SiteMap from "@/components/SiteMap";
import AnimatedWorldMap from "@/components/AnimatedWorldMap";
const About = () => {
  return <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20 relative">
      <AnimatedWorldMap />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-8">
          <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/80 transition-all duration-300">
            <div className="text-foreground space-y-4 text-sm leading-relaxed text-center max-w-3xl mx-auto">
              <h1 className="text-2xl font-bold mb-6 text-center text-foreground drop-shadow-lg">ברוכים הבאים למועדון התעופה שלנו – המקום שבו חלום ההמראה פוגש הזדמנות אמיתית</h1>
              
              <p className="mb-4 text-muted-foreground">אנחנו קהילה שנועדה לקרב את עולם התעופה לכל אחד ואחת מכם – בין אם אתם חובבי טיסה, פרחי טיס בתחילת הדרך, או פשוט מחפשים חוויה ייחודית ושונה</p>
              
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-4 text-foreground">באתר תוכלו למצוא:</h2>
                
                <div className="space-y-3 text-right">
                  <p className="text-muted-foreground">✈️ מכירת מוצרים ואביזרים ייחודיים לפרחי טיס – ציוד, גאדג'טים, מתנות ומזכרות מעולם התעופה</p>
                  <p className="text-muted-foreground">📚 שיעורי טיסה מוזלים – בשיתוף מדריכי טיסה מוסמכים ובתי ספר לטיסה מובילים</p>
                  <p className="text-muted-foreground">📅 סגירת שיעורי טיסה ותיאום תאריכים ישירות מול מדריך דרך האתר – קל, מהיר ומדויק</p>
                  <p className="text-muted-foreground">🎁 חבילות טיסה משתלמות – הכוללות מספר שיעורים, התנסות בפיקוד או סיורים אוויריים</p>
                  <p className="text-muted-foreground">🎉 הגרלות תקופתיות – כל רכישה באתר מקנה כרטיס להשתתפות בהגרלות, כשהפרס הגדול הוא רישיון טיס פרטי בשווי 50,000 ש&quot;ח</p>
                </div>
              </div>
              
              <p className="mb-4 text-muted-foreground">המטרה שלנו היא לא רק למכור – אלא לבנות מסלול המראה שלם עבורכם. להפוך את עולם התעופה לנגיש, מהנה, שיתופי וחווייתי</p>
              
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-4 text-foreground">מה מייחד אותנו</h2>
                
                <div className="grid md:grid-cols-2 gap-4 text-right">
                  <div className="bg-muted/20 backdrop-blur-sm p-4 rounded-lg border border-border/30">
                    <p className="text-sm text-muted-foreground">שילוב בין מכירת מוצרים לבין אפשרות ממשית להתחיל ללמוד לטוס</p>
                  </div>
                  
                  <div className="bg-muted/20 backdrop-blur-sm p-4 rounded-lg border border-border/30">
                    <p className="text-sm text-muted-foreground">מערכת נוחה ונגישה לקביעת שיעורים ישירות מול המדריך</p>
                  </div>
                  
                  <div className="bg-muted/20 backdrop-blur-sm p-4 rounded-lg border border-border/30">
                    <p className="text-sm text-muted-foreground">חוויית קנייה עם ערך מוסף – כל רכישה מקדמת אתכם צעד נוסף לעבר השמיים</p>
                  </div>
                  
                  <div className="bg-muted/20 backdrop-blur-sm p-4 rounded-lg border border-border/30">
                    <p className="text-sm text-muted-foreground">קהילה גדלה של חובבי טיסה, טייסים, מדריכים ושותפים לדרך</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm font-semibold bg-primary/10 backdrop-blur-sm p-4 rounded-lg border border-primary/20 text-primary">בין אם אתם רק חולמים להמריא או כבר בדרך לקבל את הכנפיים – אנחנו כאן בשבילכם, עם כל הכלים, התמיכה וההזדמנויות שאתם צריכים כדי לעוף קדימה</p>
            </div>
          </div>
        </main>
        
        <SiteMap />
      </div>
    </div>;
};
export default About;