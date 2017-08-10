class Shell {

	Shell cd(final String path) {
	     	    
		return this;

	}

	public String path() {
		return "/";
	}
}

public class Directory {

	public static void main(String[] args) {

    final Shell shell = new Shell();
		assert shell.path().equals("/");

		shell.cd("/");
		assert shell.path().equals("/");

		shell.cd("usr/..");
		assert shell.path().equals("/");

		shell.cd("usr").cd("local");
		System.out.println(shell);

		shell.cd("../local").cd("./");
		System.out.println(shell.path());
		/*assert shell.path().equals("/usr/local");*/

		shell.cd("..");
		System.out.println(shell.path());
		
		assert shell.path().equals("/usr");

		shell.cd("//lib///");
		System.out.println(shell.path());

		assert shell.path().equals("/lib");
	}
}
