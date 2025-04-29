
 
 
 
  // Get the element with id="defaultOpen" and click on it

        
  import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js';
  let quests = {
    "Otwórz listę zadań": {done:true, desc:"Gratulacje, udało ci się otworzyć opis zadania"},
    "Znajdź paluszki dla studentów": {done:false, desc:"Studenci nie wypuszczą cię z budynku jeśli nie dostaną paluszków."}
    
  };
  var inventory = {
    "Paluszki": { n:0, desc:"Ulubione jedzenie studentów"},
    "Kamień nieskończoności":{n:6, desc: "Napotężniejszy minerał we wszechświecie"},
    "Notatnik": {n:1, desc:"Do zapisywania zadań"},
  };
  var flags = {
    vending_machine : {counter: 0, },
    student:{counter:0,},
    table:{counter:0}
  }
  var camera, scene, renderer;
  var step;
  var grounded = true;
  var jumped = false;
  var playerHitbox;
  var collidableMeshList = [];
  var antiCollidableMeshList = [];
  var geometry, material, mesh, ground, groundgeometry, ground_material;
  var sun, sun_geometry, material_sun, amb_light, general_light;
  var npc;
  var lookaters = [];
  let building, building_geometry, building_material;
  let door, door2, door_material;
  var x = 0.0;
  var previousPoint = new THREE.Vector3();
  var actions = {};
  var interactive = [];
  var paused =true;
  //Textures
  const loader = new THREE.TextureLoader();
  const texture_empty = loader.load("https://pobulus.github.io/demo/resources/empty.png");
    texture_empty.magFilter = THREE.NearestFilter;
  const texture_tiles = loader.load("https://pobulus.github.io/demo/resources/tiles.png");
    texture_tiles.magFilter = THREE.NearestFilter;
    texture_tiles.wrapS = THREE.RepeatWrapping;
    texture_tiles.wrapT = THREE.RepeatWrapping;
    texture_tiles.repeat.set( 10,10 );
  const texture_grass = loader.load("https://pobulus.github.io/demo/resources/grass.png");
  texture_grass.magFilter = THREE.NearestFilter;
    texture_grass.wrapS = THREE.RepeatWrapping;
    texture_grass.wrapT = THREE.RepeatWrapping;
    texture_grass.repeat.set( 10,10 );
  const texture_vending_machine_front = loader.load("https://pobulus.github.io/demo/resources/vending_machine_front.png");
  const texture_vending_machine_back = loader.load("https://pobulus.github.io/demo/resources/vending_machine_back.png");
  const texture_vending_machine_top = loader.load("https://pobulus.github.io/demo/resources/vending_machine_top.png");
  const texture_vending_machine_bottom = loader.load("https://pobulus.github.io/demo/resources/vending_machine_bottom.png");
  const texture_vending_machine_left = loader.load("https://pobulus.github.io/demo/resources/vending_machine_left.png");
  const texture_vending_machine_right = loader.load("https://pobulus.github.io/demo/resources/vending_machine_right.png");
    texture_vending_machine_front.magFilter = THREE.NearestFilter;
    texture_vending_machine_back.magFilter = THREE.NearestFilter;
    texture_vending_machine_top.magFilter = THREE.NearestFilter;
    texture_vending_machine_bottom.magFilter = THREE.NearestFilter;
    texture_vending_machine_left.magFilter = THREE.NearestFilter;
    texture_vending_machine_right.magFilter = THREE.NearestFilter;
  
  const texture_table_top = loader.load("https://pobulus.github.io/demo/resources/table_top.png");
  const texture_table_side = loader.load("https://pobulus.github.io/demo/resources/table_side.png");
    texture_table_top.magFilter = THREE.NearestFilter;
    texture_table_side.magFilter = THREE.NearestFilter;
  const texture_classroom_1_top = loader.load("https://pobulus.github.io/demo/resources/classroom_1_top.png");
  const texture_classroom_1_front = loader.load("https://pobulus.github.io/demo/resources/classroom_1_front.png");
  const texture_classroom_1_out_front = loader.load("https://pobulus.github.io/demo/resources/classroom_1_out_front.png");
    texture_classroom_1_top.magFilter = THREE.NearestFilter;
    texture_classroom_1_front.magFilter = THREE.NearestFilter;
    texture_classroom_1_out_front.magFilter = THREE.NearestFilter;
  const texture_npc_1_front = loader.load("https://pobulus.github.io/demo/resources/npc_1_front.png");
  const texture_npc_2_front = loader.load("https://pobulus.github.io/demo/resources/npc_2_front.png");
  const texture_npc_3_front = loader.load("https://pobulus.github.io/demo/resources/npc_3_front.png");
  const texture_npc_4_front = loader.load("https://pobulus.github.io/demo/resources/npc_4_front.png");
  const texture_npc_5_front = loader.load("https://pobulus.github.io/demo/resources/npc_5_front.png");
    texture_npc_1_front.magFilter = THREE.NearestFilter;
    texture_npc_2_front.magFilter = THREE.NearestFilter;
    texture_npc_3_front.magFilter = THREE.NearestFilter;
    texture_npc_4_front.magFilter = THREE.NearestFilter;
    texture_npc_5_front.magFilter = THREE.NearestFilter;
  const texture_door = loader.load("https://pobulus.github.io/demo/resources/door.png")
  const texture_door_double = loader.load("https://pobulus.github.io/demo/resources/door_double.png")
    texture_door.magFilter = THREE.NearestFilter;
    texture_door_double.magFilter = THREE.NearestFilter;
  //Materials
  const material_player = new THREE.MeshBasicMaterial({wireframe:false});
  // var hitboxGeometry = new THREE.CylinderGeometry(0.4, 0.15, 1.8, 16,16);
  var hitboxGeometry = new THREE.SphereGeometry(0.6, 16, 16);
  const material_table_top = new THREE.MeshToonMaterial({map: texture_table_top, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide, });
  const material_table_side = new THREE.MeshToonMaterial({map: texture_table_side, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide});
  
  const material_classroom_1_top = new THREE.MeshToonMaterial({map: texture_classroom_1_top, transparent: true, side: THREE.DoubleSide, });
  const material_classroom_1_front = new THREE.MeshToonMaterial({map: texture_classroom_1_front, transparent: true, side: THREE.DoubleSide});
  const material_classroom_1_out_front = new THREE.MeshToonMaterial({map: texture_classroom_1_out_front, transparent: true});
  
  const material_tiles = new THREE.MeshToonMaterial({map: texture_tiles, side: THREE.DoubleSide});
  
  const material_empty = new THREE.MeshToonMaterial({map: texture_empty, transparent: true, alphaTest: 0.5, side: THREE.BackSide});
  const material_npc_1_front = new THREE.MeshToonMaterial({map: texture_npc_1_front, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide});
  const material_npc_2_front = new THREE.MeshToonMaterial({map: texture_npc_2_front, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide});
  const material_npc_3_front = new THREE.MeshToonMaterial({map: texture_npc_3_front, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide});
  const material_npc_4_front = new THREE.MeshToonMaterial({map: texture_npc_4_front, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide});
  const material_npc_5_front = new THREE.MeshToonMaterial({map: texture_npc_5_front, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide});
  const material_door = new THREE.MeshToonMaterial({map: texture_door, side: THREE.DoubleSide});
  const material_door_double = new THREE.MeshToonMaterial({map: texture_door_double, side: THREE.DoubleSide});
   
  const npc_materials = [
    material_npc_1_front,
    material_npc_2_front,
    material_npc_3_front,
    material_npc_4_front,
    material_npc_5_front
  ];
  //Box Textures
  const texture_classroom_1 = [
    material_classroom_1_front, material_classroom_1_front,
    material_classroom_1_top, material_tiles,
    material_classroom_1_front, material_classroom_1_front
  ];
  const texture_classroom_1_out = [
    material_classroom_1_out_front, material_classroom_1_out_front,
    material_classroom_1_top, material_tiles,
    material_classroom_1_out_front, material_classroom_1_out_front
  ];
  const texture_table = [
    material_table_side, material_table_side,
    material_table_top, material_empty,
    material_table_side, material_table_side
  ];
  
  const texture_vending_machine = [
    new THREE.MeshToonMaterial({map: texture_vending_machine_left, }),  
    new THREE.MeshToonMaterial({map: texture_vending_machine_right, }),
    new THREE.MeshToonMaterial({map: texture_vending_machine_top,}),  
    new THREE.MeshToonMaterial({map: texture_vending_machine_bottom, }), 
    new THREE.MeshToonMaterial({map: texture_vending_machine_front, }),  
    new THREE.MeshToonMaterial({map: texture_vending_machine_back,}),
     
  
    
  ];
  
  
  
  let building_outside;
  let listener, bgm;
  const audioLoader = new THREE.AudioLoader();
  function init( width, height) {
    //Hide touch controls
    $("body").on("contextmenu",function(e){
       return false;
  });
    $("#Settings-link").click();
    $("#touch-control-box").hide()
    $("#console").hide();
    $("#textbox").hide();
    
    $("#menu").hide();
    if (window.localStorage.getItem("inventory")){
    inventory = JSON.parse(window.localStorage.getItem("inventory"));
    }
    if (window.localStorage.getItem("quests")){
    quests = JSON.parse(window.localStorage.getItem("quests"));
    }
    if (window.localStorage.getItem("flags")){
    flags = JSON.parse(window.localStorage.getItem("flags"));
    }
    camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 100 );
    listener = new THREE.AudioListener();
    camera.add(listener);
    bgm = new THREE.Audio( listener );
    audioLoader.load( 'https://pobulus.github.io/demo/resources/earhurtsonata.ogg', function( buffer ) {
      bgm.setBuffer( buffer );
      bgm.setLoop( true );
      bgm.setVolume( 0.5 );
      bgm.play();
  });
    camera.position.y = 0.7;
    camera.rotation.x = 0;
    camera.rotation.y = 0;
    collidableMeshList = [];
    actions = {};
   interactive = [];
    scene = new THREE.Scene();
    building_geometry = new THREE.BoxGeometry(10, 3, 10,);
  
    building = new THREE.Mesh(building_geometry, texture_classroom_1);
    scene.add(building);
    building.scale.x = -1;
    building.translateY(1.45);
    building_outside = new THREE.Mesh(building_geometry, texture_classroom_1_out);
    building_outside.scale.x = 1.001;
    building_outside.scale.z = 1.001;
    building_outside.scale.y = 1.001;
    building.add(building_outside);
    collidableMeshList.push(building);
  
    
  
    ground_material = new THREE.MeshBasicMaterial({color: 0x22aa33, map:texture_grass, side: THREE.DoubleSide});
    groundgeometry = new THREE.CircleGeometry(20, 100);
     ground = new THREE.Mesh(groundgeometry, ground_material);
    ground.position.y=-0.1;
    ground.rotation.x=-Math.PI/2;
    ground.receiveShadow = true;
    ground.castShadow = true;
    scene.add( ground );
    collidableMeshList.push(ground);
    playerHitbox = new THREE.Mesh(hitboxGeometry, material_player);
    scene.add(playerHitbox);
    sun_geometry = new THREE.CircleGeometry(2, 64);
    material_sun = new THREE.MeshBasicMaterial({color: new THREE.Color(0.8, 0.8, 0)});
   
    sun = new THREE.Mesh(sun_geometry, material_sun);
    console.log(sun.material.color);
    scene.background = new THREE.Color(0.3, 0.7, 0.9)
    door = new THREE.Mesh(new THREE.BoxGeometry(2, 1.55, 0.02), material_door_double);
    door.position.y = 0.7;
    door.position.z = 5;
    interactive.push(door);
    actions[door.id] = function(x){
          var self = scene.getObjectById(x);
          console.log(self.material.map.image.src);
          
          $("#portrait").attr("src", self.material.map.image.src);
          $("#speaker-name").html("<b>Drzwi</b>");
          $("#text-area").html("<i>Jestem drzwiami.<br> Łączę wnętrze z zewnętrzem. <br> Jestem potrzebny.</i>");
          $("#textbox").show();
    }
    scene.add(door);
    
    amb_light = new THREE.AmbientLight( 0x000000, 0.25 ); // soft white light
    general_light = new THREE.AmbientLight( 0xffffff, 0.5 ); // soft white light
    scene.fog = new THREE.Fog(0x000000, 10, 100);
    scene.add( amb_light ); 
    scene.add(general_light);
    scene.add(sun);
  
    makeRandomBoxes(1,1);
    makeATable(0.7);
    lookaters = [];
    for (var cnt = 0; cnt<5; cnt++){
    makeNPC(cnt, (cnt/2-1), 4.8);
    }
    renderer = new THREE.WebGLRenderer( { antialias: true } );
   
    renderer.setAnimationLoop( animation );
    initRenderer(width, height);
    var canvas = document.querySelector('canvas');
    console.log("INITIALIZED");
  
    canvas.requestPointerLock = canvas.requestPointerLock ||canvas.mozRequestPointerLock;
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
  
    canvas.onclick = function() {
      if(!touchscreen&&!paused){
      canvas.requestPointerLock();
    }
  }
  $("#curtain").hide();
  bgm.play();
  }
  var elem = document.documentElement;
  let fullscr = false;
  
  
  function initRenderer(width, height){
    if(!(width/height > 1)) height = height/2;
    renderer.setSize( width, height, true );
    document.body.replaceChild( renderer.domElement, document.getElementsByTagName("canvas")[0])
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
  }
  
  // document.addEventListener("fullscreenchange", function (){console.log("zmiana ekrana");document.removeEventListener("touchstart", openFullscreen);
  //       document.removeEventListener("dblclick", openFullscreen);
        
  //       console.log("Resizing...");
  //       // console.log(document.fullscreenElement);
  //       init();
  //       document.querySelector('canvas').requestPointerLock();
  //     });
  //       document.addEventListener("webkitfullscreenchange", function (){console.log("zmiana ekrana");document.removeEventListener("touchstart", openFullscreen);
  //       document.removeEventListener("dblclick", openFullscreen);
  //       console.log("Resizing...");
  //       // console.log(document.fullscreenElement);
  //       init();
  //       document.querySelector('canvas').requestPointerLock();
  //     });
  function openFullscreen() {
           
          if (elem.requestFullscreen) {
              elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) { /* Safari */
              elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { /* IE11 */
              elem.msRequestFullscreen();
          }
          fullscr = true;
          initRenderer(screen.width, screen.height);
  
  }
  
  var boxes = [];
  var light;
  function addLight(x, y, z) {
      const color = 0xFFFFFF;
      const intensity = 1;
      light = new THREE.PointLight(color, intensity);
      light.position.set(x, y, z);
      scene.add(light);
      light.shadow.mapSize.width = 512; // default
  light.shadow.mapSize.height = 512; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 500; // default
    }
  // let clip;
  function makeNPC(version, x=0, z=0, y=0.4, n="default"){
  
    let npc_geometry = new THREE.PlaneGeometry(0.5, 0.9);
    npc = new THREE.Mesh(npc_geometry, npc_materials[version]);
    npc.position.y = y;
    npc.position.x = x;
    npc.position.z = z;
    lookaters.push(npc.id);
    // collidableMeshList.push(npc);
    npc.name = n;
    interactive.push(npc);
        actions[npc.id] = function(x) {
          var self = scene.getObjectById(x);
          console.log(self.material.map.image.src);
          stare(self);
          $("#portrait").attr("src", self.material.map.image.src);
          $("#speaker-name").html("<b>Student UŚ</b>");
          switch(flags.student.counter){
            case 0:
              $("#text-area").html("Masz dla mnie jakieś paluszki?");
              flags.student.counter++;
              break;
            case 1:
              if(inventory["Paluszki"].n){
                $("#text-area").html("O dziękuję!");
                inventory["Paluszki"].n--;
                // var animation = new THREE.VectorKeyframeTrack('.position', [0, 2],  [self.position.x, self.position.y, self.position.z, self.position.x+2, self.position.y, self.position.z]);
                // console.log(animation);
                // var studentLeave = new THREE.AnimationClip('studentLeave', -1, [animation]);
                // console.log(studentLeave);
                // var mixer = new THREE.AnimationMixer(self);
                // clip = mixer.clipAction(studentLeave);
                // console.log(clip);
                // clip.play();
                // for (var i; i<10000; i++){
                //   mixer.update(1);
                // }
                quests["Znajdź paluszki dla studentów"].done = true;
                antiCollidableMeshList.push(door);
                flags.student.counter++;
              }else{
                $("#text-area").html("Dalej nie masz paluszków? Może są w automacie...");
                
              }break;
            default: 
            $("#text-area").html("Proszę nie przeszkadzaj mi, właśnie się uczę");
            break;
          }
          $("#textbox").show();
        }
    scene.add(npc);
  }
  
  function makeATable(size){
    geometry = new THREE.BoxGeometry( size,  2*size/3,  size);
    mesh = new THREE.Mesh( geometry, texture_table);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    interactive.push(mesh);
        actions[mesh.id] = function(x) {
          var self = scene.getObjectById(x);
          console.log("Success!");
          
          $("#portrait").attr("src", self.material[2].map.image.src);
          $("#speaker-name").html("<b>Stolik</b>");
          if(flags.table.counter<5){
          $("#text-area").html("<i>*stoi*</i>");
          flags.table.counter++;
          }if (flags.table.counter>4 && flags.table.counter<10){
            $("#text-area").html("<i>*stoi mocniej*</i>");
          flags.table.counter++;
          }
          if(flags.table.counter>9&&flags.table.counter<15){
            if(flags.table.counter==10)self.rotateX(Math.PI/2);
            $("#text-area").html("<i>*leży*</i>");
            flags.table.counter++;
          }if(flags.table.counter==15){
            self.rotateX(-Math.PI/2);
            flags.table.counter = 0;
            $("#text-area").html("<i>*stoi*</i>");
          }
          $("#textbox").show();
        }
    scene.add( mesh );
    mesh.position.y = size/4;
    mesh.position.x = 3;
    collidableMeshList.push(mesh);
  }
  
  function makeRandomBoxes(rows, cols){
    for (var dubstep = 0; dubstep<rows; dubstep++){
      for (step = 0; step<cols; step++){
        var size = 0.5;
        geometry = new THREE.BoxGeometry( size,  size*2,  size);
        mesh = new THREE.Mesh( geometry, texture_vending_machine);
        interactive.push(mesh);
        actions[mesh.id] = function(x) {
          var self = scene.getObjectById(x);
          console.log("Success!");
          stare(self);
         console.log(self.material);
          $("#portrait").attr("src", self.material[4].map.image.src);
          $("#speaker-name").html("<b>Automat z przekąskami</b>");
          switch(flags.vending_machine.counter){
          case 0:
            $("#text-area").html("Witam, czy chcesz wziąć darmowe paluszki?");
            flags.vending_machine.counter = 1;
            break;
          case 1:
            $("#text-area").html("Proszę, paluszki dla ciebie");
            flags.vending_machine.counter = 1;
            inventory["Paluszki"].n++;
            break;
          default:
            $("#text-area").html("<i>*automat nieczynny*</i>");
            flags.vending_machine.counter = 0;
          }
          $("#textbox").show();
        }
        scene.add( mesh );
        collidableMeshList.push(mesh);
        mesh.position.y = 0.5;
        mesh.position.x = 2*(step-cols/2)+0.5;
        mesh.position.z = 2*(dubstep-rows/2);
        mesh.rotation.y = Math.random()*2*Math.PI;
      }
    }
  }
  
  function stare(obj){
    obj.lookAt(new THREE.Vector3(camera.position.x, obj.position.y, camera.position.z));
  }
  
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
  function closeFullscreen(){
          
          if (document.exitFullscreen) {
              document.exitFullscreen();
          } else if (document.webkitExitFullscreen) { /* Safari */
              document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { /* IE11 */
              document.msExitFullscreen();
          }
          fullscr = false;
          initRenderer(window.innerWidth, window.innerHeight);
  }
  
  var hour = 0;
  var ingameTime = 0;
  var dayLength = 8000;
  var timeSpeed = 1.0;
  function parseHour(x){
    return String(Math.floor(hour/6))+":"+String(hour%6)+"0";
  }
  
  function animation( time ) {
      renderer.render( scene, camera );
    if(!paused){
      ingameTime += timeSpeed;
      sun.position.x = camera.position.x+30*Math.sin(ingameTime/dayLength);
      sun.position.z = camera.position.z+30*Math.sin(ingameTime/dayLength);
      sun.position.y = camera.position.y+50*Math.cos(ingameTime/dayLength);
      amb_light.color.r = Math.max(1*Math.sin(ingameTime/dayLength)**6-0.4, 0);
      scene.background.r = Math.max(0.8*Math.sin(ingameTime/dayLength)**6-0.4, 0);
      sun.material.color = new THREE.Color(((0.4*Math.sin(ingameTime/dayLength)**6)+0.6), 0.7, 0.3);
      scene.background.g = 0.6*Math.cos(ingameTime/dayLength);
      scene.background.b = 0.8*Math.cos(ingameTime/dayLength);
      scene.fog.color = scene.background;
      general_light.intensity = Math.max(scene.background.b, 0.3);
      hour = Math.round(71.5+(Math.cos(ingameTime/dayLength/2+Math.PI/2))*-Math.sign(Math.sin(ingameTime/dayLength/2+Math.PI/2))*71.5);
      $("#clock").text(String(parseHour(hour)));
      for (const objId in lookaters){
        var curObj = scene.getObjectById(lookaters[objId]);
        stare(curObj);
      }
      sun.lookAt(camera.position);
      if (cameraTouchMove == true){
        rotateCamera(movementX/-1000, movementY/-1000);
      }
      resistanceDeceleration(camera_velocity);
      if(camera.position.y>jump_lim&&debug != true){camera_acceleration.y = 0; jumped = true;}
      applyAcceleration(camera_velocity, camera_acceleration);
      applyVelocity(camera, camera_velocity, debug);
      playerHitbox.position.copy(camera.position);
      playerHitbox.translateY(-0.4);
      
      if(!debug){
        collisionDetection();
      }
    }
  }
  
  const repulsion_vector = new THREE.Vector3(0, 0.01,0);
  const interactRange = 2;
  
  function collisionDetection(){
    var originPoint = playerHitbox.position.clone();
    grounded = 0;
    for (var vertexIndex = 0; vertexIndex < playerHitbox.geometry.attributes.position.count; vertexIndex++){
      var localVertex = new THREE.Vector3();
      var globalVertex = new THREE.Vector3();
      localVertex.fromBufferAttribute( playerHitbox.geometry.attributes.position, vertexIndex ); 
      globalVertex = localVertex.applyMatrix4( playerHitbox.matrix );
      var directionVector = globalVertex.sub( playerHitbox.position );
      var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
      var collisionResults = ray.intersectObjects( collidableMeshList );
      if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
        if(directionVector.y>0.4&&jumped){
          camera.position.y -= 0.0005;
          jumped = true; jump_lim = camera.position.y-2;}
        if(directionVector.y<-0.35){
          applyAcceleration(camera_velocity, repulsion_vector); grounded++; jump_lim = camera.position.y+2; }
        if(directionVector.y>-0.2&&directionVector.y<0.3){
          var antiCollisionResults = ray.intersectObjects( antiCollidableMeshList );
          if ((antiCollisionResults.length > 0 && antiCollisionResults[0].distance < directionVector.length())){
        
            }else{
            camera.position. x += directionVector.negate().projectOnPlane(global_axis_y).setLength(playerSpeed/25).x;
            camera.position.z -= directionVector.negate().projectOnPlane(global_axis_y).setLength(playerSpeed/25).z;
          }
        }
      }
    }
  
      if (grounded>65)jumped = false;else jumped = true;	
  }
  
  function interact(){
          var rayDirection = new THREE.Vector3();
          camera.getWorldDirection(rayDirection);
          var ray = new THREE.Raycaster( camera.position, rayDirection.normalize() );
          var intersected = ray.intersectObjects( interactive );
          if ( intersected.length > 0 && intersected[0].distance < interactRange ){
            actions[intersected[0].object.id](intersected[0].object.id);
          }
          else{
            $("#textbox").hide();
          }
  }
  let touchscreen = false;
  document.addEventListener("mousemove", updateDisplay, false);
  document.getElementById("welcome").addEventListener("click", function(e){ $("#welcome").hide(); openFullscreen(); if(!touchscreen)document.querySelector('canvas').requestPointerLock();paused = false;}, false);
  // document.addEventListener("touchstart", openFullscreen, false);
  document.addEventListener("touchstart", touchControlsInit, false);
  document.getElementById("cameraTouchBox").addEventListener("touchstart", handleStartCamera, false);
  document.getElementById("jumpTouchBox").addEventListener("touchstart", handleStartJump, false);
  document.getElementById("jumpTouchBox").addEventListener("touchend", handleEndJump, false);
  
  document.getElementById("menuTouchBox").addEventListener("touchstart", handleStartMenu, false);
  
  document.getElementById("interactTouchBox").addEventListener("touchstart", handleStartInteract, false);
  document.getElementById("interactTouchBox").addEventListener("touchend", handleEndInteract, false);
  document.getElementById("cameraTouchBox").addEventListener("touchend", handleEndCamera, false);
  document.getElementById("cameraTouchBox").addEventListener("touchmove", handleMoveCamera, false);
  document.getElementById("movementTouchBox").addEventListener("touchstart", handleStartMovement, false);
  document.getElementById("movementTouchBox").addEventListener("touchend", handleEndMovement, false);
  document.getElementById("movementTouchBox").addEventListener("touchmove", handleMoveMovement, false);
  document.getElementById("timeSpeed").addEventListener("input", function(){timeSpeed = parseFloat(document.getElementById("timeSpeed").value); $("#timeSpeedValue").text(timeSpeed)});
  document.getElementById("playerSpeed").addEventListener("input", function(){playerSpeed = parseFloat(document.getElementById("playerSpeed").value); $("#playerSpeedValue").text(playerSpeed)});
  document.getElementById("debugC").addEventListener("click", function(){debug = document.getElementById("debug").checked; $("#debugValue").text(debug)});
  document.getElementById("fullscrC").addEventListener("click", function(){fullscr = document.getElementById("fullscr").checked; console.log(fullscr);if(fullscr)closeFullscreen();else openFullscreen(); $("#fulscrValue").text(fullscr)});
  
  
  
  function touchControlsInit(){
    touchscreen=true;
    $("#touch-control-box").show();
    document.getElementById("textbox").addEventListener("touchstart", function(){$("#textbox").hide()}, false);
  }
  
  
  var keysPressed = {};
  
  var playerSpeed = 0.15;
  var jump_lim = 2.5;
  
  
  document.addEventListener('keydown', handleKeydown);
  function handleKeydown(event){
     keysPressed[event.key.toLowerCase()] = true;
     if (keysPressed['tab']) {
      event.preventDefault();
     }
     camera.getWorldDirection(camera_global_direction);
     if (keysPressed['arrowup']||keysPressed['w']) {
       camera_acceleration.z = -playerSpeed;
     } if (keysPressed['arrowright']||keysPressed['d']) {
      camera_acceleration.x = playerSpeed;
     }if (keysPressed['arrowleft']||keysPressed['a']) {
      camera_acceleration.x= -playerSpeed;
     }if (keysPressed['arrowdown']||keysPressed['s']) {
      camera_acceleration.z = playerSpeed;
     }if (keysPressed['`']) {
      $("#console").show();
     }if (keysPressed[' ']) {
      if(jumped == false||debug){ camera_acceleration.y = 1; jumped = true;}
      if(debug)camera_acceleration.y = playerSpeed;
     }if (keysPressed['shift']&&debug) {
      camera_acceleration.y = -playerSpeed;
     }
     if (keysPressed['e']) {
        interact();
     }
     if (keysPressed['q']){
       $("#textbox").hide();
     }
     if (keysPressed['z']) {
        toggleDebug();
        // camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
        
     }
     if (keysPressed['g']) {
        openFullscreen();
        // camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
        
     }
  }
  
  var debug = false;
  
  function updateMenu(){
    $("#questlog").html("<tbody></tbody>");
    $("#inventory").html("<tbody></tbody>");
    
    for (var key in quests){
      var status = "?";
      if (quests[key].done) status = "✔️"; else status = "❌";
      $("#questlog > tbody:last-child").append("<tr><td  class=\"item\" colspan=\"3\" align=\"left\">"+key+"<span class=\"item description\">"+quests[key].desc+"</span></td><td>"+status+"</td></tr>")
    }
    var empty = true;
    for (var key in inventory){
      if (inventory[key].n){
        empty = false;
        $("#inventory > tbody:last-child").append("<tr><td class=\"item\" colspan=\"3\" align=\"left\">"+key+"<span class=\"item description\">"+inventory[key].desc+"</span></td><td align=\"right\">"+inventory[key].n+"</td></tr>");
      }
    }
    if(empty)$("#inventory").html("twój ekwipunek jest pusty...")
    window.localStorage.setItem("inventory", JSON.stringify(inventory));
    window.localStorage.setItem("quests", JSON.stringify(quests));
    window.localStorage.setItem("flags", JSON.stringify(flags));
  }
  
  function togglePause(){
    paused = !paused;
    if (paused){
      updateMenu();
      $("#menu").show();
      if(!touchscreen){
        document.exitPointerLock();}
    }else {$("#menu").hide()
      if(!touchscreen){
        var canvas = document.querySelector('canvas');
        canvas.requestPointerLock();
      }
    }
  }
  function toggleDebug(){
    debug = !debug;
    if(debug)playerSpeed = 1;else playerSpeed = 0.2;
  }
  var releasedKey="";
  document.addEventListener('keyup', (event) => {
    
    releasedKey = event.key.toLowerCase();
    console.log(releasedKey);
    if (releasedKey =='enter') {
      togglePause();
    }
    if (releasedKey =='tab') {
      event.preventDefault();
      if(!paused){
        togglePause();
        $("#Inventory-link").click();
      }
      else{
        if($("#Inventory")[0].style.display == "block" )togglePause();
        else{$("#Inventory-link").click();}
    }
  }
      if (releasedKey =='f') {
      if(!paused){
        togglePause();
        $("#Quests-link").click();
      }
      else{
        if($("#Quests")[0].style.display == "block" )togglePause();
        else{$("#Quests-link").click();}
    }
  }
    if (releasedKey =='h') {
      event.preventDefault();
      if(!paused){
        togglePause();
        $("#Help-link").click();
      }
      else{
        if($("#Help")[0].style.display == "block" )togglePause();
        else{$("#Help-link").click();}
    }
    }
    if (releasedKey =='arrowup'||releasedKey == 'w') {
       camera_acceleration.z =  0;
       if (keysPressed['arrowdown']||keysPressed['s']) {
      camera_acceleration.z = playerSpeed;
     }
    
     } if (releasedKey =='arrowright'||releasedKey =='d') {
      camera_acceleration.x = 0;
      if (keysPressed['arrowleft']||keysPressed['a']) {
      camera_acceleration.x= -playerSpeed;
      }
     }if (releasedKey =='arrowleft'||releasedKey =='a') {
      camera_acceleration.x= 0;
      if (keysPressed['arrowright']||keysPressed['d']) {
      camera_acceleration.x = playerSpeed;
     }
     }if (releasedKey =='arrowdown'||releasedKey =='s') {
      camera_acceleration.z = 0;
      if (keysPressed['arrowup']||keysPressed['w']) {
       camera_acceleration.z = -playerSpeed;
      }
     }if (releasedKey ==' ') {
      camera_acceleration.y = 0;
      if (keysPressed['shift']&&debug) {
       camera_acceleration.y = -playerSpeed;
      }
     }if (releasedKey=='shift') {
      camera_acceleration.y = 0;
      if (keysPressed[' ']) {
       camera_acceleration.y = playerSpeed;
      }
    }
    delete keysPressed[event.key.toLowerCase()];
  });
  
  function applyVelocity(obj, vel, flight){
    var vst = 0.007;
    var orientation = new THREE.Vector3();
    obj.getWorldDirection(orientation);
    
    
    orientation.y = 0;
    var k = (orientation.x*100)/(orientation.z*100);
  
    var d = 1/Math.sqrt(k**2+1);
    if (d==NaN){
      d = 0;
    }
    if (Math.abs(vel.x) < vst){
      vel.x = 0;
    }else{
      if(flight) obj.translateX(vel.x); else {
    obj.position.x -= vel.x*d*Math.sign(orientation.z);
    obj.position.z -= -vel.x*d*Math.abs(k)*Math.sign(orientation.x)}}
    if (Math.abs(vel.y) < vst){
      vel.y = 0;
    }else{ if (flight) obj.position.y +=vel.y;else{
    obj.position.y +=vel.y;}}
  
    if (Math.abs(vel.z) < vst){
      vel.z = 0;
    }else{
      if (flight){obj.translateZ(vel.z)}else{
      obj.position.z -= vel.z*d*Math.sign(orientation.z);
    obj.position.x -= vel.z*d*Math.abs(k)*Math.sign(orientation.x)}}
  }
  
  function applyAcceleration(vel, acc){
    vel.addScaledVector(acc, 0.1);
  }
  
  function resistanceDeceleration(vel){
    const rf = 50;
    if(debug)var g=0;else var g = gravity.y;
    applyAcceleration(vel, new THREE.Vector3(-rf*Math.sign(vel.x)*(vel.x**2), -rf*(Math.sign(vel.y)*(vel.y**2)-g), -rf*Math.sign(vel.z)*(vel.z**2)));
  }
  
  function updateDisplay(e){
    var movementX = e.movementX || e.mozMovementX || 0;
    var movementY = e.movementY || e.mozMovementY ||  0;
    if(!paused) rotateCamera(movementX/-100, movementY/-100);
  }
  let touchLim = 40;
  let movementX = 0;
  let movementY = 0;
  let cameraTouchMove = false;
  
  function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
      var id = ongoingTouches[i].identifier;
  
      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }
  
  function MongoingTouchIndexById(idToFind) {
    for (var i = 0; i < MongoingTouches.length; i++) {
      var id = MongoingTouches[i].identifier;
  
      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }
  function copyTouch(touch) {
    return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
  }
  var ongoingTouches = [];
  var MongoingTouches = [];
  
  var initialTouchXcamera;
  var initialTouchYcamera;
  var initialTouchXmovement;
  var initialTouchYmovement;
  function handleStartCamera(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    cameraTouchMove = true;
    for (var i = 0; i < touches.length; i++) {
      ongoingTouches.push(copyTouch(touches[i]));
      initialTouchXcamera = touches[i].clientX;
      initialTouchYcamera= touches[i].clientY;   
    }
  }
  function handleStartJump(evt) {
    evt.preventDefault();
    if(jumped == false||debug){ camera_acceleration.y = 1.4; jumped = true;}
    if(debug)camera_acceleration.y = playerSpeed;
    
  }
  function handleEndJump(evt) {
    evt.preventDefault();
    if(debug)camera_acceleration.y = 0;
    
  }
  function handleStartInteract(evt) {
    evt.preventDefault();
    interact();
    
  }
  function handleStartMenu(evt) {
    evt.preventDefault();
    togglePause();
    if (paused) $("#menuTouchBox").html("❌");
    else $("#menuTouchBox").html("<b>︙</b>")
    
  }
  function handleEndInteract(evt) {
  
  }
  function handleMoveCamera(evt) {
    evt.preventDefault();
    
    var touches = evt.changedTouches;
  
    for (var i = 0; i < touches.length; i++) {
      var idx = ongoingTouchIndexById(touches[i].identifier);
      if (idx >= 0) {
        let bounds = document.getElementById("cameraTouchBox").getBoundingClientRect();
        movementX = touches[i].clientX-initialTouchXcamera;
        movementY = touches[i].clientY-initialTouchYcamera;
        if (movementX>touchLim){ movementX = touchLim;}
        if (movementY>touchLim){ movementY = touchLim;}
        if (movementX<-touchLim){ movementX = -touchLim;}
        if (movementY<-touchLim){ movementY = -touchLim;}
        ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
      } else {
      }
    }
  }
  function handleEndCamera(evt) {
    evt.preventDefault();
  
    var touches = evt.changedTouches;
    rotateCamera(movementX/-1000, movementY/-1000);
    cameraTouchMove = false;
    for (var i = 0; i < touches.length; i++) {
      var idx = ongoingTouchIndexById(touches[i].identifier);
      if (idx >= 0) {
        ongoingTouches.splice(idx, 1);  // remove it; we're done
      } 
    }
  }
  function handleStartMovement(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    
    for (var i = 0; i < touches.length; i++) {
      MongoingTouches.push(copyTouch(touches[i]));
      initialTouchXmovement = touches[i].clientX;
      initialTouchYmovement= touches[i].clientY;   
    }
  }
  function handleMoveMovement(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    for (var i = 0; i < touches.length; i++) {
          var idx = MongoingTouchIndexById(touches[i].identifier);
      if (idx >= 0) {
        let bounds = document.getElementById("cameraTouchBox").getBoundingClientRect();
      camera_acceleration.x = 0.01*(touches[i].clientX-initialTouchXmovement)/4;
      camera_acceleration.z = 0.01*(touches[i].clientY-initialTouchYmovement)/4;
      if (camera_acceleration.x>playerSpeed){ camera_acceleration.x = playerSpeed;}
      if (camera_acceleration.z>playerSpeed){ camera_acceleration.z = playerSpeed;}
      if (camera_acceleration.x<-playerSpeed){ camera_acceleration.x = -playerSpeed;}
      if (camera_acceleration.z<-playerSpeed){ camera_acceleration.z = -playerSpeed;}
        MongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
      } 
    }
  }
  function handleEndMovement(evt) {
    evt.preventDefault();
    camera_acceleration.z = 0;
    camera_acceleration.x = 0;
    var touches = evt.changedTouches;
    camera;
   
    for (var i = 0; i < touches.length; i++) {
      var idx = MongoingTouchIndexById(touches[i].identifier);
      if (idx >= 0) {
        MongoingTouches.splice(idx, 1);  // remove it; we're done
      } 
    }
  }
  window.onload = init(window.innerWidth, window.innerHeight);
  var global_axis_y = new THREE.Vector3(0,1,0);
  var camera_global_direction = new THREE.Vector3();
  var camera_velocity = new THREE.Vector3(0 ,0, 0);
  var camera_acceleration = new THREE.Vector3(0,0,0);
  var gravity = new THREE.Vector3(0,-0.01,0);
  function rotateCamera(hor, vert){
    camera.getWorldDirection(camera_global_direction);
    camera.rotateOnWorldAxis(global_axis_y, hor);
    playerHitbox.rotation.y = camera.rotation.y;
  
    if((camera_global_direction.angleTo(global_axis_y)<0.2&&vert>0) || (camera_global_direction.angleTo(global_axis_y)>3&&vert<0)){
    }else{
      camera.rotateX(vert);
    }
  }