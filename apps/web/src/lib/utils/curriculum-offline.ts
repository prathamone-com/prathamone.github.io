/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.1.0
 * Release Date : 29 March 2026
 * Environment  : Production
 * ==========================================================
 */

import { getSovereignChapters } from '@prathamone/db/curriculum';
import { getSovereignQuestions } from './curriculum-questions-sovereign';
import { getSovereignRemediation } from './curriculum-remediation-sovereign';

/**
 * Offline Curriculum Engine (Sovereign Mode)
 * Provides static pedagogical content for zero-connectivity environments.
 */

const TEMPLATES: Record<string, any> = {
  concept: {
    en: "Welcome to Sovereign Mode. Today we are exploring **{topic}**. \n\nIn this lesson, we will focus on the fundamental principles that define {topic}. Understanding these core concepts is essential for mastering the subject. \n\nKey pillars of {topic}: \n- Fundamental Definition \n- Real-world Application \n- Theoretical Significance \n\nLet's dive deeper into the first section...",
    hi: "सॉवरेन मोड में आपका स्वागत है। आज हम **{topic}** के बारे में विस्तार से जानेंगे। \n\nइस पाठ में, हम उन मूलभूत सिद्धांतों पर ध्यान केंद्रित करेंगे जो {topic} को परिभाषित करते हैं। इन बुनियादी अवधारणाओं को समझना विषय में महारत हासिल करने के लिए आवश्यक है। \n\n{topic} के मुख्य स्तंभ: \n- मौलिक परिभाषा \n- व्यावहारिक अनुप्रयोग \n- सैद्धांतिक महत्व \n\nआइए पहले खंड में गहराई से उतरते हैं...",
    mr: "सॉवरेन मोडमध्ये तुमचे स्वागत आहे. आज आपण **{topic}** बद्दल सविस्तर माहिती घेणार आहोत. \n\nया पाठात, आपण {topic} परिभाषित करणाऱ्या मूलभूत तत्त्वांवर लक्ष केंद्रित करणार आहोत. या मूलभूत संकल्पना समजून घेणे विषयावर प्रभुत्व मिळवण्यासाठी आवश्यक आहे. \n\n{topic} चे मुख्य स्तंभ: \n- मूलभूत व्याख्या \n- प्रत्यक्ष उपयोग \n- सैद्धांतिक महत्त्व \n- पुढचा टप्पा \n\nचला तर मग, पहिल्या भागात खोलवर जाऊया...",
    gu: "સૉવરેન મોડમાં આપનું સ્વાગત છે. આજે આપણે **{topic}** વિશે વિગતવાર જાણીશું. \n\nઆ પાઠમાં, આપણે {topic} ને વ્યાખ્યાયિત કરતા મૂળભૂત સિદ્ધાંતો પર ધ્યાન કેન્દ્રિત કરીશું. આ પાયાની વિભાવનાઓને સમજવી વિષયમાં નિપુણતા મેળવવા માટે અનિવાર્ય છે. \n\n{topic} ના મુખ્ય સ્તંભો: \n- મૂળભૂત વ્યાખ્યા \n- વ્યવહારુ ઉપયોગ \n- સૈદ્ધાંતિક મહત્વ \n\nચાલો આપણે પ્રથમ વિભાગમાં ઊંડા ઉતરીએ..."
  },
  example: {
    en: "Let's look at a practical example of **{topic}**. \n\nImagine a scenario where {topic} is applied in a daily life context. For instance, consider how constants and variables interact in a balanced equation. \n\n$$ Final = Initial + Change $$ \n\nThis simple relationship illustrates the core mechanic of {topic} in action.",
    hi: "**{topic}** का एक व्यावहारिक उदाहरण देखें। \n\nएक ऐसी स्थिति की कल्पना करें जहाँ {topic} को दैनिक जीवन के संदर्भ में लागू किया जाता है। उदाहरण के लिए, विचार करें कि एक संतुलित समीकरण में स्थिरांक और चर कैसे परस्पर क्रिया करते हैं। \n\n$$ Final = Initial + Change $$ \n\nयह सरल संबंध क्रिया में {topic} के मुख्य तंत्र को दर्शाता है।",
    mr: "**{topic}** चे एक व्यावहारिक उदाहरण पाहूया. \n\nएखाद्या प्रसंगाची कल्पना करा जिथे {topic} चा दैनंदिन जीवनात वापर केला जातो. उदाहरणार्थ, संतूलित समीकरणामध्ये स्थिरांक आणि चल कसे कार्य करतात याचा विचार करा. \n\n$$ Final = Initial + Change $$ \n\nहा साध्या संबंध {topic} ची मुख्य कार्यपद्धती स्पष्ट करतो.",
    gu: "**{topic}** નું એક વ્યવહારુ ઉદાહરણ જોઈએ. \n\nએક એવી સ્થિતિની કલ્પના કરો જ્યાં {topic} ને દૈનિક જીવનના સંદર્ભમાં લાગુ કરવામાં આવે છે. ઉદાહરણ તરીકે, એક સંતુલિત સમીકરણમાં અચલાંક અને ચલ કેવી રીતે પરસ્પર ક્રિયા કરે છે તે વિચારો. \n\n$$ Final = Initial + Change $$ \n\nઆ સરળ સંબંધ પ્રક્રિયામાં {topic} ની મુખ્ય પદ્ધતિને દર્શાવે છે."
  },
  summary: {
    en: "To summarize our session on **{topic}**: \n\nWe have covered the definitions, saw a live example, and practiced the core logic. Mastery of {topic} allows you to solve complex problems in the next chapter. \n\nKeep practicing to solidify your knowledge retention!",
    hi: "**{topic}** पर हमारे सत्र को संक्षेप में बताने के लिए: \n\nहमने परिभाषाओं को कवर किया है, एक जीवंत उदाहरण देखा है, और मूल तर्क का अभ्यास किया है। {topic} की महारत आपको अगले अध्याय में जटिल समस्याओं को हल करने की अनुमति देती है।",
    mr: "**{topic}** वरील आपल्या सत्राचा सारांश: \n\nआपण व्याख्या पाहिल्या, एक प्रत्यक्ष उदाहरण बघितले, आणि मुख्य तर्काचा सराव केला. {topic} वरील प्रभुत्व तुम्हाला पुढच्या अध्यायातील कठीણ समस्या सोडवण्यास मदत करेल.",
    gu: "**{topic}** પરના આપણા સત્રનો સારાંશ: \n\nઆપણે વ્યાખ્યાઓ જોઈ, એક જીવંત ઉદાહરણ જોયું, અને મૂળભૂત તર્કનો અભ્યાસ કર્યો. {topic} માં નિપુણતા તમને આગામી પ્રકરણમાં જટિલ સમસ્યાઓ ઉકેલવામાં મદદ કરશે."
  }
};

export function getOfflineContent(topic: string, phase: string, lang: string = 'en'): string {
  const templateMap = TEMPLATES[phase] || TEMPLATES.concept;
  const template = templateMap[lang] || templateMap['en'];
  
  return template.replace(/{topic}/g, topic);
}

/**
 * Returns the full Sovereign curriculum for a specific board/subject
 */
export function getSovereignCurriculum(boardId: string, subjectId: string): any[] {
  // Now returns any subject supported by the Sovereign Registry (Class 10)
  return getSovereignChapters(boardId, subjectId, 10);
}

/**
 * Returns a list of offline questions for a chapter
 */
export function getOfflineQuestions(chapterId: string, count: number = 5): any[] {
  return getSovereignQuestions(chapterId, count);
}

/**
 * Returns a remediation plan for an offline chapter
 */
export function getOfflineRemediation(chapterId: string): any | null {
  return getSovereignRemediation(chapterId);
}

/**
 * Returns a mock stream update for the offline engine
 */
export function getOfflineStreamMock(topic: string, phase: string, lang: string = 'en') {
  const text = getOfflineContent(topic, phase, lang);
  return {
    teacher_generate: {
      messages: [
        {
          id: `offline_${Date.now()}`,
          text: text,
          teacherId: 'scholar_1',
          role: 'Teacher',
          isComplete: true
        }
      ],
      isComplete: true
    }
  };
}
