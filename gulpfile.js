const gulp = require("gulp");
const exec = require("child_process").exec;

gulp.task("copy-gql", () =>
  gulp.src("./src/**/*.gql").pipe(gulp.dest("./dist/"))
);

gulp.task("compile", (done) => {
  exec("tsc -p .", (err, stdOut, stdErr) => {
    console.log(stdOut);
    if (err) done(err);
    done();
  });
});

gulp.task("default", gulp.series("compile", "copy-gql"), () =>
  gulp.src("./src/**/*.json").pipe(gulp.dest("./dist"))
);
