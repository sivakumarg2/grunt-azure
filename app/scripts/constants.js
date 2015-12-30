(function () {

  'use strict';
  var Implementation;
  //var api_root = "http://idna-ima-dev.azurewebsites.net";
    //var api_root = "http://59.145.122.172"
  var api_root = "http://192.168.178.86:8080"

  angular.module('ima-app').constant('API', {
      users: api_root + "/api/Users",
      ideas: api_root + "/api/ideas",
      myIdeas: api_root + "/api/user",
      companyIdeas: api_root + "/api/company",
      companies: api_root + "/api/Companies",
      businessUnits: api_root + "/api/BUnits",
      themes: api_root + "/api/Themes",
      login: api_root + "/api/login",
      recover: api_root + "/api/forgotpassword",
      reset: api_root + "/api/resetpassword",
      businessModels: api_root + "/api/ideas/:idea_id/business_model_lite",
      insights: api_root + "/api/ideas/:idea_id/insight_lite",
      solutions: api_root + "/api/ideas/:idea_id/solution_lite",
      problems: api_root + "/api/ideas/:idea_id/problem_lite",
      uploadIdeaImage: api_root + "/api/idea/image_upload",
      uploadIdeaAttachment: api_root + "/api/attachment/upload",
      attachment: api_root + "/api/attachments",
      removeAttachment: api_root + "/api/Attachments",
      teamMembers: api_root + "/api/ideas/:idea_id/team_members",
      uploadAvatar: api_root + "/api/avatars",
      tags: api_root + "/api/tags",
      taggables: api_root + "/api/taggables",
      ideaGroup: api_root + "/api/user/:user_id",
      comments: api_root + "/api/comments/idea/:idea_id",
      commentDelete: api_root + "/api/comments/:id/idea/:idea_id",
      votes: api_root + "/api/votes/idea/:idea_id",
	  follows: api_root + "/api/users/:user_id/followings",
  });

  angular.module('ima-app').constant('IMETHOD_LITE_QUESTIONS', {
        insight:{
            id:"",
            questions:[
            {
                q:'What are the objectives (in-scope) and constraints (out-of-scope) for this idea?',
                tooltip:'Lorem',
                field:'objectives',
                type:'text',
                placeholder: 'Lorem',
                c:true,
                a:''
            },
            {
                q:'What is your vision for this idea?',
                tooltip:'Lorem',
                field:'vision',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            }]
        },
        problem:{
            id:"",
            questions:[
            {
                q:'How does this create value for customers?',
                tooltip:'Lorem',
                field:'value',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            },
            {
                q:'Who does this idea benefit (i.e. what customer segments)',
                tooltip:'Lorem',
                field:'benefit',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            },
            {
                q:'Who has expressed interest in this idea?',
                tooltip:'Lorem',
                field:'interest',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            },
            {
                q:'What problems / pain points / jobs-to-be-done does this address for customers?',
                tooltip:'Lorem',
                field:'jobs_to_be_done',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            },
            {
                q:'Do you have feedback on what customers care about?',
                tooltip:'Lorem',
                field:'feedback',
                type:'checkbox',
                placeholder: 'Lorem',
                c: true,
                a:0
            },
            {
                q:'Do you have a persona and journeyline completed (need to limit to key foothold customers)?',
                tooltip:'Lorem',
                field:'persona',
                type:'checkbox',
                placeholder: 'Lorem',
                c: true,
                a:0
            }
        ]},
        solution:{
            id:"",
            questions:[
            {
                q:'What are the technical uncertainties of your idea?',
                tooltip:'Lorem',
                field:'technical_uncertainty',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            },
            {
                q:'What are the demand uncertainties of your idea?',
                tooltip:'Lorem',
                field:'demand_uncertainty',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            },
            {
                q:'What are the external uncertainties of your idea?',
                tooltip:'Lorem',
                field:'external_uncertainty',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            },
            {
                q:'What are the high risk assumptions of your idea?',
                tooltip:'Lorem',
                field:'assumptions',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            },
            {
                q:'How well do we understand this market? Is it established or nascent? Does UTC currently play in this market?',
                tooltip:'Lorem',
                field:'market',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            },
            {
                q:'Do you have a theoretical / virtual prototype?',
                tooltip:'Lorem',
                field:'prototype',
                type:'checkbox',
                placeholder: 'Lorem',
                c: true,
                a:0
            },
            {
                q:'What key attributes of your solution will deliver the value?',
                tooltip:'Lorem',
                field:'key_attributes',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            }
        ]},
        business_model:{
            id:"",
            questions:[
            {
                q:'What resources are needed to take this forward?',
                tooltip:'Lorem',
                field:'resources',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            },
            {
                q:'What is the potential business value to UTC?',
                tooltip:'Lorem',
                field:'business_value',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            },
            {
                q:'What is the competitive landscape for this idea? Are other companies pursuing this idea? What trends or technologies are there that support this idea?',
                tooltip:'Lorem',
                field:'competitive_landscape',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            },
            {
                q:'What partners (if any) are needed to make this idea successful?',
                tooltip:'Lorem',
                field:'partners',
                type:'text',
                placeholder: 'Lorem',
                c: true,
                a:''
            }

        ]}
    });

  angular.module('ima-app').constant('CHECKLIST', [
    {
      module_name: "Idea",
      icon: "fa-lightbulb-o",
      tasks: [
        "Title",
        "Description",
        "Picture"
      ],
      weights: [10,10,10],
      required: [false, false, false]
    },
    {
      module_name: "Vision",
      icon: "fa-eye",
      tasks: [
        "Questionstorm",
        "Craft Vision: Remember the Future",
        "Identify Key Stakeholders & Customers",
        "Conduct Initial Advice Interviews",
        "Define Innovation Challenge: In- and Out-of-Scope"
      ],
      weights: [10,10,10,10,10],
      required: [false, true, true, false, true]
    },
    {
      module_name: "Problem",
      icon: "fa-puzzle-piece",
      tasks: [
        "Craft Customer Personas",
        "Create Customer Journeylines",
        "Conduct 4-6 Advice Interviews",
        "Conduct 2-3 Contextual Interviews",
        "Conduct 1-2 Ethnographic Excursions"
      ],
      weights: [10,10,10,10,10],
      required: [false, false, true, false, true]
    },
    {
      module_name: "Solution",
      icon: "fa-wrench",
      tasks: [
        "Solutionstorm",
        "Synthesize & Affinity Diagram",
        "Define & Rank Assumptions",
        "Design Experiments",
        "Develop Prototypes",
        "Run Experiments"
      ],
      weights: [10,10,10,10,10,10],
      required: [false, true, true, true, false, false]
    },
    {
      module_name: "Business Model",
      icon: "fa-line-chart",
      tasks: [
        "Define Business Model",
        "Apply Business Model Levers",
        "Define & Rank Assumptions",
        "Design Experiments",
        "Develop Prototypes",
        "Run Experiments"
      ],
      weights: [10,10,10,10,10,10],
      required: [false, true, true, true, true, false]
    },
    {
      module_name: "Pitch",
      icon: "fa-bar-chart",
      tasks: [
        "Review",
        "Print"
      ],
      weights: [10, 10],
      required: [false, false]
    },
  ]);

  angular.module('ima-app').constant('NAMER', {
    adjectives: ['Crispy', 'Strident', 'Sneaky', 'Equanimous', 'Rap', 'Octo', 'Taciturn', 'Arcadian', 'Garrulous', 'Redolent'],
    nouns: ['Sword', 'Sniffle', 'Wookie', 'Tuna', 'Robot', 'Chainsaw', 'Rutabaga', 'Lamp', 'Guacamole', 'Capacitor']
  })

  angular.module('ima-app').constant('TEAM_MEMBER_ROLES', [
    'Admin', 'Contributor'
  ])

  angular.module('ima-app').constant('TYPE_OF_OFFERING', [
    {id: 1, name: 'Product'},
    {id: 2, name: 'Service'},
    {id: 3, name: 'External Process'},
    {id: 4, name: 'Internal Process'},
    {id: 5, name: 'Other'},
  ]);

  angular.module('ima-app').constant('PRODUCT_PLATFORM', [
    {id:1, name: 'Elevator / Escalator'},
    {id:2, name: 'Taylor'},
    {id:3, name: 'Compressor'},
    {id:4, name: 'Transicold'},
    {id:5, name: 'HVAC'},
    {id:6, name: 'Refrigeration'},
    {id:7, name: 'Fire Suppression'},
    {id:8, name: 'Video, Intrusion, and Communications'},
    {id:9, name: 'Hazard Detection and Notification'},
    {id:10, name: 'Combustion and Ignition'},
    {id:11, name: 'Access / Entry Control'}
  ]);

  angular.module('ima-app').constant('CUSTOMER_SEGMENT', [
    // Elevator/Escalator
    {id: 1, name: 'Residential', product_platform_ids: [1, 3, 5, 7, 8, 9, 10, 11]},
    {id: 2, name: 'Commercial', product_platform_ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]},
    {id: 3, name: 'Industrial', product_platform_ids: [2, 3, 4, 7, 9, 10]},
    {id: 4, name: 'Hospitality', product_platform_ids: [1, 2, 5, 8, 9, 11]},
    {id: 5, name: 'Marine', product_platform_ids: [1, 3, 5, 6, 7, 9, 10]},
    {id: 6, name: 'Transport', product_platform_ids: [6]},
    {id: 7, name: 'Other', product_platform_ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
  ]);

  angular.module('ima-app').constant('PRODUCT_CATEGORY', [
    {id:3, name: 'Escalator / Moving Walkway', product_platform_ids: [1]},
    {id:4, name: 'Elevator: Model', product_platform_ids: [1]},
    {id:5, name: 'Elevator: Landmark', product_platform_ids: [1]},
    {id:6, name: 'Elevator: All', product_platform_ids: [1]},
    {id:7, name: 'Service / REM / Elite', product_platform_ids: [1]},
    {id:8, name: 'Modernization Products', product_platform_ids: [1]},
    {id:9, name: 'Elevator: Super High Rise', product_platform_ids: [1]},
    {id:10, name: 'Passenger Interface', product_platform_ids: [1]},

    {id:12, name: 'Soft Serve / Combo / Shake / Thick Shake', product_platform_ids: [2]},
    {id:13, name: 'Custard', product_platform_ids: [2]},
    {id:14, name: 'Grilling', product_platform_ids: [2]},
    {id:15, name: 'Frozen Beverage', product_platform_ids: [2]},
    {id:16, name: 'Juice Dispenser', product_platform_ids: [2]},
    {id:17, name: 'Diary Dispenser', product_platform_ids: [2]},
    {id:18, name: 'Hot Beverage', product_platform_ids: [2]},
    {id:19, name: 'Taylor - New / Unknown / Other', product_platform_ids: [2]},

    {id:21, name: 'Recip - Open', product_platform_ids: [3]},
    {id:22, name: 'Recip - Semi Herm', product_platform_ids: [3]},
    {id:23, name: 'Recip - Compressor CO2', product_platform_ids: [3]},
    {id:24, name: 'Screw', product_platform_ids: [3]},
    {id:25, name: 'Rotary', product_platform_ids: [3]},
    {id:26, name: 'Scroll', product_platform_ids: [3]},
    {id:27, name: 'Centrifugal', product_platform_ids: [3]},
    {id:28, name: 'Expander', product_platform_ids: [3]},
    {id:29, name: 'Ejector', product_platform_ids: [3]},
    {id:30, name: 'Pump', product_platform_ids: [3]},
    {id:31, name: 'Compressor: New / Unknown / Other', product_platform_ids: [3]},

    {id:33, name: 'Container * Top 20 Ports Country', product_platform_ids: [4]},
    {id:34, name: 'Container CO2', product_platform_ids: [4]},
    {id:35, name: 'Genset', product_platform_ids: [4]},
    {id:36, name: 'Trailer', product_platform_ids: [4]},
    {id:37, name: 'Truck', product_platform_ids: [4]},
    {id:38, name: 'Direct Drive', product_platform_ids: [4]},
    {id:39, name: 'Transport AC (Bus, Rail, Train, Etc)', product_platform_ids: [4]},
    {id:40, name: 'Auxilary Power Units', product_platform_ids: [4]},
    {id:41, name: 'Transicold - New / Unknown / Other', product_platform_ids: [4]},

    {id:43, name: 'Chillers - All', product_platform_ids: [5]},
    {id:44, name: 'Chillers - Air-Cooled', product_platform_ids: [5]},
    {id:45, name: 'Chillers - Water-Cooled', product_platform_ids: [5]},
    {id:46, name: 'Chillers - Absorption', product_platform_ids: [5]},
    {id:47, name: 'Chillers - Centrifugal', product_platform_ids: [5]},
    {id:48, name: 'Chillers - Unknown / Other', product_platform_ids: [5]},
    {id:49, name: 'Packaged Products - All', product_platform_ids: [5]},
    {id:50, name: 'Packaged Products - Rooftop Unit', product_platform_ids: [5]},
    {id:51, name: 'Packaged Products - Packaged Terminal A/C & HP', product_platform_ids: [5]},
    {id:52, name: 'Packaged Products - Water Source & Geothermal Heat Pump', product_platform_ids: [5]},
    {id:53, name: 'Packaged Products - Indoor Self-Contained System & Floor by Floor', product_platform_ids: [5]},
    {id:54, name: 'Packaged Products - Small Packaged Product (SPP)', product_platform_ids: [5]},
    {id:55, name: 'Packaged Products - WRAC', product_platform_ids: [5]},
    {id:56, name: 'Packaged Products - Unknown / Other', product_platform_ids: [5]},
    {id:57, name: 'Split Systems - All', product_platform_ids: [5]},
    {id:58, name: 'Split Systems - Duct-Free', product_platform_ids: [5]},
    {id:59, name: 'Split Systems - Ducted', product_platform_ids: [5]},
    {id:60, name: 'Split Systems - Condesing Unit and Condensers', product_platform_ids: [5]},
    {id:61, name: 'Split Systems - Unknown / Other', product_platform_ids: [5]},
    {id:62, name: 'Fan Coils – Residential', product_platform_ids: [5]},
    {id:63, name: 'Fan Coils – Commercial', product_platform_ids: [5]},
    {id:64, name: 'Distributed Power Generation', product_platform_ids: [5]},
    {id:65, name: 'Air-Handling Units', product_platform_ids: [5]},
    {id:66, name: 'Air Terminals', product_platform_ids: [5]},
    {id:67, name: 'Chilled Beam', product_platform_ids: [5]},
    {id:68, name: 'Cased Evaporator Coils', product_platform_ids: [5]},
    {id:69, name: 'CO2 Data Center', product_platform_ids: [5]},
    {id:70, name: 'Indoor Air Quality Products', product_platform_ids: [5]},
    {id:71, name: 'Res Forced Air Heating / Furnace', product_platform_ids: [5]},
    {id:72, name: 'Water Heaters', product_platform_ids: [5]},
    {id:73, name: 'Carrier Controls System - Commercial (CCN and I-VU)', product_platform_ids: [5]},
    {id:74, name: 'Building Automation', product_platform_ids: [5]},
    {id:75, name: 'Accessories - Thermostats', product_platform_ids: [5]},
    {id:76, name: 'Accessories - Zone Controls', product_platform_ids: [5]},
    {id:77, name: 'Accessories - Indoor Air Quality ', product_platform_ids: [5]},
    {id:78, name: 'Accessories - Electric Heater', product_platform_ids: [5]},
    {id:79, name: 'Accessories - System Control', product_platform_ids: [5]},
    {id:80, name: 'Accessories - Unknown / Other', product_platform_ids: [5]},

    {id:82, name: 'Display Case - All', product_platform_ids: [6]},
    {id:83, name: 'Display Case - Vertical / Combination', product_platform_ids: [6]},
    {id:84, name: 'Display Case - Counter', product_platform_ids: [6]},
    {id:85, name: 'Display Case - Semi Vertical', product_platform_ids: [6]},
    {id:86, name: 'Display Case - Multi Deck', product_platform_ids: [6]},
    {id:87, name: 'Display Case - Island Side Cases', product_platform_ids: [6]},
    {id:88, name: 'Display Case - New / Unknown / Other', product_platform_ids: [6]},
    {id:89, name: 'Plug-in - All', product_platform_ids: [6]},
    {id:90, name: 'Plug-in - Vertical / Combination', product_platform_ids: [6]},
    {id:91, name: 'Plug-in - Counter', product_platform_ids: [6]},
    {id:92, name: 'Plug-in - Semi Vertical', product_platform_ids: [6]},
    {id:93, name: 'Plug-in - Multi Deck', product_platform_ids: [6]},
    {id:94, name: 'Plug-in - Island Side Cases', product_platform_ids: [6]},
    {id:95, name: 'Plug-in - New / Unknown / Other', product_platform_ids: [6]},
    {id:96, name: 'Rack Configuration - All', product_platform_ids: [6]},
    {id:97, name: 'Rack Configuration - Low Temp', product_platform_ids: [6]},
    {id:98, name: 'Rack Configuration - Medium Temp', product_platform_ids: [6]},
    {id:99, name: 'Rack Configuration - Booster', product_platform_ids: [6]},
    {id:100, name: 'Rack Configuration - Satelite', product_platform_ids: [6]},
    {id:101, name: 'Rack Configuration - Cascade', product_platform_ids: [6]},
    {id:102, name: 'Rack Configuration - New / Unknown / Other', product_platform_ids: [6]},
    {id:103, name: 'Condensers / Gas Coolers', product_platform_ids: [6]},
    {id:104, name: 'Condensers / Gas Coolers - Horizontal', product_platform_ids: [6]},
    {id:105, name: 'Condensers / Gas Coolers - Vertical', product_platform_ids: [6]},
    {id:106, name: 'Condensers / Gas Coolers - V Shape', product_platform_ids: [6]},
    {id:107, name: 'Condensers / Gas Coolers - New / Unknown / Other', product_platform_ids: [6]},
    {id:108, name: 'Heat Recovery', product_platform_ids: [6]},
    {id:109, name: 'CO2 Commercial Refrigeration System', product_platform_ids: [6]},
    {id:110, name: 'CO2 Hot Water Heat Pump', product_platform_ids: [6]},

    {id:112, name: 'Agent - Dry Powder/Chemical', product_platform_ids: [7]},
    {id:113, name: 'Agent – Emulsifiers / Water additives', product_platform_ids: [7]},
    {id:114, name: 'Explosion Suppression & Protection', product_platform_ids: [7]},
    {id:115, name: 'Extinguishers - Carbon Dioxide', product_platform_ids: [7]},
    {id:116, name: 'Extinguishers - Dry Chemical', product_platform_ids: [7]},
    {id:117, name: 'Extinguishers - Foam', product_platform_ids: [7]},
    {id:118, name: 'Extinguishers - Water Based', product_platform_ids: [7]},
    {id:119, name: 'Extinguishers - Wet Chemical', product_platform_ids: [7]},
    {id:120, name: 'Accessories (nozzles, stands, pumps, hoses, etc)', product_platform_ids: [7]},
    {id:121, name: 'Suppression - New / Unknown / Other', product_platform_ids: [7]},
    {id:122, name: 'Water Mist - Residential', product_platform_ids: [7]},
    {id:123, name: 'Water Mist - Trains', product_platform_ids: [7]},
    {id:124, name: 'Water Mist - Marine', product_platform_ids: [7]},
    {id:125, name: 'Water Mist - Commercial Buildings', product_platform_ids: [7]},
    {id:126, name: 'Water Mist - Other', product_platform_ids: [7]},
    {id:127, name: 'Suppression Systems - Other', product_platform_ids: [7]},
    {id:128, name: 'Suppression Systems - Inert Gas', product_platform_ids: [7]},
    {id:129, name: 'Suppression Systems - Dry/Wet Chemical', product_platform_ids: [7]},
    {id:130, name: 'Suppression Systems - Water', product_platform_ids: [7]},
    {id:131, name: 'Pre-Engineered Vehicle Fire Suppression Systems (AU)', product_platform_ids: [7]},
    {id:132, name: 'Foam System Hardware (AU)', product_platform_ids: [7]},
    {id:133, name: 'Gaseous Systems (AU)', product_platform_ids: [7]},

    {id:135, name: 'Commercial Video - Accessories (Displays, Multiplexers, IP Modules)', product_platform_ids: [8]},
    {id:136, name: 'Commercial Video - Cameras', product_platform_ids: [8]},
    {id:137, name: 'Commercial Video - Storage (DVRs, NVRs)', product_platform_ids: [8]},
    {id:138, name: 'Commercial Video - Software', product_platform_ids: [8]},
    {id:139, name: 'Video - Transmission (Fiber and Ethernet)', product_platform_ids: [8]},
    {id:140, name: 'Video - Transportation', product_platform_ids: [8]},
    {id:141, name: 'Intrusion - Accessories (e.g., key fobs, PERS)', product_platform_ids: [8]},
    {id:142, name: 'Intrusion - Control Panels (All-No distinction)', product_platform_ids: [8]},
    {id:143, name: 'Intrusion - Control Panels (Hybrid)', product_platform_ids: [8]},
    {id:144, name: 'Intrusion - Control Panels (Self Contained)', product_platform_ids: [8]},
    {id:145, name: 'Intrusion - Interactive Services (Server / Client Software)', product_platform_ids: [8]},
    {id:146, name: 'Intrusion - Monitoring Software (MAS)', product_platform_ids: [8]},
    {id:147, name: 'Intrusion - Sensors (Glass Break-Vibration-Noise-Motion)', product_platform_ids: [8]},
    {id:148, name: 'Intrusion - Signaling (Horns, Strobes)', product_platform_ids: [8]},
    {id:149, name: 'Intrusion - User Interface/Keypads', product_platform_ids: [8]},
    {id:150, name: 'Video, Intrusion and Communications - New / Unknown / Other', product_platform_ids: [8]},

    {id:152, name: 'Alarm Devices - Abort Station', product_platform_ids: [9]},
    {id:153, name: 'Alarm Devices - Mass Notification', product_platform_ids: [9]},
    {id:154, name: 'Alarm Devices - Signaling (Horn/Strobe/Chime/Voice)', product_platform_ids: [9]},
    {id:155, name: 'Alarm Devices - Pull Station', product_platform_ids: [9]},
    {id:156, name: 'Control Panels - Fire (Global)', product_platform_ids: [9]},
    {id:157, name: 'Control Panels - Fire (EN Cert)', product_platform_ids: [9]},
    {id:158, name: 'Control Panels - Fire (UL Cert)', product_platform_ids: [9]},
    {id:159, name: 'Detection - Accessories', product_platform_ids: [9]},
    {id:160, name: 'Detection - Aspirating', product_platform_ids: [9]},
    {id:161, name: 'Detection - CO - Commercial', product_platform_ids: [9]},
    {id:162, name: 'Detection - CO - Residential', product_platform_ids: [9]},
    {id:163, name: 'Detection – Combo (Smoke & CO)', product_platform_ids: [9]},
    {id:164, name: 'Detection - Flame Autronica', product_platform_ids: [9]},
    {id:165, name: 'Detection - Flame Detronics', product_platform_ids: [9]},
    {id:166, name: 'Detection - Gas', product_platform_ids: [9]},
    {id:167, name: 'Detection - Heat', product_platform_ids: [9]},
    {id:168, name: 'Detection - Marine Systems', product_platform_ids: [9]},
    {id:169, name: 'Detection - Signaling (Industrial)', product_platform_ids: [9]},
    {id:170, name: 'Detection - Signaling (Notification)', product_platform_ids: [9]},
    {id:171, name: 'Detection - Smoke - Commercial', product_platform_ids: [9]},
    {id:172, name: 'Detection - Smoke - Residential', product_platform_ids: [9]},
    {id:173, name: 'Detection - Sound and Communication', product_platform_ids: [9]},
    {id:174, name: 'Alarm and Detection - New / Unknown / Other', product_platform_ids: [9]},

    {id:176, name: 'Igniter - Non-Industrial', product_platform_ids: [10]},
    {id:177, name: 'Igniter - Industrial', product_platform_ids: [10]},
    {id:178, name: 'Controls - Burner/Boiler - Industrial', product_platform_ids: [10]},
    {id:179, name: 'Duct Burner', product_platform_ids: [10]},
    {id:180, name: 'Controls - Burner/Boiler - Non Industrial', product_platform_ids: [10]},
    {id:181, name: 'Flame Scanner', product_platform_ids: [10]},
    {id:182, name: 'Combustion and Ignition New / Unknown / Other', product_platform_ids: [10]},

    {id:184, name: 'Enterprise Video - User Interface (Software)', product_platform_ids: [11]},
    {id:185, name: 'Enterprise Video - Management Software', product_platform_ids: [11]},
    {id:186, name: 'Enterprise Video - Analytics', product_platform_ids: [11]},
    {id:187, name: 'Access Control - Transponder', product_platform_ids: [11]},
    {id:188, name: 'Access Control - Enterprise Software', product_platform_ids: [11]},
    {id:189, name: 'Access Control - IO Modules', product_platform_ids: [11]},
    {id:190, name: 'Access Control - Panel (Enterprise)', product_platform_ids: [11]},
    {id:191, name: 'Access Control - Panel (Standalone)', product_platform_ids: [11]},
    {id:192, name: 'Access Control - Readers', product_platform_ids: [11]},
    {id:193, name: 'Access Control - User Interface (Client Software)', product_platform_ids: [11]},
    {id:194, name: 'Access Control - Visitor Management Software', product_platform_ids: [11]},
    {id:195, name: 'Key Control - Automotive', product_platform_ids: [11]},
    {id:196, name: 'Key Control - Electronic Keys and Lockboxes (General)', product_platform_ids: [11]},
    {id:197, name: 'Key Control - Electronic Keys and Lockboxes (Real Estate)', product_platform_ids: [11]},
    {id:198, name: 'Key Control - Industrial/Commercial', product_platform_ids: [11]},
    {id:199, name: 'Key Control - Mechanical LockBoxes (Retail/Consumer)', product_platform_ids: [11]},
    {id:200, name: 'Electronic Locks - Access Control Software', product_platform_ids: [11]},
    {id:201, name: 'Electronic Locks - Easy Check In', product_platform_ids: [11]},
    {id:202, name: 'Electronic Locks - Encoders', product_platform_ids: [11]},
    {id:203, name: 'Electronic Locks - Energy Management', product_platform_ids: [11]},
    {id:204, name: 'Electronic Locks - Front Desk Software', product_platform_ids: [11]},
    {id:205, name: 'Electronic Locks - Locking Systems (Commercial)', product_platform_ids: [11]},
    {id:206, name: 'Electronic Locks - Locking Systems (Hospitality)', product_platform_ids: [11]},
    {id:207, name: 'Electronic Locks - Portable Programmers', product_platform_ids: [11]},
    {id:208, name: 'Electronic Locks - Safes', product_platform_ids: [11]}
  ]);

  angular.module('ima-app').constant('TECHNOLOGY_CATEGORY', [
    {id:1, name: 'Refrigeration System Design'},
    {id:2, name: 'Compressor Technology'},
    {id:3, name: 'Heat Exchanger / Transfer'},
    {id:4, name: 'Electronic / Electro Mechanlcal Controls'},
    {id:5, name: 'Motors & Power Electronics'},
    {id:6, name: 'Air management'},
    {id:7, name: 'Acoustics vibration'},
    {id:8, name: 'Indoor Air Quality / Controlled Atmosphere'},
    {id:9, name: 'Materials'},
    {id:10, name: 'Advance Systems Application'},
    {id:11, name: 'Structural Design'},
    {id:12, name: 'Aesthetics'},
    {id:13, name: 'Serviceability (tools, access, etc)'},
    {id:14, name: 'Gas / Oil / Electric Heating & Thermal'},
    {id:15, name: 'Accessories'},
    {id:16, name: 'Prognostics (preventative)'},
    {id:17, name: 'Safety (mechanical, fire prevention, etc)'},
    {id:18, name: 'Improved Manufacturability'},
    {id:19, name: 'Plumbing'},
    {id:20, name: 'Fire Suppression'},
    {id:21, name: 'Video, Intrusion, and Communications'},
    {id:22, name: 'Access / Entry Control'},
    {id:23, name: 'Hazard Detection and Notification'},
    {id:24, name: 'Combustion and Ignition'},
    {id:25, name: 'Fast Food Equipment'},
    {id:26, name: 'Cab and Car Frame'},
    {id:27, name: 'Elevator Operation and Controls'},
    {id:28, name: 'Tension Member'},
    {id:29, name: 'Dispatching'},
    {id:30, name: 'Doors'},
    {id:31, name: 'Drives'},
    {id:32, name: 'Escalator/Moving Walkway'},
    {id:33, name: 'HID - Human Interface Devices'},
    {id:34, name: 'Hoistway Components'},
    {id:35, name: 'Hydraulic Components'},
    {id:36, name: 'Information Systems'},
    {id:37, name: 'Machine'},
    {id:38, name: 'Ride Quality'},
    {id:39, name: 'Service/Field'},
    {id:40, name: 'Non-Traction Systems'}
  ]);

  angular.module('ima-app').constant('THEME', [
    {id: 1, name: 'Connected Home', product_platform_ids: [1,2,3,4,5,6,7,8,9,10,11]},
    {id: 2, name: 'Connected Cold Chain', product_platform_ids: [1,2,3,4,5,6,7,8,9,10,11]},
    {id: 3, name: 'Passenger Experience', product_platform_ids: [1,2,3,4,5,6,7,8,9,10,11]},
    {id: 4, name: 'Other', product_platform_ids: [1,2,3,4,5,6,7,8,9,10,11]}
  ]);

  angular.module('ima-app').constant('CHALLENGE', [
    {id: 1, name: 'Thermostat Dashboard', theme_ids: [1,2,3,4]},
    {id: 2, name: 'Easy Install / DIY Thermostat', theme_ids: [1,2,3,4]},
    {id: 3, name: 'Dealer Locator', theme_ids: [1,2,3,4]},
    {id: 4, name: 'Other', theme_ids: [1,2,3,4]}
  ]);

  angular.module('ima-app').constant('REGIONS', [
    {id:1, name: 'Global'},
    {id:2, name: 'North America'},
    {id:3, name: 'South America'},
    {id:4, name: 'EMEA (Europe, Middle East, Africa)'},
    {id:5, name: 'Northeast Asia'},
    {id:6, name: 'China'},
    {id:7, name: 'South Asia'}
  ]);

  angular.module('ima-app').constant('STATUS', {
    'DRAFT':0,
    'PUBLISHED':1
  });

  angular.module('ima-app').constant('SELECTBOOLEAN', [
    { id: 1, name: 'Yes' },
    { id: 0, name: 'No' }
  ]);

  angular.module('ima-app').constant('PROFILE_EXPERIENCE_ROLE', [
  { id: 0, name: 'Employee' },
  { id: 1, name: 'Founder' },
  { id: 2, name: 'Advisor' },
  { id: 3, name: 'Attorney' },
  { id: 4, name: 'Board Member' },
  ]);
})()
