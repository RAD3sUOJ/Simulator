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
        element: document.body,
        engine: engine,
        options: {
            width: 600,
            height: 400,
            showAngleIndicator: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);


    // add stiff multi-body constraint
    var bodyA = Bodies.polygon(175, 100, 1, 20);
    var bodyB = Bodies.polygon(156, 300, 1, 20);

    bodyA.isStatic = true;

    var constraint = Constraint.create({
        bodyA: bodyA,
        pointA: { x: -19, y: 0 },
        bodyB: bodyB,
        pointB: { x: 0, y: 0 },
        stiffness: 0.8
    });

    World.add(world, [bodyA, bodyB, constraint]);

    // add stiff multi-body constraint
    var bodyA = Bodies.polygon(425, 100, 1, 20);
    var bodyB = Bodies.polygon(444, 300, 1, 20);

    bodyA.isStatic = true;

    var constraint = Constraint.create({
        bodyA: bodyA,
        pointA: { x: 19, y: 0 },
        bodyB: bodyB,
        pointB: { x: 0, y: 0 },
        stiffness: 0.8
    });

    World.add(world, [bodyA, bodyB, constraint]);

    var bodyB = Bodies.polygon(300, 200, 1, 5);
    bodyB.isStatic = true;

    var constraint = Constraint.create({
        bodyA: bodyA,
        pointA: { x: -14, y: -14 },
        bodyB: bodyB,
        pointB: { x: 0, y: 0 },
        stiffness: 0.8
    });

    World.add(world, [bodyB, constraint]);

    var bodyA = Bodies.polygon(175, 100, 1, 20);
    bodyA.isStatic = true;

    var constraint = Constraint.create({
        bodyA: bodyA,
        pointA: { x: 14, y: -14 },
        bodyB: bodyB,
        pointB: { x: 0, y: 0 },
        stiffness: 0.8
    });

    World.add(world, [constraint]);

    var bodyA = Bodies.polygon(300, 350, 1, 20);
    bodyA.label = "W2";

    var constraint = Constraint.create({
        bodyA: bodyA,
        pointA: { x: 0, y: 0 },
        bodyB: bodyB,
        pointB: { x: 0, y: 0 },
        stiffness: 0.8
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
