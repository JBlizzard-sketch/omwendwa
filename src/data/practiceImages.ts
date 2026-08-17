import practiceTaxImg from "@/assets/practice-tax.jpg";
import practiceCommercialImg from "@/assets/practice-commercial.jpg";
import practiceFamilyImg from "@/assets/practice-family.jpg";
import practiceSuccessionImg from "@/assets/practice-succession.jpg";
import practiceGovernanceImg from "@/assets/practice-governance.jpg";
import practiceLandImg from "@/assets/practice-land.jpg";

export const practiceImages: Record<string, string> = {
  "practice-tax": practiceTaxImg,
  "practice-commercial": practiceCommercialImg,
  "practice-family": practiceFamilyImg,
  "practice-succession": practiceSuccessionImg,
  "practice-governance": practiceGovernanceImg,
  "practice-land": practiceLandImg,
  // New areas reuse existing visual language until bespoke imagery is sourced
  "practice-debt-recovery": practiceCommercialImg,
  "practice-private-wealth": practiceSuccessionImg,
  "practice-employment": practiceCommercialImg,
  "practice-conveyancing": practiceLandImg,
  "practice-adr": practiceGovernanceImg,
  "practice-human-rights": practiceLandImg,
  "practice-legislative": practiceGovernanceImg,
  "practice-policy": practiceGovernanceImg,
  "practice-research": practiceTaxImg,
  "practice-training": practiceCommercialImg,
  "practice-legal-tech": practiceTaxImg,
};
