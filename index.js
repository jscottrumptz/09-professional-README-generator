// Packages needed for this application
const inquirer = require('inquirer');
const generateReadme = require('./src/readme-template.js');
const writeToFile = require('./utils/writeToFile.js');

// Create an array of questions for user input
const promptUser = () => {
    return inquirer.prompt([
    {
        type: 'input',
        name: 'userName',
        message: 'What is your name? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Your name is required.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'userGithub',
        message: 'What is your GitHub Username? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Your GitHub username is required');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'userEmail',
        message: 'What is a good contact email for questions? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Your email is required');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'repoName',
        message: `What is your project's GitHub repository name? (Required)`,
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log(`Your project's GitHub repository name is required`);
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'projTitle',
        message: `What is your project's title? (Required)`,
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log(`At a minimum, your project's README needs a title...`);
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'projDescription',
        message: 'Enter a project description explaining the what, why, and how. (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log(`At a minimum, your project's README needs a description...`);
                return false;
            }
        }
    }
  ]);
};

const installTrigger = readmeData => {
  readmeData.installTrigger = [];
  readmeData.installSteps = [];
  stepNum = 0;

  return inquirer.prompt([
      {
          type: 'confirm',
          name: 'confirmInstall',
          message: 'Do you have installation instructions?',
          default: true
        }
  ])
  .then(triggerData => {
    // push data into the array
    readmeData.installTrigger.push(triggerData);
    // check if they want to add installation instructions
    if (triggerData.confirmInstall) {
        // if so, pass the array through promptInstall function
        return promptInstall(readmeData);
      } else {
          // if not, pass the array through promptUsage function
          return promptUsage(readmeData);
      }
  });
};

const promptInstall = readmeData => {
    stepNum++;
    console.log(`
        ====================
        Installation Step ${stepNum}
        ====================
    `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: `What is the title of step ${stepNum} in the installation of your project?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter an installation step title');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: `Provide a detailed description of step ${stepNum}`,
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a description!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'optional',
            message: 'Is this an optional step?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddStep',
            message: 'Is there another step needed for installation?',
            default: false
        }
    ])
    .then(stepData => {
        // push data into the array
        readmeData.installSteps.push(stepData);
        // check if they want to add another step
        if (stepData.confirmAddStep) {
            // if so, call the function again passing the array back through the function
            return promptInstall(readmeData);
        } else {
            // return the array
            return readmeData;
        }
    });
};

const promptUsage = readmeData => {
    if (!readmeData.usage) {
        readmeData.usage = [];
    } else {
      return readmeData;
    }

    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmLink',
            message: 'Do you have a deployed link?',
            default: true
          },
          {
            type: 'input',
            name: 'link',
            message: 'Enter link to deployed application: ',
            when: ({ confirmLink }) => {
                if (confirmLink) {
                  return true;
                } else {
                  return false;
                }
            },
            validate: link => {
              if (link) {
                  return true;
              } else {
                  console.log('Please enter a link to deployed application');
                  return false;
              }
          }
        },
        {
            type: 'confirm',
            name: 'confirmScrnSht',
            message: 'Do you have a screenshot of the application?',
            default: false
        },
        {
            type: 'input',
            name: 'scrnSht',
            message: 'Enter the image path: ',
            when: ({ confirmScrnSht }) => {
                if (confirmScrnSht) {
                  return true;
                } else {
                  return false;
                }
            },
            validate: scrnSht => {
              if (scrnSht) {
                  return true;
              } else {
                  console.log('Please enter the image path');
                  return false;
              }
          }
        },
        {
            type: 'input',
            name: 'instructions',
            message: 'Provide usage instructions and examples for use: ',
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log('Usage instructions are required.');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'license',
            message: 'Please select a license type.',
            choices: ['None', 'Apache License 2.0', 'GNU General Public License v3.0', 'MIT License', 'BSD 2-Clause "Simplified" License', 'BSD 3-Clause "New" or "Revised" License', 'Boost Software License 1.0', 'Creative Commons Zero v1.0 Universal', 'Eclipse Public License 2.0', 'GNU Affero General Public License v3.0', 'GNU General Public License v2.0', 'GNU Lesser General Public License v2.1', 'Mozilla Public License 2.0', 'The Unlicense']
        },
        {
            type: 'confirm',
            name: 'confirmContribute',
            message: 'Would you like other developers to contribute?',
            default: true
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Leave blank to use The Contributor Covenant, or write your own guidelines for how to contribute here: ',
            when: ({ confirmContribute }) => {
                if (confirmContribute) {
                  return true;
                } else {
                  return false;
                }
            }
        },
    ])
    .then(usageData => {
        readmeData.usage.push(usageData);
        return readmeData;
    });
};

const promptCredits = readmeData => {

    if (!readmeData.collaborators) {
        readmeData.collaborators = [];
    }

    return inquirer.prompt([
    {
        type: 'confirm',
        name: 'confirmCredits',
        message: 'Do you need to recognize another collaborator?',
        default: false,
      },
    {
        type: 'input',
        name: 'collaborator',
        message: 'Collaborator name: ',
        when: ({ confirmCredits }) => {
            if (confirmCredits) {
              return true;
            } else {
              return false;
            }
        }
    },
    {
        type: 'input',
        name: 'collabGitHub',
        message: 'Collaborator GitHub profile name: ',
        when: ({ confirmCredits }) => {
            if (confirmCredits) {
              return true;
            } else {
              return false;
            }
        }
    }
  ])
  .then(thirdPartyData => {
    // push data into the array
    readmeData.collaborators.push(thirdPartyData);
        // check if they want to add another step
        if (thirdPartyData.confirmCredits) {
            // if so, call the function again passing the array back through the function
            return promptCredits(readmeData);
        } else {
            // return the array
            return readmeData;
        }
    });
};

const promptThirdParty = readmeData => {

  if (!readmeData.thirdParty) {
      readmeData.thirdParty = [];
  }

  return inquirer.prompt([
  {
      type: 'confirm',
      name: 'confirmThirdParty',
      message: 'Do you need to recognize another third-party asset that requires attribution?',
      default: false,
    },
  {
      type: 'input',
      name: 'thirdParty',
      message: 'Third party asset: ',
      when: ({ confirmThirdParty }) => {
          if (confirmThirdParty) {
            return true;
          } else {
            return false;
          }
      }
  },
  {
      type: 'input',
      name: 'thirdPartyLink',
      message: 'Link to their primary web presence: ',
      when: ({ confirmThirdParty }) => {
          if (confirmThirdParty) {
            return true;
          } else {
            return false;
          }
      }
  }
])
.then(thirdPartyData => {
  // push data into the array
  readmeData.thirdParty.push(thirdPartyData);
      // check if they want to add another step
      if (thirdPartyData.confirmThirdParty) {
          // if so, call the function again passing the array back through the function
          return promptThirdParty(readmeData);
      } else {
          // return the array
          return readmeData;
      }
  });
};

const promptTutorial = readmeData => {

  if (!readmeData.tutorial) {
      readmeData.tutorial = [];
  }

  return inquirer.prompt([
  {
      type: 'confirm',
      name: 'confirmTutorial',
      message: 'Do you need to recognize another turorial or resource?',
      default: false,
    },
  {
      type: 'input',
      name: 'tutorial',
      message: 'Tutorial or resource asset: ',
      when: ({ confirmTutorial }) => {
          if (confirmTutorial) {
            return true;
          } else {
            return false;
          }
      }
  },
  {
      type: 'input',
      name: 'tutorialLink',
      message: 'Link to tutorial or resource: ',
      when: ({ confirmTutorial }) => {
          if (confirmTutorial) {
            return true;
          } else {
            return false;
          }
      }
  }
])
.then(tutorialData => {
  // push data into the array
  readmeData.tutorial.push(tutorialData);
      // check if they want to add another step
      if (tutorialData.confirmTutorial) {
          // if so, call the function again passing the array back through the function
          return promptThirdParty(readmeData);
      } else {
          // return the array
          return readmeData;
      }
  });
};

const promptFeatures = readmeData => {
    if (!readmeData.features) {
        readmeData.features = [];
    }

    return inquirer.prompt([
    {
        type: 'confirm',
        name: 'confirmFeature',
        message: 'Would you like to list a feature?',
        default: false,
      },
    {
        type: 'input',
        name: 'featureName',
        message: 'Feature name: ',
        when: ({ confirmFeature }) => {
            if (confirmFeature) {
              return true;
            } else {
              return false;
            }
        }
    },
    {
        type: 'input',
        name: 'featureDescription',
        message: 'Describe the feature: ',
        when: ({ confirmFeature }) => {
            if (confirmFeature) {
              return true;
            } else {
              return false;
            }
        }
    }
  ])
  .then(featureData => {
    // push data into the array
    readmeData.features.push(featureData);
        // check if they want to add another step
        if (featureData.confirmFeature) {
            // if so, call the function again passing the array back through the function
            return promptFeatures(readmeData);
        } else {
            // return the array
            return readmeData;
        }
    });
};

const promptTests = readmeData => {
    if (!readmeData.tests) {
        readmeData.tests = [];
    }

    return inquirer.prompt([
    {
        type: 'confirm',
        name: 'confirmTest',
        message: 'Would you like to include a test for your application?',
        default: false,
      },
    {
        type: 'input',
        name: 'test',
        message: 'Write test: ',
        when: ({ confirmTest }) => {
            if (confirmTest) {
              return true;
            } else {
              return false;
            }
        }
    },
    {
        type: 'input',
        name: 'testExample',
        message: 'Provide and example of how to run it: ',
        when: ({ confirmTest }) => {
            if (confirmTest) {
              return true;
            } else {
              return false;
            }
        }
    }
  ])
  .then(testData => {
    // push data into the array
    readmeData.tests.push(testData);
        // check if they want to add another step
        if (testData.confirmTest) {
            // if so, call the function again passing the array back through the function
            return promptTests(readmeData);
        } else {
            // return the array
            return readmeData;
        }
    });
};

//Create a function to initialize app
function init() {
    promptUser()
    .then(installTrigger)
    .then(promptUsage)
    .then(promptCredits)
    .then(promptThirdParty)
    .then(promptTutorial)
    .then(promptFeatures)
    .then(promptTests)
    .then(readmeData => {
        return generateReadme(readmeData);
    })
    .then(pageMarkdown => {
        return writeToFile(pageMarkdown);
    })
    .catch(err => {
        console.log(err);
    });
}

//// Function call to initialize app
// init();



///// DELETE BELOW /////

const mockData = {
    userName: 'J Scott Rumptz',
    userGithub: 'jscottrumptz',
    userEmail: 'jscott@rumptz.tech',
    repoName: 'date-night-generator',
    projTitle: 'Date Night Generator',
    projDescription: 'Get suggestions for great movie, meal and drink combinations and save your favorite groupings to a date night queue.',
    installTrigger: [
      {
        confirmInstall: true
      }
    ],
    installSteps: [
      {
        title: 'Open Browser',
        description: 'Open your favorite web browser on your phone, tablet, or computer.',
        optional: false,
        confirmAddStep: false
      },
      {
        title: 'Navigate to the Webpage',
        description: 'Enter https://jscottrumptz.github.io/date-night-generator/ in the address bar.',
        optional: false,
        confirmAddStep: true
      },
      {
        title: 'Grab a Partner',
        description: 'Call your significant other over to assist in the process.',
        optional: true,
        confirmAddStep: false
      }
    ],
    usage: [
      {
        confirmLink: true,
        link: 'https://jscottrumptz.github.io/date-night-generator/',
        confirmScrnSht: true,
        scrnSht: 'https://user-images.githubusercontent.com/74981245/106368421-efdf1a80-630e-11eb-938c-a2f3f6249f80.png',
        instructions: 'Select by category and hit "Replace" to generate a random movie, meal, or drink selection. Keep hitting "Replace" until you find a suggestion you like, then move on to another item. After putting together a suitable trio, hit "Save Current Picks" to add them permanently to your Date Night Queue!',
        license: 'BSD 3-Clause "New" or "Revised" License',
        confirmContribute: true,
        contributing: ''
      }
    ],
    collaborators: [
      {
        confirmCredits: true,
        collaborator: 'Cheryl Fogerty',
        collabGitHub: 'CherylFogerty'
      },
      {
        confirmCredits: true,
        collaborator: 'Jared Taylor',
        collabGitHub: 'jmtaylor115'
      },
      {
        confirmCredits: true,
        collaborator: 'Sean Johnson',
        collabGitHub: 'seanjohnson95'
      },
      { confirmCredits: false }
    ],
    thirdParty: [
      {
        confirmThirdParty: true,
        thirdParty: 'Bulma',
        thirdPartyLink: 'https://bulma.io/'
      },{
        confirmThirdParty: true,
        thirdParty: 'The Movie Database',
        thirdPartyLink: 'https://themoviedb.org'
      },
      {
        confirmThirdParty: true,
        thirdParty: 'The Meal Database',
        thirdPartyLink: 'https://themealdb.com'
      },
      {
        confirmThirdParty: true,
        thirdParty: 'The Cocktail Database',
        thirdPartyLink: 'https://thecocktaildb.com'
      },
      { confirmThirdParty: false }
    ],
    tutorial: [
      {
        confirmTutorial: true,
        tutorial: 'Bulma Documentation',
        tutorialLink: 'https://bulma.io/documentation/'
      },
      { confirmTutorial: false }
    ],
    features: [
      {
        confirmFeature: true,
        featureName: 'Get Random Suggestions',
        featureDescription: 'Get random movie, meal and drink suggestions based on genres, categories, or countries.'
      },
      {
        confirmFeature: true,
        featureName: 'Featured Item View',
        featureDescription: 'Displays the most pertinent information in the featured item view.'
      },
      {
        confirmFeature: true,
        featureName: 'Detail View',
        featureDescription: 'Drill down to a detail view for recipe instructions or videos.'
      },
      {
        confirmFeature: true,
        featureName: 'Printer Friendly',
        featureDescription: 'In detail view, print the recipes with only text to be printer-ink-friendly.'
      },
      {
        confirmFeature: true,
        featureName: 'Save the Date',
        featureDescription: 'Save all items in the featured view as a date night and place them in the Date Night Queue.'
      },
      {
        confirmFeature: true,
        featureName: 'Date Night Queue',
        featureDescription: "Add or delete date nights from the user's local storage. Clicking previously saved date nights repopulates the featured item view with their details."
      },
      {
        confirmFeature: true,
        featureName: 'Responsive',
        featureDescription: 'The application is responsive and mobile friendly.'
      },
      { confirmFeature: false }
    ],
    tests: [
      {
        confirmTest: true,
        test: 'Visit the application generate and execute a random date-night.',
        testExample: 'Go to the website. Generate a random date-night. Execute the date-night. Enjoy yourselves. Repeat.'
      },
      {
        confirmTest: true,
        test: 'Log results.',
        testExample: 'Keep a journal under lock and key.'
      },
      { confirmTest: false }
    ]
};

const markdownTest = generateReadme(mockData);
writeToFile(markdownTest);