var Example = Example || {};

Example.constraints = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.getElementById("canid"),
        engine: engine,
        options: {
            width: 520,
            height: 390,
            showAngleIndicator: false,
            background: '#000000'
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);


    // add stiff multi-body constraint
    var bodyA = Bodies.polygon(125, 80, 1, 20);//fixed point one
    var bodyB = Bodies.polygon(106, 280, 4, 20);//mass one

    bodyA.isStatic = true;
    var mass1 = 100;
    bodyA.mass = mass1;

    var constraint = Constraint.create({
        bodyA: bodyA,
        pointA: { x: -19, y: 0 },
        bodyB: bodyB,
        pointB: { x: 0, y: 0 },
        stiffness: 0.6
    });

    World.add(world, [bodyA, bodyB, constraint]);

    // add stiff multi-body constraint
    var bodyA = Bodies.polygon(375, 80, 1, 20);//fixed point 2
    var bodyB = Bodies.polygon(394, 280, 4, 20);//mass two

    bodyA.isStatic = true;
    var mass2 = 100;
    bodyA.mass = mass2;

    var constraint = Constraint.create({
        bodyA: bodyA,
        pointA: { x: 19, y: 0 },
        bodyB: bodyB,
        pointB: { x: 0, y: 0 },
        stiffness: 0.1
    });

    World.add(world, [bodyA, bodyB, constraint]);

    var bodyB = Bodies.polygon(250, 180, 1, 2);//fixed point in the middle
    bodyB.isStatic = false;

    var constraint = Constraint.create({
        bodyA: bodyA,
        pointA: { x: -14, y: -14 },
        bodyB: bodyB,
        pointB: { x: 0, y: 0 },
        stiffness: 0.1
    });

    World.add(world, [bodyB, constraint]);

    var bodyA = Bodies.polygon(125, 80, 1, 20);//mass2 called again
    bodyA.isStatic = true;
    var mass3 = ((mass1+mass2)/4)*3;
    bodyA.mass = mass3;

    var constraint = Constraint.create({
        bodyA: bodyA,
        pointA: { x: 14, y: -14 },
        bodyB: bodyB,
        pointB: { x: 0, y: 0 },
        stiffness: 0.1
    });

    World.add(world, [constraint]);

    var bodyA = Bodies.polygon(250, 330, 4, 20);//unknown mass

    var constraint = Constraint.create({
        bodyA: bodyA,
        pointA: { x: 0, y: 0 },
        bodyB: bodyB,
        pointB: { x: 0, y: 0 },
        stiffness: 0.1
    });

    World.add(world, [constraint, bodyA]);


    /*World.add(world, [
        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);*/

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                // allow bodies on mouse to rotate
                angularStiffness: 0,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    /*
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });
    */

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
