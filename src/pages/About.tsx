
import Header from "@/components/Header";
import SiteMap from "@/components/SiteMap";
import AnimatedWorldMap from "@/components/AnimatedWorldMap";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedWorldMap />
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8 relative z-10">
        <div className="glass-card p-8 mx-4 md:mx-8 lg:mx-16">
          <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
            אודות האתר
          </h1>
          
          <div className="text-white space-y-6 text-lg leading-relaxed">
            <p className="text-xl font-semibold text-center mb-8">
              ברוכים הבאים למועדון התעופה שלנו – המקום שבו חלום ההמראה פוגש הזדמנות אמיתית.
            </p>
            
            <p>
              אנחנו קהילה שנועדה לקרב את עולם התעופה לכל אחד ואחת מכם – בין אם אתם חובבי טיסה, 
              חולמים להפוך לטייסים, או פשוט מחפשים חוויה ייחודית ושונה.
            </p>
            
            <p>
              באתר תמצאו מגוון מוצרים ייחודיים בתחום התעופה – גאדג'טים, פריטי אספנות, ציוד טיסה, 
              אביזרי השראה ומתנות מקוריות. כל רכישה באתר אינה רק קנייה – היא כרטיס להגרלה על פרסים 
              יוצאי דופן, ובהם גם פרס יוקרתי במיוחד: רישיון טיס פרטי בשווי 50,000 ש"ח!
            </p>
            
            <p>
              המטרה שלנו היא להפוך את הדרך לרישיון טיס לנגישה יותר, חווייתית, ומהנה – דרך מכירה 
              חכמה ומודל של תמיכה הדדית בקהילה.
            </p>
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 text-center">מה מייחד אותנו?</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">כל קנייה משתתפת אוטומטית בהגרלות תקופתיות</h3>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">שיתופי פעולה עם בתי ספר לטיסה להנחות קבוצתיות</h3>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">הזדמנויות חד־פעמיות להיכרות עם עולם התעופה מקרוב</h3>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">חוויית משתמש מהנה, אמינה ובטוחה</h3>
                </div>
              </div>
            </div>
            
            <p className="text-xl font-semibold text-center mt-8 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              בין אם אתם רק ממריאים או כבר עפים גבוה – אנחנו כאן כדי ללוות אתכם.
            </p>
          </div>
        </div>
      </main>
      
      <SiteMap />
    </div>
  );
};

export default About;
