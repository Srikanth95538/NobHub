import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
export default class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Features: false,
      Termsofservice: false,
      privacypolicy: false,
      FAQs: false,
      Tutorial: false,
      Feedback: false,
    };
  }
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: navigation.getParam('IsFrom'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', 'white'),
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#029fae'),
    };
  };
  componentDidMount = () => {
    const {navigation} = this.props;
    const IsFrom = navigation.getParam('IsFrom', 0);
    if (IsFrom == 'Features') {
      this.setState({Features: true});
    }
    if (IsFrom == 'Termsofservice') {
      this.setState({Termsofservice: true});
    }
    if (IsFrom == 'privacypolicy') {
      this.setState({privacypolicy: true});
    }
    if (IsFrom == 'FAQs') {
      this.setState({FAQs: true});
    }
    if (IsFrom == 'Tutorial') {
      this.setState({Tutorial: true});
    }
    if (IsFrom == 'Feedback') {
      this.setState({Feedback: true});
    }
  };
  GetFeatures() {
    return (
      <ScrollView>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              Exchange your phone number with your
              Professionals/Friends/Families around the world with a click of a
              button. Save customers and business associate information
              seamlessly
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              Set the search radius to your desired settings, look around and
              meet the people at any event, connect and celebrate the
              relationship forever.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>Create your virtual business card with a single click</Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              Select your desired Virtual Business Card from hundreds of design
              templates.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              Fast and easy sign up/Sign in, and choose your desired business
              card, then you are good to go.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              Share your business card across the globe and never lose your
              customers, friends and family members.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              Customize your business card and upload your company logo &
              Profile Picture.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              Choose your display settings on your business card, Enable or
              Disable data.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              Invite Friends/Families/Professionals from your
              phone/email/LinkedIn/F/Instagram accounts to NobHub.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              Setup meetings with multiple customers, App will do the rest and
              sync up with calendar and set the reminders.
            </Text>
          </View>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              Voice call straight from your business card through your
              phone/WhatsApp/Skype/ any voice calling mobile application.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              View user public blogs/Facebook/ LinkedIn/Instagram profiles,
              straight from your business card.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              One click to share business card to hundreds of customers.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>Save customers and business associate info seamlessly.</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  GetTermsofservice() {
    return (
      <ScrollView>
        <View style={{flexDirection: 'column'}}>
          <View style={{margin: 10}}>
            <Text>
              NobHub, a product of Nob Hub Incorporation thereby makes the
              “Site” (websites including, without restriction, www.nobhub.com
              and all its subdomains), Mobile Application and Services
              “including without restriction, payment, logs for practices,
              individual and global statistical data, location services, contact
              management, business card distribution) to enable business owners
              and professionals design virtual business cards, store and share
              business information of contacts with a single click. Access to
              and the use of NobHub Site, Mobile Application and Services and
              also future Sites, Mobile Application or Services rendered by
              NobHub is governed by this Terms of Use and User’s Agreement
              (“this Agreement”).
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>Notice of Agreement</Text>
          </View>
          <View style={{height: 5}} />
          <View style={{margin: 10}}>
            <Text>
              “…Any participation in this service whether through the website or
              the mobile application will signify the acceptance of this
              agreement…”
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>Acceptance of Terms</Text>
          </View>
          <View style={{margin: 10}}>
            <Text>
              "BY ACCESSING AND USING THIS SERVICE, YOU ACCEPT AND CONSENT TO BE
              BOUND BY THE TERMS AND PROVISION OF THIS AGREEMENT. ALSO, WHEN
              USING THESE PARTICULAR SERVICES, YOU SHALL BE SUBJECT TO ANY
              POSTED GUIDELINES OR RULES APPLICABLE TO SUCH SERVICES. ANY
              PARTICIPATION IN THIS SERVICE WILL CONSTITUTE UNDERSTANDING AND
              ACCEPTANCE OF THIS AGREEMENT.”
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>
              If you are a free user, or are accessing the Site to use as a
              premium member of the Services or Mobile Application, or are
              otherwise browsing the Site, this Agreement is between you,
              exclusively, and Manbrosys LLC. Acceptance of this agreement
              indicates that you fully understand and agree to the terms written
              therein. Do not proceed with the use of these services if you do
              not agree.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  GetPrivacyPolicy() {
    return (
      <ScrollView>
        <View style={{flexDirection: 'column'}}>
          <View style={{margin: 10}}>
            <Text>
              You acknowledge that in accepting these Terms of Use, you do not
              rely on any statement, representation, assurance or warranty
              (whether made innocently or negligently) that is NOT set out in
              these Terms of Use or our Privacy Policy.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>
              NobHub has no obligation to collect personally identifiable
              information from you otherwise you have exclusively given such
              information to NobHub.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>
              NobHub’s information practices are further defined in its privacy
              policy, which is available at nobhub.com/privacy policy (the
              “Privacy Policy”). The Privacy Policy is an essential part of this
              Agreement and is integrated explicitly by reference, and by
              entering into this Agreement you agree to all of the terms of the
              Privacy Policy, and (ii) NobHub’s use of data as defined in the
              Privacy Policy is not an attempt to infringe on your right to
              privacy or publicity rights.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>Security and Registration</Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>
              NobHub understands that by completing the registration process for
              any of our given services whether, via our Website or Mobile
              Application, you agree to subscribe to the selected services
              concerning terms of service of this agreement. You agree to
              provide NobHub accurate and complete registration information
              without any misleading or false personality. In case of any
              changes to your registration details, you shall promptly notify
              NobHub. You shall exclusively take responsibility for the security
              and appropriate use of all user IDs, passwords or other security
              strategies used in connecting with the Site and the Services, and
              shall take all precautionary steps to ensure that they are kept.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>Fees, Payment, and Free Memberships</Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>
              Accessing NobHub either through the Site or Mobile Application
              takes two forms i. Free Membership ii. Premium Membership which is
              defined below;
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>
              For free membership, you shall be allowed to use the app for its
              intended purpose which is as a virtual business card app on
              agreeing to the terms of service guiding the use of our services
              and according to our privacy policy. As a free member, the use of
              our services shall be duly restricted to you, and you may
              occasionally see some advertisements through which we generate our
              revenue. You can, therefore, upgrade to premium membership to
              thoroughly enjoy our services with no form of advert placement.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>
              For Premium membership, upon the acceptance of our terms of
              service and privacy policy, you will be directed to register by
              submitting your data as described in our privacy policy after
              which you will be subjected to paying a certain fee as stated in
              our Site or on our Mobile Application.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>
              As a Premium member, you enjoy the full service our website and
              application have to offer, and you may not receive any form of
              advertisement.
            </Text>
          </View>
          <View style={{margin: 10}}>
            <Text>
              Making payment for your service can be carried out through your
              debit card or using a third-party payment platform such as PayPal.
              You have the right to agree to the terms provided by the
              third-part we decide to use, and NobHub will not be held
              responsible for any uncertainties that may occur as a result of
              using such a third party.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{margin: 10}}>
            <Text>
              NobHub reserves the right to revise the fees by either addition or
              reduction in the charge at any time. However, you will be notified
              of such a development some days before the renewal of your
              subscription which we may notify you through the email, pop up
              notification on our Mobile App or our site. You hold the right to
              either cancel or renew your subscription.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>
              One click to share business card to hundreds of customers.
            </Text>
          </View>
          <View style={{height: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 18}}>{'\u2022 \t'}</Text>
            <Text>Save customers and business associate info seamlessly.</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  render() {
    const {navigation} = this.props;
    const IsFrom = navigation.getParam('IsFrom', 0);
    return (
      <View style={{flex: 1}}>
        {IsFrom == 'Features' ? this.GetFeatures() : null}
        {IsFrom == 'Terms of service' ? this.GetTermsofservice() : null}
      </View>
    );
  }
}
