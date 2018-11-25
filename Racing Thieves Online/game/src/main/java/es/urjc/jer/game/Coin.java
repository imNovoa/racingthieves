package es.urjc.jer.game;


public class Coin {

	private int x, y;
	private long id;
	private boolean generated;
	
	Coin() {
		this.x= 0;
		this.y = 0;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public boolean setGenerated(boolean gen) {
		this.generated = gen;
	}

	public boolean isGenerated() {
		return generated;
	}
	
	@Override
	public String toString() {
		return "Coin [id=" + id + ", x=" + x + ", y=" + y + "]";
	}
	
}
