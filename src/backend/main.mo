import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Runtime "mo:core/Runtime";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data types
  public type MenuItem = {
    name : Text;
    description : Text;
    price : Text;
  };

  public type MenuCategory = {
    name : Text;
    items : [MenuItem];
  };

  public type Highlight = Text;
  public type Testimonial = Text;
  public type ContactInfo = {
    address : Text;
    phone : Text;
    hours : Text;
  };

  public type HomePageContent = {
    menuCategories : [MenuCategory];
    highlights : [Highlight];
    testimonials : [Testimonial];
    contactInfo : ContactInfo;
  };

  public type UserProfile = {
    name : Text;
  };

  let menuCategories = Map.empty<Text, MenuCategory>();
  let highlights = Map.empty<Nat, Highlight>();
  let testimonials = Map.empty<Nat, Testimonial>();
  var contactInfo : ?ContactInfo = null;
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Helper function for admin authorization
  func assertAdmin(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can perform this action");
    };
  };

  // User profile endpoints
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Query endpoints for client to fetch content (public access)
  public query func getMenuCategories() : async [MenuCategory] {
    menuCategories.values().toArray();
  };

  public query func getHighlights() : async [Highlight] {
    highlights.values().toArray();
  };

  public query func getTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };

  public query func getContactInfo() : async ?ContactInfo {
    contactInfo;
  };

  // Admin endpoint to update content
  public shared ({ caller }) func updateHomePageContent(newContent : HomePageContent) : async () {
    assertAdmin(caller);

    // Clear and repopulate menu categories
    menuCategories.clear();
    for (category in newContent.menuCategories.values()) {
      menuCategories.add(category.name, category);
    };

    // Clear and repopulate highlights
    highlights.clear();
    for (i in Nat.range(0, newContent.highlights.size())) {
      highlights.add(i, newContent.highlights[i]);
    };

    // Clear and repopulate testimonials
    testimonials.clear();
    for (i in Nat.range(0, newContent.testimonials.size())) {
      testimonials.add(i, newContent.testimonials[i]);
    };

    // Update contact info
    contactInfo := ?newContent.contactInfo;
  };

  // Helper function to get full homepage content (public access)
  public query func getFullHomePageContent() : async HomePageContent {
    let categories = menuCategories.values().toArray();
    let highlightArray = highlights.values().toArray();
    let testimonialArray = testimonials.values().toArray();

    {
      menuCategories = categories;
      highlights = highlightArray;
      testimonials = testimonialArray;
      contactInfo = switch (contactInfo) {
        case (null) {
          {
            address = "Not available";
            phone = "Not available";
            hours = "Not available";
          };
        };
        case (?info) { info };
      };
    };
  };
};
