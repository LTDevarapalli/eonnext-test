import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

import loginvisual from '../../../support/page_objects/visual-testing-percy/login_visual_test_page.js';
import Homepage from '../../../support/page_objects/homepage.page.js';


const homepage = new Homepage();
const logvis = new loginvisual();
Given(/^Navigate to eonnext website$/, () => {
  homepage.openWebsite();
  homepage.verifyCookieBannerButtons();
  homepage.acceptCookies();
  logvis.takeScreenshot();
  //logvis.verifyNavigationHeader();
 
  })
  