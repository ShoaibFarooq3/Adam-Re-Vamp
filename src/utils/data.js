export const conversationList = [
  {
    _id: "66eb1739978a78651583db7c",
    title:
      "Create a box base with a inverse funnel on top. Make sure that these two objects are connected.",
    messages: [
      {
        _id: "66eb173d978a78651583db7f",
        userMessage:
          "Create a box base with a inverse funnel on top. Make sure that these two objects are connected.",
        aiMessage:
          "// Parameters\nbox_width = 100;\nbox_depth = 100;\nbox_height = 50;\nfunnel_top_radius = 80;\nfunnel_bottom_radius = 20;\nfunnel_height = 60;\n\n// Box base\ncube([box_width, box_depth, box_height]);\n\n// Inverse funnel\ntranslate([box_width/2, box_depth/2, box_height])\ndifference() {\n    cylinder(h=funnel_height, r1=funnel_top_radius, r2=funnel_bottom_radius);\n    translate([0, 0, -1])\n    cylinder(h=funnel_height+2, r1=funnel_top_radius-2, r2=funnel_bottom_radius-2);\n}\n\n// Suggestions\n//\n//\n//",
        suggestions: [
          "Adjust funnel angle",
          "Add rounded corners",
          "Include drainage holes",
        ],
        createdAt: "2024-09-18T18:09:01.885Z",
        updatedAt: "2024-09-18T18:09:01.885Z",
        adjust: false,
        timestamp: "2024-09-18T18:09:01.885Z",
        __v: 0,
      },
    ],
    user: {
      _id: "66b1d8e66c4b69af16ba6575",
      name: "",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmpoQaaw13BKAmYv1iRPzkz9AkM0ZskCqK_g&s",
    },
    createdAt: "2024-09-18T18:08:57.058Z",
    updatedAt: "2024-09-18T18:09:02.273Z",
    __v: 1,
  },
  {
    _id: "66eaf4c67fb4963c27c2ee09",
    title: "create a table ",
    messages: [
      {
        _id: "66eaf4cb7fb4963c27c2ee0c",
        userMessage: "create a table ",
        aiMessage:
          "// Parameters\ntable_width = 120;\ntable_depth = 80;\ntable_height = 75;\ntop_thickness = 3;\nleg_width = 5;\n\n// Table top\ncube([table_width, table_depth, top_thickness]);\n\n// Legs\ntranslate([0, 0, 0])\n    cube([leg_width, leg_width, table_height]);\ntranslate([table_width - leg_width, 0, 0])\n    cube([leg_width, leg_width, table_height]);\ntranslate([0, table_depth - leg_width, 0])\n    cube([leg_width, leg_width, table_height]);\ntranslate([table_width - leg_width, table_depth - leg_width, 0])\n    cube([leg_width, leg_width, table_height]);\n\n// Suggestions\n//\n//\n//",
        suggestions: ["Rounded corners", "Add table skirt", "Tapered legs"],
        createdAt: "2024-09-18T15:42:03.901Z",
        updatedAt: "2024-09-18T15:42:03.901Z",
        adjust: false,
        timestamp: "2024-09-18T15:42:03.901Z",
        __v: 0,
      },
      {
        _id: "66eaf56ed62a794ffe5b815b",
        userMessage: "Rounded corners",
        aiMessage:
          "// Parameters\ntable_width = 120;\ntable_depth = 80;\ntable_height = 75;\ntop_thickness = 3;\nleg_width = 5;\ncorner_radius = 5;\n\nmodule rounded_cube(size, radius) {\n    hull() {\n        translate([radius, radius, 0])\n            cylinder(r=radius, h=size[2]);\n        translate([size[0]-radius, radius, 0])\n            cylinder(r=radius, h=size[2]);\n        translate([radius, size[1]-radius, 0])\n            cylinder(r=radius, h=size[2]);\n        translate([size[0]-radius, size[1]-radius, 0])\n            cylinder(r=radius, h=size[2]);\n    }\n}\n\n// Table top with rounded corners\ntranslate([0, 0, table_height - top_thickness])\n    rounded_cube([table_width, table_depth, top_thickness], corner_radius);\n\n// Legs\ntranslate([0, 0, 0])\n    cube([leg_width, leg_width, table_height]);\ntranslate([table_width - leg_width, 0, 0])\n    cube([leg_width, leg_width, table_height]);\ntranslate([0, table_depth - leg_width, 0])\n    cube([leg_width, leg_width, table_height]);\ntranslate([table_width - leg_width, table_depth - leg_width, 0])\n    cube([leg_width, leg_width, table_height]);\n\n// Suggestions\n//\n//\n//",
        suggestions: [
          "Rounded leg edges",
          "Add table skirt",
          "Adjustable height",
        ],
        createdAt: "2024-09-18T15:44:46.559Z",
        updatedAt: "2024-09-18T15:44:46.559Z",
        adjust: false,
        timestamp: "2024-09-18T15:44:46.559Z",
        __v: 0,
      },
      {
        _id: "66eaf6b3d62a794ffe5b8171",
        userMessage: "Rounded leg edges",
        aiMessage:
          "// Parameters\nleg_length = 100;\nleg_width = 20;\nleg_height = 20;\ncorner_radius = 5;\n\n// Main leg shape\ndifference() {\n    cube([leg_width, leg_length, leg_height]);\n    \n    // Rounded corners\n    translate([0, 0, 0])\n    rotate([0, 90, 0])\n    cylinder(r=corner_radius, h=leg_width, $fn=32);\n    \n    translate([0, leg_length, 0])\n    rotate([0, 90, 0])\n    cylinder(r=corner_radius, h=leg_width, $fn=32);\n    \n    translate([0, 0, leg_height])\n    rotate([0, 90, 0])\n    cylinder(r=corner_radius, h=leg_width, $fn=32);\n    \n    translate([0, leg_length, leg_height])\n    rotate([0, 90, 0])\n    cylinder(r=corner_radius, h=leg_width, $fn=32);\n}\n\n// \n// \n// ",
        suggestions: [
          "Tapered leg design",
          "Curved leg profile",
          "Textured leg surface",
        ],
        createdAt: "2024-09-18T15:50:11.237Z",
        updatedAt: "2024-09-18T15:50:11.237Z",
        adjust: false,
        timestamp: "2024-09-18T15:50:11.237Z",
        __v: 0,
      },
      {
        _id: "66eb00b279c3af507a4a14b1",
        userMessage: "Add doll on this table",
        aiMessage:
          "// Parameters\ntable_width = 100;\ntable_length = 150;\ntable_height = 75;\ntable_thickness = 5;\ndoll_height = 30;\ndoll_width = 15;\n\n// Table\nmodule table() {\n    cube([table_length, table_width, table_thickness]);\n    translate([0, 0, -table_height]) {\n        cube([5, 5, table_height]);\n        translate([table_length-5, 0, 0]) cube([5, 5, table_height]);\n        translate([0, table_width-5, 0]) cube([5, 5, table_height]);\n        translate([table_length-5, table_width-5, 0]) cube([5, 5, table_height]);\n    }\n}\n\n// Doll (simplified as a cylinder)\nmodule doll() {\n    cylinder(h=doll_height, r=doll_width/2);\n}\n\n// Combine objects\ntable();\ntranslate([table_length/2, table_width/2, table_thickness]) doll();\n\n// Suggestions\n//\n//\n//",
        suggestions: [
          "Adjust doll position",
          "Add table details",
          "Customize doll shape",
        ],
        createdAt: "2024-09-18T16:32:50.729Z",
        updatedAt: "2024-09-18T16:32:50.729Z",
        adjust: false,
        timestamp: "2024-09-18T16:32:50.729Z",
        __v: 0,
      },
      {
        _id: "66eb0645e223817a2774e0db",
        userMessage: "create a doll on it",
        aiMessage:
          "// Parameters\n$fn = 100;\nhead_radius = 20;\nbody_height = 60;\nbody_width = 30;\narm_length = 40;\nleg_length = 50;\n\n// Head\nsphere(r = head_radius);\n\n// Body\ntranslate([0, 0, -body_height/2 - head_radius])\n    cylinder(h = body_height, r = body_width/2);\n\n// Arms\nfor (i = [-1, 1]) {\n    translate([i * body_width/2, 0, -head_radius - 10])\n        rotate([0, 90 * i, 0])\n            cylinder(h = arm_length, r = 5);\n}\n\n// Legs\nfor (i = [-1, 1]) {\n    translate([i * 10, 0, -body_height - head_radius])\n        cylinder(h = leg_length, r = 7);\n}\n\n// \n// \n// ",
        suggestions: ["Add hair", "Create clothes", "Add accessories"],
        createdAt: "2024-09-18T16:56:37.602Z",
        updatedAt: "2024-09-18T16:56:37.602Z",
        adjust: false,
        timestamp: "2024-09-18T16:56:37.605Z",
        __v: 0,
      },
      {
        _id: "66eb0677e223817a2774e0e3",
        userMessage: "create a doll on it",
        aiMessage:
          "// Parameters\nleg_length = 100;\nleg_width = 20;\nleg_height = 20;\ncorner_radius = 5;\n\n// Doll parameters\nhead_radius = 15;\nbody_height = 40;\nbody_width = 30;\narm_length = 35;\narm_radius = 5;\n\n// Main leg shape\nmodule leg() {\n    difference() {\n        cube([leg_width, leg_length, leg_height]);\n        \n        // Rounded corners\n        translate([0, 0, 0])\n        rotate([0, 90, 0])\n        cylinder(r=corner_radius, h=leg_width, $fn=32);\n        \n        translate([0, leg_length, 0])\n        rotate([0, 90, 0])\n        cylinder(r=corner_radius, h=leg_width, $fn=32);\n        \n        translate([0, 0, leg_height])\n        rotate([0, 90, 0])\n        cylinder(r=corner_radius, h=leg_width, $fn=32);\n        \n        translate([0, leg_length, leg_height])\n        rotate([0, 90, 0])\n        cylinder(r=corner_radius, h=leg_width, $fn=32);\n    }\n}\n\n// Doll\nmodule doll() {\n    // Head\n    translate([leg_width/2, leg_length/2, leg_height + body_height + head_radius])\n    sphere(r=head_radius);\n    \n    // Body\n    translate([leg_width/2 - body_width/2, leg_length/2 - body_width/2, leg_height])\n    cube([body_width, body_width, body_height]);\n    \n    // Arms\n    translate([leg_width/2 - body_width/2, leg_length/2, leg_height + body_height - arm_radius])\n    rotate([0, 90, 0])\n    cylinder(r=arm_radius, h=arm_length);\n    \n    translate([leg_width/2 + body_width/2 - arm_length, leg_length/2, leg_height + body_height - arm_radius])\n    rotate([0, 90, 0])\n    cylinder(r=arm_radius, h=arm_length);\n}\n\n// Combine leg and doll\nleg();\ndoll();\n\n// \n// \n// ",
        suggestions: [
          "Articulated doll joints",
          "Doll clothing details",
          "Facial features added",
        ],
        createdAt: "2024-09-18T16:57:27.074Z",
        updatedAt: "2024-09-18T16:57:27.074Z",
        adjust: false,
        timestamp: "2024-09-18T16:57:27.075Z",
        __v: 0,
      },
      {
        _id: "66eb0de2053b64cac93cfcce",
        userMessage: "Articulated doll joints",
        aiMessage:
          "// Parameters\n$fn = 100;\njoint_radius = 10;\njoint_height = 20;\nconnector_radius = 5;\nconnector_height = 5;\n\n// Joint\nmodule joint() {\n    difference() {\n        sphere(r = joint_radius);\n        translate([0, 0, -joint_height/2])\n            cylinder(r = connector_radius, h = joint_height);\n    }\n}\n\n// Connector\nmodule connector() {\n    cylinder(r = connector_radius, h = connector_height);\n}\n\n// Assembly\njoint();\ntranslate([0, 0, -connector_height])\n    connector();\n\n// Suggestions\n//\n//\n//",
        suggestions: [
          "Ball socket joint",
          "Hinge mechanism",
          "Snap-fit connection",
        ],
        createdAt: "2024-09-18T17:29:06.538Z",
        updatedAt: "2024-09-18T17:29:06.538Z",
        adjust: false,
        timestamp: "2024-09-18T17:29:06.542Z",
        __v: 0,
      },
      {
        _id: "66eb0e19053b64cac93cfcdc",
        userMessage: "make it table",
        aiMessage:
          "// Parameters\n$fn = 100;\ntable_width = 100;\ntable_depth = 60;\ntable_height = 75;\ntable_thickness = 3;\nleg_radius = 3;\n\n// Table top\nmodule table_top() {\n    cube([table_width, table_depth, table_thickness]);\n}\n\n// Table leg\nmodule table_leg() {\n    cylinder(r = leg_radius, h = table_height - table_thickness);\n}\n\n// Assembly\nmodule table() {\n    table_top();\n    \n    translate([leg_radius, leg_radius, -table_height + table_thickness])\n        table_leg();\n    \n    translate([table_width - leg_radius, leg_radius, -table_height + table_thickness])\n        table_leg();\n    \n    translate([leg_radius, table_depth - leg_radius, -table_height + table_thickness])\n        table_leg();\n    \n    translate([table_width - leg_radius, table_depth - leg_radius, -table_height + table_thickness])\n        table_leg();\n}\n\ntable();\n\n// Suggestions\n//\n//\n//",
        suggestions: [
          "Adjustable table height",
          "Foldable table legs",
          "Glass table top",
        ],
        createdAt: "2024-09-18T17:30:01.403Z",
        updatedAt: "2024-09-18T17:30:01.403Z",
        adjust: false,
        timestamp: "2024-09-18T17:30:01.404Z",
        __v: 0,
      },
    ],
    user: {
      _id: "66b1d8e66c4b69af16ba6575",
      name: "",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmpoQaaw13BKAmYv1iRPzkz9AkM0ZskCqK_g&s",
    },
    createdAt: "2024-09-18T15:41:58.319Z",
    updatedAt: "2024-09-18T17:30:01.787Z",
    __v: 8,
  },
  {
    _id: "66eaf3a2d62a794ffe5b8147",
    title: "Create a box",
    messages: [
      {
        _id: "66eaf3acd62a794ffe5b814b",
        userMessage: "Create a box",
        aiMessage:
          "// Parameters\nwidth = 100;\nheight = 50;\ndepth = 75;\nthickness = 2;\n\n// Create box\ndifference() {\n    cube([width, depth, height]);\n    translate([thickness, thickness, thickness])\n        cube([width - 2*thickness, depth - 2*thickness, height - thickness]);\n}\n\n// \n// \n// ",
        suggestions: [
          "Rounded corners box",
          "Lid for box",
          "Customizable dimensions",
        ],
        createdAt: "2024-09-18T15:37:16.192Z",
        updatedAt: "2024-09-18T15:37:16.192Z",
        adjust: false,
        timestamp: "2024-09-18T15:37:16.193Z",
        __v: 0,
      },
      {
        _id: "66eaf3c37fb4963c27c2edf7",
        userMessage: "Lid for box",
        aiMessage:
          "// Parameters\nwidth = 100;\nheight = 50;\ndepth = 75;\nthickness = 2;\ntolerance = 0.5;\n\n// Create lid\ndifference() {\n    cube([width + 2*thickness + tolerance, depth + 2*thickness + tolerance, thickness + 5]);\n    translate([thickness, thickness, -1])\n        cube([width + tolerance, depth + tolerance, thickness + 7]);\n}\n\n// \n// \n// ",
        suggestions: ["Snap-fit lid", "Hinged lid", "Sliding lid"],
        createdAt: "2024-09-18T15:37:39.131Z",
        updatedAt: "2024-09-18T15:37:39.131Z",
        adjust: false,
        timestamp: "2024-09-18T15:37:39.134Z",
        __v: 0,
      },
    ],
    user: {
      _id: "66b1d8e66c4b69af16ba6575",
      name: "",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmpoQaaw13BKAmYv1iRPzkz9AkM0ZskCqK_g&s",
    },
    createdAt: "2024-09-18T15:37:06.914Z",
    updatedAt: "2024-09-18T15:37:39.536Z",
    __v: 2,
  },
];

export const data = [
  {
    title: "Cylinder",
    imageUrl: "/Rectangle-3035.png",
    spanData: [
      {
        name: "supports",
        color: "bg-[#FF3D5F]",
      },
      {
        name: "dowels",
        color: "bg-[#FF3D5F]",
      },
    ],
  },
  {
    title: "Buttons",
    imageUrl: "/button-data.png",
    spanData: [
      {
        name: "attachments",
        color: "bg-[#35A600]",
      },
      {
        name: "controls",
        color: "bg-[#0054B7]",
      },
    ],
  },
  {
    title: "LEGO Brick",
    imageUrl: "/carousel-images/LEGO.png",
    backgroundColor: "#F9D3B7",
    spanData: [
      {
        name: "supports",
        color: "bg-[#FF3D5F]",
      },
      {
        name: "dowels",
        color: "bg-[#FF3D5F]",
      },
    ],
  },
  {
    title: "Wall Mounted Key Holder",
    imageUrl: "/carousel-images/Wall-Mounted-Key-Holder.png",
    backgroundColor: "#F9D3B7",
    spanData: [
      {
        name: "supports",
        color: "bg-[#FF3D5F]",
      },
      {
        name: "dowels",
        color: "bg-[#FF3D5F]",
      },
    ],
  },
  {
    title: "Toothbrush Holder",
    imageUrl: "/carousel-images/Toothbrush-Holder.png",
    backgroundColor: "#F9D3B7",
    spanData: [
      {
        name: "supports",
        color: "bg-[#FF3D5F]",
      },
      {
        name: "dowels",
        color: "bg-[#FF3D5F]",
      },
    ],
  },
  {
    title: "Spur Gear",
    imageUrl: "/carousel-images/Spur-Gear.png",
    backgroundColor: "#F9D3B7",
    spanData: [
      {
        name: "supports",
        color: "bg-[#FF3D5F]",
      },
      {
        name: "dowels",
        color: "bg-[#FF3D5F]",
      },
    ],
  },
  {
    title: "Raspberry Pi Case",
    imageUrl: "/carousel-images/Raspi-Case.png",
    backgroundColor: "#F9D3B7",
    spanData: [
      {
        name: "supports",
        color: "bg-[#FF3D5F]",
      },
      {
        name: "dowels",
        color: "bg-[#FF3D5F]",
      },
    ],
  },
];

export const userData = {
  _id: "66b1d8e66c4b69af16ba6575",
  name: "",
  email: "kiyani@gmail.com",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmIxZDhlNjZjNGI2OWFmMTZiYTY1NzUiLCJpYXQiOjE3MjY0OTEwNTYsImV4cCI6MTcyOTA4MzA1Nn0.JY4r-ErTsR5vwjcuo317-5LxoNnptGKqrdSm88oT7ek",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmpoQaaw13BKAmYv1iRPzkz9AkM0ZskCqK_g&s",
};

export const userConversation = [
  {
    _id: "66f566d97bd9b3525bd6d095",
    title: "Raspberry Pi Case",
    messages: [
      {
        adjust: false,
        _id: "66f566f47bd9b3525bd6d098",
        userMessage: "Raspberry Pi Case",
        aiMessage:
          "// Raspberry Pi 4 Case Parameters\ncase_length = 100;\ncase_width = 70;\ncase_height = 30;\nwall_thickness = 2;\ncorner_radius = 3;\nvent_size = 2;\nvent_spacing = 5;\n\ndifference() {\n    // Main case body\n    minkowski() {\n        cube([case_length-2*corner_radius, case_width-2*corner_radius, case_height-2*corner_radius], center=true);\n        sphere(r=corner_radius);\n    }\n    \n    // Hollow out the case\n    translate([0, 0, wall_thickness])\n    minkowski() {\n        cube([case_length-2*corner_radius-2*wall_thickness, \n              case_width-2*corner_radius-2*wall_thickness, \n              case_height-2*corner_radius], center=true);\n        sphere(r=corner_radius);\n    }\n    \n    // Ventilation holes\n    for (x = [-case_length/2+10 : vent_spacing : case_length/2-10]) {\n        for (y = [-case_width/2+10 : vent_spacing : case_width/2-10]) {\n            translate([x, y, case_height/2])\n            cube([vent_size, vent_size, wall_thickness*2], center=true);\n        }\n    }\n    \n    // Port cutouts (simplified)\n    translate([case_length/2-5, 0, 0])\n    cube([wall_thickness*2, 50, 15], center=true);\n}\n\n//\n//\n//",
        suggestions: [
          "Add a sliding lid",
          "Incorporate mounting holes for the Raspberry Pi",
          "Design a snap-fit mechanism for easy assembly",
        ],
        adjustments: false,
        createdAt: "2024-09-26T13:51:48.446Z",
        updatedAt: "2024-09-26T13:51:48.446Z",
        __v: 0,
        timestamp: "2024-09-27T13:41:47.845Z",
      },
    ],
    user: {
      _id: "66f56973134e0159d45c070a",
      name: "Shoaib Farooq",
      imageUrl:
        "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png",
    },
    createdAt: "2024-09-26T13:51:21.745Z",
    updatedAt: "2024-09-26T13:51:48.651Z",
    __v: 1,
  },
  {
    _id: "66f566c3a6975f68f30fc63c",
    title: "Spur Gear",
    messages: [
      {
        adjust: false,
        _id: "66f566e4a6975f68f30fc63f",
        userMessage: "Spur Gear",
        aiMessage:
          "// Spur Gear Parameters\nteeth = 20;\ncircular_pitch = 10;\npressure_angle = 20;\nclearance = 0.2;\ngear_thickness = 10;\nhub_diameter = 20;\nhub_thickness = 15;\nbore_diameter = 8;\n\n// Derived parameters\npitch_diameter = teeth * circular_pitch / PI;\nouter_diameter = pitch_diameter + 2 * (circular_pitch / PI);\nroot_diameter = pitch_diameter - 2 * (circular_pitch / PI + clearance);\n\n// Main gear\ndifference() {\n    union() {\n        // Gear body\n        linear_extrude(height = gear_thickness) {\n            gear(number_of_teeth = teeth,\n                 circular_pitch = circular_pitch,\n                 pressure_angle = pressure_angle,\n                 clearance = clearance);\n        }\n        \n        // Hub\n        translate([0, 0, gear_thickness])\n        cylinder(h = hub_thickness, d = hub_diameter);\n    }\n    \n    // Bore hole\n    cylinder(h = gear_thickness + hub_thickness, d = bore_diameter);\n}\n\n// Gear Module (from MCAD library)\nmodule gear(number_of_teeth, circular_pitch, pressure_angle, clearance) {\n    pitch_radius = number_of_teeth * circular_pitch / (2 * PI);\n    base_radius = pitch_radius * cos(pressure_angle);\n    outer_radius = pitch_radius + circular_pitch / PI - clearance;\n    root_radius = pitch_radius - circular_pitch / PI - clearance;\n    half_thick_angle = 90 / number_of_teeth;\n    pitch_point = involute(base_radius, involute_intersect_angle(base_radius, pitch_radius));\n    pitch_angle = atan2(pitch_point[1], pitch_point[0]);\n    centre_angle = pitch_angle + half_thick_angle;\n\n    points = [\n        [0, 0],\n        involute(base_radius, involute_intersect_angle(base_radius, root_radius)),\n        involute(base_radius, involute_intersect_angle(base_radius, outer_radius)),\n        [outer_radius * cos(centre_angle), outer_radius * sin(centre_angle)]\n    ];\n\n    difference() {\n        circle(r = outer_radius);\n        union() {\n            for(i = [1:number_of_teeth]) {\n                rotate([0, 0, i * 360 / number_of_teeth]) {\n                    polygon(points);\n                }\n            }\n        }\n    }\n}\n\nfunction involute(base_radius, involute_angle) = [\n    base_radius * (cos(involute_angle) + involute_angle * PI / 180 * sin(involute_angle)),\n    base_radius * (sin(involute_angle) - involute_angle * PI / 180 * cos(involute_angle))\n];\n\nfunction involute_intersect_angle(base_radius, radius) = sqrt(pow(radius / base_radius, 2) - 1) * 180 / PI;\n\n//\n//\n//",
        suggestions: [
          "Add helical teeth to the gear",
          "Create a matching pinion gear",
          "Add mounting holes to the hub",
        ],
        adjustments: false,
        createdAt: "2024-09-26T13:51:32.233Z",
        updatedAt: "2024-09-26T13:51:32.233Z",
        __v: 0,
        timestamp: "2024-09-27T13:41:47.844Z",
      },
    ],
    user: {
      _id: "66f56973134e0159d45c070a",
      name: "Shoaib Farooq",
      imageUrl:
        "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png",
    },
    createdAt: "2024-09-26T13:50:59.316Z",
    updatedAt: "2024-09-26T13:51:32.447Z",
    __v: 1,
  },
];

export const singleConversation = {
  _id: "66f6c84b30e051865d7dfc18",
  title: "LEGO Brick",
  messages: [
    {
      _id: "66f6c84f30e051865d7dfc1b",
      userMessage: "LEGO Brick",
      aiMessage:
        "// Parameters\nbrick_width = 31.8;\nbrick_length = 31.8;\nbrick_height = 9.6;\nstud_diameter = 4.8;\nstud_height = 1.8;\nwall_thickness = 1.5;\n\n// Main brick\ndifference() {\n    cube([brick_width, brick_length, brick_height]);\n    translate([wall_thickness, wall_thickness, wall_thickness])\n        cube([brick_width - 2*wall_thickness, brick_length - 2*wall_thickness, brick_height]);\n}\n\n// Studs\nfor (x = [0:1:3]) {\n    for (y = [0:1:3]) {\n        translate([x*8 + 4, y*8 + 4, brick_height])\n            cylinder(h=stud_height, d=stud_diameter, $fn=30);\n    }\n}\n\n// Suggestions\n// \n// \n// ",
      suggestions: [
        "Customizable dimensions",
        "Add bottom tubes",
        "Round corners",
      ],
      createdAt: "2024-09-27T14:59:27.245Z",
      updatedAt: "2024-09-27T14:59:27.245Z",
      adjust: false,
      timestamp: "2024-09-27T14:59:27.245Z",
      __v: 0,
    },
    {
      _id: "66f6c85830e051865d7dfc23",
      userMessage: "Round corners",
      aiMessage:
        "// Parameters\ncorner_radius = 10;\ncube_size = 50;\n\n// Main shape\ndifference() {\n    cube([cube_size, cube_size, cube_size], center=true);\n    \n    // Round corners\n    for (x = [-1, 1], y = [-1, 1], z = [-1, 1]) {\n        translate([x * (cube_size/2 - corner_radius), \n                   y * (cube_size/2 - corner_radius), \n                   z * (cube_size/2 - corner_radius)])\n        sphere(r = corner_radius);\n    }\n}\n\n// \n// \n// ",
      suggestions: [
        "Adjust corner radius",
        "Change cube size",
        "Add more spheres",
      ],
      createdAt: "2024-09-27T14:59:36.968Z",
      updatedAt: "2024-09-27T14:59:36.968Z",
      adjust: false,
      timestamp: "2024-09-27T14:59:36.969Z",
      __v: 0,
    },
  ],
  user: {
    _id: "66f56973134e0159d45c070a",
    name: "Shoaib Farooq",
    imageUrl:
      "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png",
  },
  createdAt: "2024-09-27T14:59:23.311Z",
  updatedAt: "2024-09-27T14:59:37.380Z",
  __v: 2,
};
