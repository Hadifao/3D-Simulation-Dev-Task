//CAMERA STUFF
var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            75, window.innerWidth/window.innerHeight,
            0.5, 1000
        );
        
        camera.position.z = 5;
        camera.position.x = 3;
        camera.position.y = 1;
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    
        

//CUBE GEO, COLOR LIST
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    var cubeMaterials = []
    color_pallet = ["red","green","blue","yellow","black","purple"]
    for(let i = 0; i<color_pallet.length; i++){
         cubeMaterials.push(new THREE.MeshBasicMaterial({color: color_pallet[i]}))
    }
    
// RANDOM FACE COLOR GENERATOR USING LIST OF UNIQUE RANDOM NUMBERS NO DUPLICATES.
    function face_color(){
        unique_rand = [];
        randCubFaceColor = [];
        while(unique_rand.length < 6){
            var r = Math.floor(Math.random() * 6);
            if(unique_rand.indexOf(r) === -1) {
                unique_rand.push(r) 
            }     
        }
    
        for (let i = 0; i<cubeMaterials.length; i++){
            randCubFaceColor.push(cubeMaterials[unique_rand[i]])
        }
        return randCubFaceColor
    }
    
    
    
// SETTING RANDOMIZED FACE COLORS FOR CUBE-A AND CUBE-B
    var material = new THREE.MeshFaceMaterial(face_color())
    var material2 = new THREE.MeshFaceMaterial(face_color())
    
// GENERATING CUBE-A AND CUBE-B
    var cubeB = new THREE.Mesh(geometry, material);
    var cubeA = new THREE.Mesh(geometry, material2);
    
// CUBES POSITION 
    cubeB.position.set(5,1,1);
    cubeA.position.set(1,1,1);
    

//ADDING CUBES TO SCENE
    scene.add(cubeB);
    scene.add(cubeA);
    
//ANIMATING CUBES AND APPLYING CONDITIONS
    function animate(){
        requestAnimationFrame(animate);
    // STARTING MOTION
        cubeB.position.x -= 0.01
        cubeA.position.x += 0.01
    //COLOR RGB USED WITH CONDITIONS BELOW
    black = {r: 0, g: 0, b: 0};
    red = {r: 1, g: 0, b: 0}
    blue = {r: 0, g: 0, b: 1}
    purple = {r: 0.5019607843137255, g: 0, b: 0.5019607843137255}
    yellow = {r: 1, g: 1, b: 0}
    green = {r: 0, g: 0.5019607843137255, b: 0}
    // COLLISION DETECTION
        if (cubeB.position.x < cubeA.position.x+1){
            //DELETING CUBES WITH DUPLICATE FACES
            if(material[1].color == material2[0].color){
                // console.log(material.color[0])
                scene.remove(cubeB);
                scene.remove(cubeA);
            }
            //DELETING CUBE-A WHEN COLLIDING WITH CUBE-B (BLACK)
            else if(material[1].color.r == black.r && material[1].color.g == black.g && material[1].color.b == black.b ){
                scene.remove(cubeA)
            }   
            //STOPPING CUBE-A WHEN COLLIDING WITH CUBE-B (RED)
            else if(material[1].color.r == red.r && material[1].color.g == red.g && material[1].color.b == red.b ){
                cubeA.position.set(2.5,1,1)    
            }    
            // DOUBLING SPEED OF CUBE-A WHEN COLLIDING WITH CUBE-B (GREEN) 0.01 + 0.01 = 0.02 AKA DOUBLE SPEED
            else if(material[1].color.r == green.r && material[1].color.g == green.g && material[1].color.b == green.b ){
                cubeA.position.x += 0.01
            } 
            // REVERSING MOTION OF CUBE-A WHEN COLLIDING WITH CUBE-B (BLUE) 0.01 - 0.02 = -0.01 AKA REVERSE SPEED
            else if(material[1].color.r == blue.r && material[1].color.g == blue.g && material[1].color.b == blue.b ){
                // scaled for distinction
                cubeA.position.x -=  0.02 
            }   
            // HALFING SPEED OF CUBE-A WHEN COLLIDING WITH CUBE-B (YELLOW) //0.01 - 0.005 = 0.005 AKA HALF SPEED
            else if(material[1].color.r == yellow.r && material[1].color.g == yellow.g && material[1].color.b == yellow.b ){
                cubeA.position.x -= 0.005
            }   
            // GENERATE RANDOM TRAJECTORY WHEN COLLIDING WITH CUBE-B (PURPLE)
            else if(material[1].color.r == purple.r && material[1].color.g == purple.g && material[1].color.b == purple.b ){
                cubeA.position.x -= 0.01
                cubeA.translateX(Math.random()*0.01)
                cubeA.translateY(Math.random()*0.01)
                cubeA.translateZ(Math.random()*0.01)
                
            }  

       
}   
    // RENDERING STUFF
        renderer.render(scene, camera);
        //SETTING BACKGROUND COLOR TO WHITE SINCE WE HAVE A BLACK COLOR IN THE PALLET
        renderer.setClearColor(0xffffff,1)
            
        
        }
    // DEBUGGIN STUFF
        // console.log("cube A is")
        // console.log(material2[0].color)
        // console.log("cube B is")
        // console.log(material[1].color)
        animate();
      