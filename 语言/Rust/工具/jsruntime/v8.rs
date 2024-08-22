fn main() {
    // Initialize V8.
    let platform = v8::new_default_platform(0, false).make_shared();
    v8::V8::initialize_platform(platform);
    v8::V8::initialize();

    {
        // 创建一个新的隔离，并使其成为当前隔离。
        let isolate = &mut v8::Isolate::new(v8::CreateParams::default());

        // 创建一个堆栈分配句柄范围。
        let handle_scope = &mut v8::HandleScope::new(isolate);

        // 创建一个上下文
        let context = v8::Context::new(handle_scope);

        // 输入用于编译和运行hello world脚本的上下文。
        let scope = &mut v8::ContextScope::new(handle_scope, context);

        // 创建一个包含JavaScript源代码的字符串。
        let code = v8::String::new(
            scope,
            r#"
              console.log(111)
            "#,
        )
        .unwrap();

        // Compile the source code.
        let script = v8::Script::compile(scope, code, None).unwrap();
        // Run the script to get the result.
        let result = script.run(scope).unwrap();

        // 将结果转换为字符串并打印出来。
        let result = result.to_string(scope).unwrap();
        println!("{}", result.to_rust_string_lossy(scope));
    }

    unsafe {
        v8::V8::dispose();
    }
    v8::V8::dispose_platform();
}
