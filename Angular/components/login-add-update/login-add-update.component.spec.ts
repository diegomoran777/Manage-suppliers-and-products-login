import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAddUpdateComponent } from './login-add-update.component';

describe('LoginAddUpdateComponent', () => {
  let component: LoginAddUpdateComponent;
  let fixture: ComponentFixture<LoginAddUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAddUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
