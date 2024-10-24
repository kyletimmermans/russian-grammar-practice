// Keep track of JSON information
var jsonVerb, jsonNoun, jsonAdj, jsonPronoun;
var jsonPossess, jsonDemonst, jsonQuestion;
var jsonCompare, jsonShortFormAdj;
var correctAnswer, fetchList = [];


// Anchor-Hash tag handling
// Go to specified exercise on load (verb() default if none chosen)
document.addEventListener("DOMContentLoaded", (event) => {
  let anchorHash = window.location.hash.toLowerCase();

  switch (anchorHash) {
    case "#verbs":
      verb();
      break;
    case "#singular-nouns":
      singNoun();
      break;
    case "#plural-nouns":
      plurNoun();
      break;
    case "#singular-adjectives":
      singAdj();
      break;
    case "#plural-adjectives":
      plurAdj();
      break;
    case "#pronouns":
      pronoun();
      break;
    case "#possessive-pronouns":
      possessive();
      break;
    case "#demonstratives":
      demonstrative();
      break;
    case "#question-words":
      questionWord();
      break;
    case "#comparatives":
      comparative();
      break;
    case "#short-form-adjectives":
      shortFormAdj();
      break;
    case "#about":
      var modal = new bootstrap.Modal(document.getElementById("aboutModal"));
      var dropdown = new bootstrap.Dropdown(document.getElementById("dropdownMenu2"));
      dropdown.hide();
      modal.show();
      verb();  // Need an exercise type after opening
      break;
    case "#exercises":
      var modal = new bootstrap.Modal(document.getElementById("aboutModal"));
      var dropdown = new bootstrap.Dropdown(document.getElementById("dropdownMenu2"));
      modal.hide();
      dropdown.show();
      verb();
      break;
    default:
      verb();
  }
});


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomString(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}


const randomGender = (plural) => {
  if (plural == true) {
    let gender = getRandomString(["m", "f", "n", "p"]);
    let finalGender;
    switch (gender) {
      case "m":
        finalGender = "Masculine";
        break;
      case "f":
        finalGender = "Feminine";
        break;
      case "n":
        finalGender = "Neuter";
        break;
      case "p":
        finalGender = "Plural";
        break;
    }

    return [gender, finalGender];
  } else {
    let gender = getRandomString(["m", "f", "n"]);
    let finalGender;

    switch (gender) {
      case "m":
        finalGender = "Masculine";
        break;
      case "f":
        finalGender = "Feminine";
        break;
      case "n":
        finalGender = "Neuter";
        break;
    }

    return [gender, finalGender];
  }
};


const randomCase = (animate, plural) => {
  var gramcase;

  if (animate == true) {

    // We also want to do nominative plural for plural nouns and adjectives
    if (plural == 's') {
      gramcase = getRandomString(["gn", "dt", "ac", "in", "pr"]);
    } else {
      gramcase = getRandomString(["nm", "gn", "dt", "ac", "in", "pr"]);
    }

    // 2nd round for accusative choice (1/4 chance for animate)
    if (gramcase == "ac") {
      gramcase = getRandomString(["aca", "aci", "aci", "aci",]);
    }

    let finalCase;
    switch (gramcase) {
      case "nm":
        finalCase = "Nominative";
        break;
      case "gn":
        finalCase = "Genitive";
        break;
      case "dt":
        finalCase = "Dative";
        break;
      case "aca":
        finalCase = "Accusative Animate";
        break;
      case "aci":
        finalCase = "Accusative";
        break;
      case "in":
        finalCase = "Instrumental";
        break;
      case "pr":
        finalCase = "Prepositional";
        break;
    }

    return [gramcase, finalCase];
  } else {

    // We also want to do nominative plural for plural nouns and adjectives
    if (plural == 's') {
      gramcase = getRandomString(["gn", "dt", "ac", "in", "pr"]);
    } else {
      gramcase = getRandomString(["nm", "gn", "dt", "ac", "in", "pr"]);
    }

    let finalCase;
    switch (gramcase) {
      case "nm":
        finalCase = "Nominative";
        break;
      case "gn":
        finalCase = "Genitive";
        break;
      case "dt":
        finalCase = "Dative";
        break;
      case "ac":
        finalCase = "Accusative";
        break;
      case "in":
        finalCase = "Instrumental";
        break;
      case "pr":
        finalCase = "Prepositional";
        break;
    }

    return [gramcase, finalCase];
  }
};


const randomVerb = (data) => {
  let randomVerb = data.verb[getRandomInt(0, data.verb.length - 1)];

  // 60% present, 30% past, 10% imperative
  let conjType = getRandomString([
    "present",
    "present",
    "present",
    "present",
    "present",
    "present",
    "past",
    "past",
    "past",
    "imperative",
  ]);

  let proNoun;

  if (conjType == "imperative") {
    proNoun = getRandomString(["ty", "vy"]);
  } else if (conjType == "past") {
    proNoun = getRandomString(["m", "f", "n", "p"]);
  } else {
    proNoun = getRandomString(["ya", "ty", "on", "my", "vy", "oni"]);

    // There is rarely present tense use of быть
    // Use its future tense instead when present chosen
    if (randomVerb.name == "быть") {
      conjType = "future";
    }
  }

  let cyrillicPronoun;
  switch (proNoun) {
    case "ya":
      cyrillicPronoun = "Я";
      break;
    case "ty":
      cyrillicPronoun = "Ты";
      break;
    case "m":
      cyrillicPronoun = "Он";
      break;
    case "on":
      cyrillicPronoun = "Он";
      break;
    case "my":
      cyrillicPronoun = "Мы";
      break;
    case "vy":
      cyrillicPronoun = "Вы";
      break;
    case "f":
      cyrillicPronoun = "Она";
      break;
    case "n":
      cyrillicPronoun = "Оно";
      break;
    case "p":
      cyrillicPronoun = "Они";
      break;
    case "oni":
      cyrillicPronoun = "Они";
      break;
  }

  // Return type [infinitive, tense, pronoun, conjugated verb, translation]
  return [
    randomVerb.name,
    conjType,
    cyrillicPronoun,
    randomVerb.conjugations[conjType][proNoun],
    randomVerb.translation,
  ];
};


const randomNoun = (data, amount) => {
  let randomNoun = data.noun[getRandomInt(0, data.noun.length - 1)];
  let gramcase = randomCase(false, amount);

  // nm case of noun, translation, case, gender, animate, final noun
  return [
    randomNoun.name,
    randomNoun.translation,
    gramcase[1],
    randomNoun.gender,
    randomNoun.animate,
    randomNoun.conjugations[amount][gramcase[0]],
  ];
};

const randomAdjective = (data, amount) => {
  let randomAdj = data.adjective[getRandomInt(0, data.adjective.length - 1)];
  let gramcase = randomCase(true, amount);
  let gender;
  if (amount == "s") {
    gender = randomGender(false);
  } else { // Put in array so we can always use gender[0]
    gender = ["p"];
  }

  // nm case of noun, translation, case, gender, animate, final noun, finalGender
  return [
    randomAdj.name,
    randomAdj.translation,
    gramcase[1],
    gender[0],
    randomAdj.conjugations[gender[0]][gramcase[0]],
    gender[1]
  ];
};


const randomPronoun = (data) => {
  let randomPronoun = data.pronoun[getRandomInt(0, data.pronoun.length - 1)];
  let gramcase = randomCase(false, 's');
  let preposition;

  if (["он / оно", "она", "они"].includes(randomPronoun.name)) {
    preposition = getRandomInt(0, 1);
  }

  return [
    randomPronoun.name,
    gramcase[1],
    preposition,
    randomPronoun.conjugations[gramcase[0]],
  ];
};

// Put possessive and demonstrative together
// Because the functions are basically the same
const randomPossDemo = (data, word) => {
  let randomPoss, randomDemo;

  if (word == "poss") {
    randomPoss = data.possessive[getRandomInt(0, data.possessive.length - 1)];
  } else if (word == "demo") {
    randomDemo =
      data.demonstrative[getRandomInt(0, data.demonstrative.length - 1)];
  }

  let gramcase = randomCase(true, 's');
  let gender = randomGender(true);

  if (word == "poss") {
    return [
      randomPoss.name,
      gender[1],
      gramcase[1],
      randomPoss.conjugations[gramcase[0]][gender[0]],
    ];
  } else if (word == "demo") {
    return [
      randomDemo.name,
      gender[1],
      gramcase[1],
      randomDemo.conjugations[gramcase[0]][gender[0]],
    ];
  }
};


const randomQuestionWord = (data) => {
  let randomQuestion =
    data.questionword[getRandomInt(0, data.questionword.length - 1)];
  let gramcase = randomCase(true, 's');

  if (randomQuestion.name == "что" || randomQuestion.name == "кто") {
    // что and кто have no animate option
    if (gramcase[0] == "aca" || gramcase[0] == "aci") {
      gramcase[1] = "Accusative";
      gramcase[0] = "ac";
    }

    return [
      randomQuestion.name,
      gramcase[1],
      randomQuestion.conjugations[gramcase[0]],
    ];
  } else {
    let gender = randomGender(true);

    return [
      randomQuestion.name,
      gender[1],
      gramcase[1],
      randomQuestion.conjugations[gender[0]][gramcase[0]],
    ];
  }
};


const randomComparative = (data) => {
  let randomComp =
    data.comparative[getRandomInt(0, data.comparative.length - 1)];

  return [randomComp.name,
          randomComp.translation,
          randomComp.ec,
          randomComp.c];
};


const randomShortFormAdj = (data) => {
  let randomShortFormAdj =
    data.shortformadjective[getRandomInt(0, data.shortformadjective.length - 1)];

  let gender = randomGender(true)[0];
  let cyrillicPronoun;
  switch (gender) {
    case "m":
      cyrillicPronoun = "Он";
      break;
    case "f":
      cyrillicPronoun = "Она";
      break;
    case "n":
      cyrillicPronoun = "Оно";
      break;
    case "p":
      cyrillicPronoun = "Они";
      break;
  }

  return [cyrillicPronoun,
          randomShortFormAdj.name,
          randomShortFormAdj.translation,
          randomShortFormAdj.shortforms[gender]];
};


// ######################################################
// ### Split point from random generators to fetchers ###
// ######################################################


const verb = () => {
  document.querySelector("#centered-title").textContent = "Verb Conjugations";
  window.location.hash = "#verbs"
  var isError = false;

  if (fetchList.includes("verb") == false) {
    fetch("/wordbank/verbs.json")
      .then((response) => response.json())
      .then((data) => {
        jsonVerb = data;
      })
      .catch((error) => {
        isError = true;
        console.error("Fetch error: ", error);
        document.getElementsByClassName("alert-holder")[0].style.display = "block";
        document.getElementById("question").textContent = "....";
        setTimeout(() => {
          verb();
        }, 3000);
      })
      .finally(() => {
        if (!isError) {
          fetchList.push("verb");
          document.getElementsByClassName("alert-holder")[0].style.display = "none";
          let q = randomVerb(jsonVerb);
          document.getElementById("question").innerHTML = q[2]+" <div id='nobreaks'>____</div> <b>"+q[0]
                                                          +"</b> (\""+q[4]+"\") ("
                                                          +q[1]+")";
          correctAnswer = q[3];
        }
      });
  } else {  // If already fetched
    let q = randomVerb(jsonVerb);
    document.getElementById("question").innerHTML = q[2]+" <div id='nobreaks'>____</div> <b>"+q[0]
                                                    +"</b> (\""+q[4]+"\") ("
                                                    +q[1]+")";
    correctAnswer = q[3];
  }
};


const singNoun = () => {
  document.querySelector("#centered-title").textContent = "Singular Noun Cases";
  window.location.hash = "#singular-nouns"
  var isError = false;

  if (fetchList.includes("noun") == false) {
    fetch("/wordbank/nouns.json")
      .then((response) => response.json())
      .then((data) => {
        jsonNoun = data;
      })
      .catch((error) => {
        isError = true;
        console.error("Fetch error: ", error);
        document.getElementsByClassName("alert-holder")[0].style.display = "block";
        document.getElementById("question").textContent = "....";
        // Keep trying when it fails
        setTimeout(() => {
          singNoun();
        }, 3000);
      })
      .finally(() => {
        if (!isError) {
          fetchList.push("noun");
          document.getElementsByClassName("alert-holder")[0].style.display = "none";
          let q = randomNoun(jsonNoun, "s");
          if (q[4] == true) {
            // Animate or not
            document.getElementById("question").innerHTML = "Singular "+q[2]+" <b>"+q[0]
                                                            +"</b>"+" (\""+q[1]+"\", "
                                                            +q[3]+", animate)";
          } else {
            document.getElementById("question").innerHTML = "Singular " +q[2]+" <b>"+q[0]
                                                            +"</b>"+" (\""+q[1]+"\", "
                                                            +q[3]+")";
          }
          correctAnswer = q[5];
        }
      });
  } else {
    let q = randomNoun(jsonNoun, "s");
    if (q[4] == true) {
      document.getElementById("question").innerHTML = "Singular "+q[2]+" <b>"+q[0]
                                                      +"</b>"+" (\""+q[1]+"\", "
                                                      +q[3]+", animate)";
    } else {
      document.getElementById("question").innerHTML = "Singular " +q[2]+" <b>"+q[0]
                                                      +"</b>"+" (\""+q[1]+"\", "
                                                      +q[3]+")";
    }
    correctAnswer = q[5];
  }
};


const plurNoun = () => {
  document.querySelector("#centered-title").textContent = "Plural Noun Cases";
  window.location.hash = "#plural-nouns"
  var isError = false;

  if (fetchList.includes("noun") == false) {
    fetch("/wordbank/nouns.json")
      .then((response) => response.json())
      .then((data) => {
        jsonNoun = data;
      })
      .catch((error) => {
        isError = true;
        console.error("Fetch error: ", error);
        document.getElementsByClassName("alert-holder")[0].style.display = "block";
        document.getElementById("question").textContent = "....";
        setTimeout(() => {
          plurNoun();
        }, 3000);
      })
      .finally(() => {
        if (!isError) {
          fetchList.push("noun");
          document.getElementsByClassName("alert-holder")[0].style.display = "none";
          let q = randomNoun(jsonNoun, "p");
          if (q[4] == true) {
            document.getElementById("question").innerHTML = "Plural "+q[2]+" <b>"+q[0]
                                                            +"</b>"+" (\""+q[1]+"\", "
                                                            +q[3]+", animate)";
          } else {
            document.getElementById("question").innerHTML = "Plural "+q[2]+" <b>"+q[0]
                                                            +"</b>"+" (\""+q[1]+"\", "
                                                            +q[3]+")";
          }
          correctAnswer = q[5];
        }
      });
  } else {
    let q = randomNoun(jsonNoun, "p");
    if (q[4] == true) {
      document.getElementById("question").innerHTML = "Plural "+q[2]+" <b>"+q[0]
                                                      +"</b>"+" (\""+q[1]+"\", "
                                                      +q[3]+", animate)";
    } else {
      document.getElementById("question").innerHTML = "Plural "+q[2]+" <b>"+q[0]
                                                      +"</b>"+" (\""+q[1]+"\", "
                                                      +q[3]+")";
    }
    correctAnswer = q[5];
  }
};


const singAdj = () => {
  document.querySelector("#centered-title").textContent = "Singular Adjective Cases";
  window.location.hash = "#singular-adjectives"
  var isError = false;

  if (fetchList.includes("adj") == false) {
    fetch("/wordbank/adjectives.json")
      .then((response) => response.json())
      .then((data) => {
        jsonAdj = data;
      })
      .catch((error) => {
        isError = true;
        console.error("Fetch error: ", error);
        document.getElementsByClassName("alert-holder")[0].style.display = "block";
        document.getElementById("question").textContent = "....";
        setTimeout(() => {
          singAdj();
        }, 3000);
      })
      .finally(() => {
        if (!isError) {
          fetchList.push("adj");
          document.getElementsByClassName("alert-holder")[0].style.display = "none";
          let q = randomAdjective(jsonAdj, "s");
          document.getElementById("question").innerHTML = "Singular "+q[5]+" "+q[2]
                                                          +" <b>"+q[0]+"</b>"+" (\""
                                                          +q[1]+"\")";

          correctAnswer = q[4];
        }
      });
  } else {
    let q = randomAdjective(jsonAdj, "s");
    document.getElementById("question").innerHTML = "Singular "+q[5]+" "+q[2]
                                                    +" <b>"+q[0]+"</b>"+" (\""
                                                    +q[1]+"\")";
    correctAnswer = q[4];
  }
};


const plurAdj = () => {
  document.querySelector("#centered-title").textContent = "Plural Adjective Cases";
  window.location.hash = "#plural-adjectives"
  var isError = false;

  if (fetchList.includes("adj") == false) {
    fetch("/wordbank/adjectives.json")
      .then((response) => response.json())
      .then((data) => {
        jsonAdj = data;
      })
      .catch((error) => {
        isError = true;
        console.error("Fetch error: ", error);
        document.getElementsByClassName("alert-holder")[0].style.display = "block";
        document.getElementById("question").textContent = "....";
        setTimeout(() => {
          plurAdj();
        }, 3000);
      })
      .finally(() => {
        if (!isError) {
          fetchList.push("adj");
          document.getElementsByClassName("alert-holder")[0].style.display = "none";
          let q = randomAdjective(jsonAdj, "p");
          document.getElementById("question").innerHTML = "Plural "+q[2]+" <b>"
                                                          +q[0]+"</b>"+" (\""
                                                          +q[1]+"\")";
          correctAnswer = q[4];
        }
      });
  } else {
    let q = randomAdjective(jsonAdj, "p");
    document.getElementById("question").innerHTML = "Plural "+q[2]+" <b>"
                                                    +q[0]+"</b>"+" (\""
                                                    +q[1]+"\")";
    correctAnswer = q[4];
  }
};


const pronoun = () => {
  document.querySelector("#centered-title").textContent = "Pronoun Cases";
  window.location.hash = "#pronouns"
  var isError = false;

  if (fetchList.includes("pro") == false) {
    fetch("/wordbank/pronouns.json")
      .then((response) => response.json())
      .then((data) => {
        jsonPronoun = data;
      })
      .catch((error) => {
        isError = true;
        console.error("Fetch error: ", error);
        document.getElementsByClassName("alert-holder")[0].style.display = "block";
        document.getElementById("question").textContent = "....";
        setTimeout(() => {
          pronoun();
        }, 3000);
      })
      .finally(() => {
        if (!isError) {
          fetchList.push("pro");
          document.getElementsByClassName("alert-holder")[0].style.display = "none";
          let q = randomPronoun(jsonPronoun);
          if (q[2] === undefined || q[2] == 0) {
            document.getElementById("question").innerHTML = q[1]+" <b>"+q[0]+"</b>";
            // No "(н)"
            if (q[3].substring(0, 3) == "(н)") {
              correctAnswer = q[3].slice(3);
            } else {
              correctAnswer = q[3];
            }
          } else if (q[2] == 1) {
            document.getElementById("question").innerHTML = q[1]+" <b>"+q[0]+"</b>"
                                                            +" (After preposition)";
            // Remove parenthesis from (н)
            correctAnswer = q[3].replace(/\(|\)/g, "");
          }
        }
      });
  } else {
    let q = randomPronoun(jsonPronoun);
    if (q[2] === undefined || q[2] == 0) {
      document.getElementById("question").innerHTML = q[1]+" <b>"+q[0]+"</b>";
      if (q[3].substring(0, 3) == "(н)") {
        correctAnswer = q[3].slice(3);
      } else {
        correctAnswer = q[3];
      }
    } else if (q[2] == 1) {
      document.getElementById("question").innerHTML = q[1]+" <b>"+q[0]+"</b>"
                                                      +" (After preposition)";
      // Remove parenthesis from (н)
      correctAnswer = q[3].replace(/\(|\)/g, "");
    }
  }
};


const possessive = () => {
  document.querySelector("#centered-title").textContent = "Possessive Pronoun + Сам Cases";
  window.location.hash = "#possessive-pronouns"
  var isError = false;

  if (fetchList.includes("poss") == false) {
    fetch("/wordbank/possessives+sam.json")
      .then((response) => response.json())
      .then((data) => {
        jsonPossess = data;
      })
      .catch((error) => {
        isError = true;
        console.error("Fetch error: ", error);
        document.getElementsByClassName("alert-holder")[0].style.display = "block";
        document.getElementById("question").textContent = "....";
        setTimeout(() => {
          possessive();
        }, 3000);
      })
      .finally(() => {
        if (!isError) {
          fetchList.push("poss");
          document.getElementsByClassName("alert-holder")[0].style.display = "none";
          let q = randomPossDemo(jsonPossess, "poss");
          document.getElementById("question").innerHTML = q[2]+" "+q[1]
                                                          +" <b>"+q[0]+"</b>";
          correctAnswer = q[3];
        }
      });
  } else {
    let q = randomPossDemo(jsonPossess, "poss");
    document.getElementById("question").innerHTML = q[2]+" "+q[1]
                                                    +" <b>"+q[0]+"</b>";
    correctAnswer = q[3];
  }
};


const demonstrative = () => {
  document.querySelector("#centered-title").textContent = "Demonstrative + Весь Cases";
  window.location.hash = "#demonstratives"
  var isError = false;

  if (fetchList.includes("demo") == false) {
    fetch("/wordbank/demonstratives+ves.json")
      .then((response) => response.json())
      .then((data) => {
        jsonDemonst = data;
      })
      .catch((error) => {
        isError = true;
        console.error("Fetch error: ", error);
        document.getElementsByClassName("alert-holder")[0].style.display = "block";
        document.getElementById("question").textContent = "....";
        setTimeout(() => {
          demonstrative();
        }, 3000);
      })
      .finally(() => {
        if (!isError) {
          fetchList.push("demo");
          document.getElementsByClassName("alert-holder")[0].style.display = "none";
          let q = randomPossDemo(jsonDemonst, "demo");
          document.getElementById("question").innerHTML = q[2]+" "+q[1]
                                                          +" <b>"+q[0]+"</b>";
          correctAnswer = q[3];
        }
      });
  } else {
    let q = randomPossDemo(jsonDemonst, "demo");
    document.getElementById("question").innerHTML = q[2]+" "+q[1]
                                                    +" <b>"+q[0]+"</b>";
    correctAnswer = q[3];
  }
};


const questionWord = () => {
  document.querySelector("#centered-title").textContent = "Question Word Cases";
  window.location.hash = "#question-words"
  var isError = false;

  if (fetchList.includes("ques") == false) {
    fetch("/wordbank/questionwords.json")
      .then((response) => response.json())
      .then((data) => {
        jsonQuestion = data;
      })
      .catch((error) => {
        isError = true;
        console.error("Fetch error: ", error);
        document.getElementsByClassName("alert-holder")[0].style.display = "block";
        document.getElementById("question").textContent = "....";
        setTimeout(() => {
          questionWord();
        }, 3000);
      })
      .finally(() => {
        if (!isError) {
          fetchList.push("ques");
          document.getElementsByClassName("alert-holder")[0].style.display = "none";
          let q = randomQuestionWord(jsonQuestion);
          if (q.length == 3) {
            document.getElementById("question").innerHTML = q[1]+" <b>"+q[0]+"</b>";
            correctAnswer = q[2];
          } else {
            document.getElementById("question").innerHTML = q[1]+" "+q[2]
                                                            +" <b>"+q[0]+"</b>";
            correctAnswer = q[3];
          }
        }
      });
  } else {
    let q = randomQuestionWord(jsonQuestion);
    if (q.length == 3) {
      document.getElementById("question").innerHTML = q[1]+" <b>"+q[0]+"</b>";
      correctAnswer = q[2];
    } else {
      document.getElementById("question").innerHTML = q[1]+" "+q[2]
                                                      +" <b>"+q[0]+"</b>";
      correctAnswer = q[3];
    }
  }
};


const comparative = () => {
  document.querySelector("#centered-title").textContent = "Comparative Creation";
  window.location.hash = "#comparatives"
  var isError = false;

  if (fetchList.includes("comp") == false) {
    fetch("/wordbank/comparatives.json")
      .then((response) => response.json())
      .then((data) => {
        jsonCompare = data;
      })
      .catch((error) => {
        isError = true;
        console.error("Fetch error: ", error);
        document.getElementsByClassName("alert-holder")[0].style.display = "block";
        document.getElementById("question").textContent = "....";
        setTimeout(() => {
          comparative();
        }, 3000);
      })
      .finally(() => {
        if (!isError) {
          fetchList.push("comp");
          document.getElementsByClassName("alert-holder")[0].style.display = "none";
          let q = randomComparative(jsonCompare);
          document.getElementById("question").innerHTML = "<b>"+q[0]+"</b> (\""
                                                          +q[1]+"\") → <div id='nobreaks'>____</div> (\""
                                                          +q[2]+"\")";
          correctAnswer = q[3];
        }
      });
  } else {
    let q = randomComparative(jsonCompare);
    document.getElementById("question").innerHTML = "<b>"+q[0]+"</b> (\""
                                                    +q[1]+"\") → <div id='nobreaks'>____</div> (\""
                                                    +q[2]+"\")";
    correctAnswer = q[3];
  }
};


const shortFormAdj = () => {
  document.querySelector("#centered-title").textContent = "Short Form Adjectives";
  window.location.hash = "#short-form-adjectives"
  var isError = false;

  if (fetchList.includes("shortFormAdj") == false) {
    fetch("/wordbank/short-form-adjectives.json")
      .then((response) => response.json())
      .then((data) => {
        jsonShortFormAdj = data;
      })
      .catch((error) => {
        isError = true;
        console.error("Fetch error: ", error);
        document.getElementsByClassName("alert-holder")[0].style.display = "block";
        document.getElementById("question").textContent = "....";
        setTimeout(() => {
          shortFormAdj();
        }, 3000);
      })
      .finally(() => {
        if (!isError) {
          fetchList.push("shortFormAdj");
          document.getElementsByClassName("alert-holder")[0].style.display = "none";
          let q = randomShortFormAdj(jsonShortFormAdj);
          document.getElementById("question").innerHTML = q[0]+" <b>"+q[1]+"</b>"
                                                          +" (\""+q[2]+"\")";
          correctAnswer = q[3];
        }
      });
  } else {
    let q = randomShortFormAdj(jsonShortFormAdj);
    document.getElementById("question").innerHTML = q[0]+" <b>"+q[1]+"</b>"
                                                    +" (\""+q[2]+"\")";
    correctAnswer = q[3];
  }
};


// Breakpoint from fetchers to extra \\


const checkAnswer = () => {
  let answer = document.getElementById("inputAnswer").value.toLowerCase();
  if (answer.replace(/\s/g, "") == correctAnswer.toLowerCase()) {
    document.getElementById("result").innerHTML =
      "Result: <span style='color: green;'>Correct!</span>";
  } else {
    document.getElementById("result").innerHTML =
      "Result: <span style='color: red;'>Incorrect - " +
      correctAnswer +
      "</span>";
  }

  // Disable button to prevent issues
  var checkButton = document.getElementById("check-button");
  checkButton.classList.remove('btn-outline-info');
  checkButton.classList.add('btn-outline-warning');
  checkButton.innerText = "Skip";
  checkButton.onclick = function() { resetForm(true); }

  // Wait 5 seconds for user to read corrected answer, then reset
  setTimeout(() => {
    resetForm(true);
  }, 5000);
};


// Onclick skip button, on change exercise, or 5s after clicking check-answer
const resetForm = (newQuestion) => {
  var id = window.setTimeout(function() {}, 0);
  while (id--) {
      window.clearTimeout(id);
  }

  // Remove error from past exercises
  document.getElementsByClassName("alert-holder")[0].style.display = "none";

  // Reset Result and input answer field
  document.getElementById("result").textContent = "Result: ";
  document.getElementById("inputAnswer").value = "";

  // Turn skip button back into check-button
  var checkButton = document.getElementById("check-button");
  checkButton.innerText = "Check";
  checkButton.classList.remove('btn-outline-warning');
  checkButton.classList.add('btn-outline-info');
  checkButton.onclick = checkAnswer;

  if (newQuestion == true) {
    // Find out which exercise we need to get a new question from
    // By looking at the current title that we set
    currExerciseType = document.querySelector("#centered-title").textContent;

    switch (currExerciseType) {
      case "Verb Conjugations":
        verb();
        break;
      case "Singular Noun Cases":
        singNoun();
        break;
      case "Plural Noun Cases":
        plurNoun();
        break;
      case "Singular Adjective Cases":
        singAdj();
        break;
      case "Plural Adjective Cases":
        plurAdj();
        break;
      case "Pronoun Cases":
        pronoun();
        break;
      case "Possessive Pronoun + Сам Cases":
        possessive();
        break;
      case "Demonstrative + Весь Cases":
        demonstrative();
        break;
      case "Question Word Cases":
        questionWord();
        break;
      case "Comparative Creation":
        comparative();
        break;
      case "Short Form Adjectives":
        shortFormAdj();
        break;
      default:
        verb();
        console.error("Something went wrong in resetForm()!");
    }
  }
};
