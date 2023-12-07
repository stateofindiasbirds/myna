export const generateFirstPage = (
  pdf,
  Group86,
  Group_26,
  Layer_1,
  Layer_2,
  whiteLogo,
  India,
  NT_Logo,
  EN_Logo,
  CR_Logo,
  VU_Logo,
  indiaEndemicCount,
  scheduleICount,
  soibHighPriorityCount,
  iucnRedListCount,
  migrateCount,
  totalCount,
  cmsAppendixSpecies,
  citesAppendixSpecies,
  soibConservationConcernSpecies,
  NT_Count,
  VU_Count,
  EN_Count,
  CR_Count
) => {
  pdf.setFontSize(20);
  pdf.setFont("GandhiFont", "bold");
  pdf.text("SPECIES DETAILS", 105, 60, "center");

  pdf.setFillColor(243, 237, 232);
  pdf.rect(30, 82, 40, 18, "F");

  pdf.setFontSize(10);
  pdf.setFont('GandhiSans-Regular', 'normal')
  pdf.text("Total", 50, 90, "center");

  pdf.text(
    "Total number of species reported \n from this region",
    45,
    110,
    "center"
  );
  pdf.setFillColor(243, 237, 232);
  pdf.rect(30, 127, 40, 18, "F");
  pdf.setFont('GandhiSans-Regular', 'normal')
  pdf.text("High Priority", 50, 135, "center");
  pdf.text(
    "Number of bird species that are \n listed as High Conservation Priority in",
    45,
    154,
    "center"
  );
  pdf.setTextColor(23, 118, 252);
  pdf.textWithLink("State of India's Birds", 30, 162, {
    url: "www.stateofindiasbirds.in",
  });
  pdf.setTextColor(0, 0, 0);
  pdf.setFillColor(243, 237, 232);
  pdf.rect(92, 82, 40, 18, "F");
  pdf.setFont('GandhiSans-Regular', 'normal')
  pdf.text("Migratory", 112, 90, "center");

  pdf.text(
    "Total number of migratory bird \n species reported from this region",
    107,
    110,
    "center"
  );
  pdf.setFillColor(243, 237, 232);
  pdf.rect(92, 127, 40, 18, "F");
  pdf.setFont('GandhiSans-Regular', 'normal')
  pdf.text("Schedule I", 112, 135, "center");

  pdf.text(
    "Number of bird species that are \n listed in Schedule 1 of the",
    107,
    154,
    "center"
  );
  pdf.setTextColor(23, 118, 252);
  pdf.textWithLink("Wild Life (Protection)", 91, 162, {
    url: "https://prsindia.org/files/bills_acts/acts_parliament/2022/The%20Wild%20Life%20(Protection)%20Amendment%20Act,%202022.pdf",
  });
  pdf.textWithLink("Amendment Act (WLPA)", 88, 166, {
    url: "https://prsindia.org/files/bills_acts/acts_parliament/2022/The%20Wild%20Life%20(Protection)%20Amendment%20Act,%202022.pdf",
  });
  pdf.setTextColor(0, 0, 0);
  pdf.setFillColor(243, 237, 232);
  pdf.rect(155, 82, 40, 18, "F");
  pdf.setFont('GandhiSans-Regular', 'normal')
  pdf.text("Threatened", 175, 90, "center");

  pdf.text(
    "Number of bird species that are \n listed as globally threatened as per ",
    170,
    110,
    "center"
  );
  pdf.setTextColor(23, 118, 252);
  pdf.textWithLink("IUCN", 165, 118, { url: "https://www.iucn.org/" });
  pdf.setTextColor(0, 0, 0);
  pdf.setFillColor(243, 237, 232);
  pdf.rect(155, 127, 40, 18, "F");
  pdf.setFont('GandhiSans-Regular', 'normal')
  pdf.text("Endemic", 175, 135, "center");
  pdf.setFontSize(12);
  //total count
  pdf.text(totalCount.toString(), 50, 96, "center");
  //soib count
  pdf.text(soibHighPriorityCount.toString(), 50, 141, "center");
  //migratory
  pdf.text(migrateCount.toString(), 112, 96, "center");
  //schedule count
  pdf.text(scheduleICount.toString(), 112, 141, "center");
  //iucn count
  pdf.text(iucnRedListCount.toString(), 175, 96, "center");
  //endemic count
  pdf.text(indiaEndemicCount.toString(), 175, 141, "center");
  pdf.setFontSize(10);
  pdf.text(
    "Number of bird species that are\nendemic to India",
    170,
    154,
    "center"
  );
  pdf.setFillColor(243, 237, 232);
  pdf.setFillColor(218, 184, 48);
  pdf.circle(25, 90, 11.5, "F");
  pdf.addImage(Group86, "PNG", 16, 85, 18, 8, "Group86", "fast");
  pdf.circle(25, 135, 11.5, "F");
  pdf.addImage(whiteLogo, "PNG", 18, 129, 13, 12, "whiteLogo", "fast");
  pdf.circle(85, 90, 11.5, "F");
  pdf.addImage(Layer_1, "PNG", 78, 88, 15, 5, "layer1", "fast");
  pdf.circle(85, 135, 11.5, "F");
  pdf.addImage(Layer_2, "PNG", 79, 129, 10, 12, "layer2", "fast");
  pdf.circle(150, 90, 11.5, "F");
  pdf.addImage(Group_26, "PNG", 144, 85, 11, 11, "group26", "fast");
  pdf.circle(150, 135, 11.5, "F");
  pdf.addImage(India, "PNG", 145, 130, 13, 12, "India", "fast");
  pdf.rect(15, 180, 55, 9, "F");
  pdf.rect(77, 180, 55, 9, "F");
  pdf.rect(140, 180, 55, 9, "F");
  pdf.text("SoIB Conservation Priority Species", 42.5, 185.5, "center");
  pdf.text("CITES Appendix Species", 104.5, 185.5, "center");
  pdf.text("CMS Appendix Species", 167.5, 185.5, "center");
  pdf.setFillColor(243, 237, 232);
  pdf.rect(15, 189, 55, 16, "F");
  pdf.rect(77, 189, 55, 16, "F");
  pdf.rect(140, 189, 55, 16, "F");

  pdf.text(soibConservationConcernSpecies[1]?.species.toString(), 20, 194);
  pdf.text(soibConservationConcernSpecies[0]?.species.toString(), 20, 200);
  pdf.text(soibConservationConcernSpecies[1]?.count.toString(), 60, 194);
  pdf.text(soibConservationConcernSpecies[0]?.count.toString(), 60, 200);

  pdf.text(citesAppendixSpecies[0].species.toString(), 82, 194);
  pdf.text(citesAppendixSpecies[1].species.toString(), 82, 200);
  pdf.text(citesAppendixSpecies[0].count.toString(), 122, 194);
  pdf.text(citesAppendixSpecies[1].count.toString(), 122, 200);

  pdf.text(cmsAppendixSpecies[0].species.toString(), 145, 194);
  pdf.text(cmsAppendixSpecies[1].species.toString(), 145, 200);
  pdf.text(cmsAppendixSpecies[0].count.toString(), 185, 194);
  pdf.text(cmsAppendixSpecies[1].count.toString(), 185, 200);

  pdf.setFont("GandhiFont", "bold");
  pdf.setFontSize(20);
  pdf.text("IUCN RED LIST", 101, 228, "center");
  pdf.setFontSize(10);
  pdf.setFont('GandhiSans-Regular', 'normal')
  pdf.addImage(CR_Logo, "PNG", 32, 240, 16, 16, "CR", "fast");
  pdf.addImage(EN_Logo, "PNG", 74, 240, 16, 16, "EN", "fast");
  pdf.addImage(VU_Logo, "PNG", 116, 240, 16, 16, "VU", "fast");
  pdf.addImage(NT_Logo, "PNG", 158, 240, 16, 16, "NT", "fast");
  pdf.text("Critically Endangered", 40, 261, "center");
  pdf.text("Endangered", 82, 261, "center");
  pdf.text("Vulnerable", 124, 261, "center");
  pdf.text("Near Threatened", 166, 261, "center");
  pdf.setFontSize(18);
  pdf.text(CR_Count.toString(), 40, 268, "center");
  pdf.text(EN_Count.toString(), 82, 268, "center");
  pdf.text(VU_Count.toString(), 124, 268, "center");
  pdf.text(NT_Count.toString(), 166, 268, "center");
};
