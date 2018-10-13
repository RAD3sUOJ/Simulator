var Example = Example || {};

Example.catapult = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Vector = Matter.Vector;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.getElementById("canidmeter"),
        engine: engine,
        options: {
            width: 520,
            height: 390,
            showAngleIndicator: false,
            showCollisions: false,
            showVelocity: true
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add stiff global constraint
    var body1 = Bodies.polygon(340, 250, 4, 20);
	body1.mass = 10;
	
    var body2 = Bodies.polygon(150, 250, 4, 20);
    body2.mass = 10;
	
    // add bodies
    var stack = Composites.stack(250, 255, 1, 0, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 30, 30);
    });

    var catapult = Bodies.rectangle(250, 180, 200, 20,);//meter rule.

    World.add(world, [
        stack,
        catapult,
        body1,
        body2,
        Bodies.rectangle(200, 390, 800, 50, { isStatic: true }),//this is floor.
        Bodies.rectangle(250, 330, 0.1, 300, { isStatic: true }),//this is knife edge.
        
        Constraint.create({ 
            bodyA: catapult, 
            pointB: Vector.clone(catapult.position),
            stiffness: 0,
            length: 0
        }),

        Constraint.create({
        bodyA: catapult, pointA: { x: 100, y:10 },
        bodyB: body1, pointB: { x: 0, y: 0 },
        stiffness: 0,
        damping: 0
        }),

        Constraint.create({
        bodyA: catapult, pointA: { x: -100, y:10 },
        bodyB: body2, pointB: { x: 0, y: 0 },
        stiffness: 0,
        damping: 0
        })
    ]);
     
    


    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};