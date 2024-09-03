import { AnyQuestion } from "../types";

const createTemplate: (
  htmlCode: string,
  cssCode: string,
  jsCode: string,
  finalFormData: AnyQuestion[]
) => void = async (htmlCode, cssCode, jsCode, finalFormData) => {
  const content = {
    html: htmlCode,
    css: cssCode,
    js: jsCode.replace("**configQuestions**", JSON.stringify(finalFormData)),
  };

  const body = {
    name: "Survey test10",
    type: "DYNAMIC_CONTENT",
    directory: "6d664673-4dee-417e-9427-8c1fb73545df",
    content: JSON.stringify(content),
    source: 2,
  };

  const res = await fetch("https://api.synerise.com/template-backend/template", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer: eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.mYqewng8cuQH4ZL-Q-4m18vJ69YKiMWZfoL_HmpYXkXsrRPxMuW0O_d2fkyWtpHLQAEQNBowQddP8sIcnW-1vas7uu4uUKr--Rtoi9K8ySDduqLOmXmIBYkk77ol7lPyXX1Ana89DpF1PpG6M9u5KIVnDFHrwVIlgkY8LTj9zeOBlcDdy0QfVIxc45Prt1yVIfd_9NEa-N8OXjeNppW7jawKTXZMzKf7A5wUmQBxtETkiHUxjQPUKJEUTmQPJAkTnG9incDU7yM7WhF5WKyn3VITpMgprxWvBB-wwKdLEoK81qyutHKiNUgLTUdHfCb7NIiCvlmEDnaxZq4YmziF_8fCaDMbloePVs_3EFRMi5CcYzi-l3NjXkImPGCYjvQl3zR1hV3hIZdLsRR9ED5Ghv8eGMYoplvGcmMadkpdYRNsRAZA2w697l-CIbrhnYpdhL4QmLvj84nNzTWpwj9UooW78nHy14nuL8YiYai91O27xH8PwUY-9pmhjKFE_ZdVptP01yOHF2Dv26Kx1xTGapkZQJ-g-1v6axISXDqbe5WG5nFseXp5zAtWyTapvvp0941V-qwumhiw5qLd6xzXqdE9ZnIW7Fa-1MLn1yqjNmNKUvVdQt_Dco12P6jdUiXfv5YJgOy-wGdloVl2KyIPyU2EkMDEOvcIFW9vQC6qEhc.O_9We0_kWzedi-2Y.4pJqluNHbsnWckDxFEBx25-ITbh9IZ0Ua2Ph-v43sTOalS6LuN81oQP8YYa_DtvOJyCOjNcHJGL0iaqkCymmDGCqvu8IlF79cmQZvUDdU2QpNVmMnJPqGzNbu_YMy9p66ztjzxWd_CDjT1xOpBTxD48sC7rAS1LdbNe7N_MLb6plBoZHdgXVnQan1S5dfCVe8cJ2pQrKdeVmaKmDi0_a472Soo4uGQ1d38WQE8A5J2yYiHHqTxtmHhWmSi5W0DCzkscaISQHBgflGkijG7iwOrgRKDf1I_DomDahZgMDP9aMZ-oYF6iCgO9gYLtREST5mKbqH08mJfUu6lTY11y4adu9za9KshpanHWLQQQPRnd-0KrgXhb9rpsrR53JRKTS_ey-ThPTrb-H52UYSklJYKMjW1CFHIASkNqVTf-GSsy0zz71SwQazksJJolRD7oFrJjdU1Mejvg9xHvjCbDqcP8gtz1_bDjylf4m3m_BLHu8adZIZZmm7rHj3cG8et0-9g6Xu24YEkaA5azBLyHzVDJTjPDCMwPov7myu5AdOlf76asIN8rPZSLroREKmq1OXKTgXX41bq1H747p002GmX9mD13mcLgaQZsFXsA8RP39FJ74Xiub71MdqrHjbvawsAOFFueFpMrH4lt9rACLxZ5ytD_-3KYC4XNY1IUgsvfKII38nWqcKZkoi-CdISazoFlbYPrBV-RSDm2B0SJLfDPEHn_PYoRyfE76tOJazcKBgpST18-Syeuf0k-s71bvffeeYTjN8x38eHX5Ka_l5hW498hE8YQHlgP5ZzJT3OSjQ82bK4B-5iz2F-BD3SHBDbZLiB5i4CWbONatAuxDShjKjODmY1Z4-iRP5N4pnNaPiELsouk2nGEp3x6cDN7eBCfjml7QD9qnysqDtbiBT4zrJXV8zF9owtPtqXW2sAEyBrCBeKBGtBV4XO2oSppc6uAGXPdcBRpe8PkOOW0e5ajHOh5kpErk4Iviot3Fq_FcHAUPMVs0cwIgL6hTEEuv4jFWcrJwj04edMTzPtQd-EKq8TXgYL1UULVWfx7FW-R7QpNiWZ7abbstZR-Lk6Ds3tdnr3palHh5ZAhOmsiyUdSlBoAoX-l5Mg8O7fU6h56B1UqqVT1aYESEvWdzAFGy6Q6UXakVGf6LUta3yb4dOs1YAivXgy-RCZgodDAJosysR25rh3GA5IKcjb5T1T_cIpsq4b9oHbXwXwASj5Rc3ELpIs4tw_Z4pK-mW2lBTOIeGvhifkoS3RXCQcW4tSMyLJuw81SkIJclo1UlxBkH_7OA26sPJ2F9_JM_1Z9cKFXf2JFVrs4B311FWG8H3A-LlfQuOZbMk2Y0dCyP2_gBTT6N8UlO6oG6XxcK_YHutFJ4Ot53IY_BC88.tXMfPQ_bQ6lJwTt3dm1HZg",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return data;
};

export default createTemplate;
