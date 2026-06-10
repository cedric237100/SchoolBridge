const curriculaCatalog = {
  anglophone: {
    classes: [
      { id: "nursery_1", name_fr: "Nursery 1", name_en: "Nursery 1" },
      { id: "nursery_2", name_fr: "Nursery 2", name_en: "Nursery 2" },
      { id: "class_1", name_fr: "Class 1", name_en: "Class 1" },
      { id: "class_2", name_fr: "Class 2", name_en: "Class 2" },
      { id: "class_3", name_fr: "Class 3", name_en: "Class 3" },
      { id: "class_4", name_fr: "Class 4", name_en: "Class 4" },
      { id: "class_5", name_fr: "Class 5", name_en: "Class 5" },
      { id: "class_6", name_fr: "Class 6", name_en: "Class 6" },
      { id: "form_1", name_fr: "Form 1", name_en: "Form 1" },
      { id: "form_2", name_fr: "Form 2", name_en: "Form 2" },
      { id: "form_3", name_fr: "Form 3", name_en: "Form 3" },
      { id: "form_4", name_fr: "Form 4", name_en: "Form 4" },
      { id: "form_5", name_fr: "Form 5 (GCE Ordinary Level)", name_en: "Form 5 (GCE Ordinary Level)" },
      { id: "lower_sixth", name_fr: "Lower Sixth", name_en: "Lower Sixth" },
      { id: "upper_sixth", name_fr: "Upper Sixth (GCE Advanced Level)", name_en: "Upper Sixth (GCE Advanced Level)" }
    ],
    subjects: [
      { id: "maths", name_fr: "Mathematics", name_en: "Mathematics" },
      { id: "further_maths", name_fr: "Further Mathematics", name_en: "Further Mathematics" },
      { id: "english_lang", name_fr: "English Language", name_en: "English Language" },
      { id: "english_lit", name_fr: "Literature in English", name_en: "Literature in English" },
      { id: "physics", name_fr: "Physics", name_en: "Physics" },
      { id: "chemistry", name_fr: "Chemistry", name_en: "Chemistry" },
      { id: "biology", name_fr: "Biology", name_en: "Biology" },
      { id: "geography", name_fr: "Geography", name_en: "Geography" },
      { id: "history", name_fr: "History", name_en: "History" },
      { id: "economics", name_fr: "Economics", name_en: "Economics" },
      { id: "citizenship", name_fr: "Citizenship Education", name_en: "Citizenship Education" },
      { id: "computer_science", name_fr: "Computer Science", name_en: "Computer Science" },
      { id: "french", name_fr: "French", name_en: "French" }
    ]
  },
  francophone: {
    classes: [
      { id: "maternelle_ps", name_fr: "Maternelle (Petite Section)", name_en: "Nursery (Petite Section)" },
      { id: "maternelle_ms", name_fr: "Maternelle (Moyenne Section)", name_en: "Nursery (Moyenne Section)" },
      { id: "maternelle_gs", name_fr: "Maternelle (Grande Section)", name_en: "Nursery (Grande Section)" },
      { id: "sil", name_fr: "SIL", name_en: "SIL" },
      { id: "cp", name_fr: "CP", name_en: "CP" },
      { id: "ce1", name_fr: "CE1", name_en: "CE1" },
      { id: "ce2", name_fr: "CE2", name_en: "CE2" },
      { id: "cm1", name_fr: "CM1", name_en: "CM1" },
      { id: "cm2", name_fr: "CM2 (Concours d'entrée en 6ème)", name_en: "CM2 (Entrance to 6th Grade)" },
      { id: "6eme", name_fr: "6ème", name_en: "6ème (6th Grade)" },
      { id: "5eme", name_fr: "5ème", name_en: "5ème (5th Grade)" },
      { id: "4eme", name_fr: "4ème", name_en: "4ème (4th Grade)" },
      { id: "3eme", name_fr: "3ème (BEPC)", name_en: "3ème (BEPC - 3rd Grade)" },
      { id: "seconde", name_fr: "Seconde", name_en: "Seconde" },
      { id: "premiere", name_fr: "Première (Probatoire)", name_en: "Première (Probatoire)" },
      { id: "terminale", name_fr: "Terminale (Baccalauréat)", name_en: "Terminale (Baccalauréat)" }
    ],
    subjects: [
      { id: "mathematiques", name_fr: "Mathématiques", name_en: "Mathématiques" },
      { id: "physique_chimie", name_fr: "Physique-Chimie", name_en: "Physique-Chimie" },
      { id: "svt", name_fr: "SVT (Sciences de la Vie et de la Terre)", name_en: "SVT (Biology/Earth Sciences)" },
      { id: "francais", name_fr: "Français", name_en: "Français" },
      { id: "anglais", name_fr: "Anglais", name_en: "Anglais" },
      { id: "histoire_geo", name_fr: "Histoire-Géographie", name_en: "Histoire-Géographie" },
      { id: "philosophie", name_fr: "Philosophie", name_en: "Philosophie" },
      { id: "informatique", name_fr: "Informatique", name_en: "Informatique" },
      { id: "allemand", name_fr: "Allemand", name_en: "Allemand" },
      { id: "espagnol", name_fr: "Espagnol", name_en: "Espagnol" },
      { id: "ecm", name_fr: "Éducation à la Citoyenneté (ECM)", name_en: "Civic Education (ECM)" }
    ]
  }
};

window.getCurriculumName = function(id, pedagogy, lang) {
  const catalog = curriculaCatalog[pedagogy];
  if (!catalog) return id;
  const item = catalog.classes.find(c => c.id === id) || catalog.subjects.find(s => s.id === id);
  if (!item) return id;
  return lang === 'en' ? item.name_en : item.name_fr;
};
