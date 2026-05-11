export type Paper = {
  id: string;
  subjectCode: string;
  title: string;
  grade: string;
  fileType: "pdf" | "word";
  url: string;
  year: number;
};

let papers: Paper[] = [];

export const uploadPaper = (paper: Paper) => {
  papers.push(paper);
  return paper;
};

export const getPapers = () => {
  return papers;
};

export const getPapersBySubject = (subjectCode: string) => {
  return papers.filter(p => p.subjectCode === subjectCode);
};