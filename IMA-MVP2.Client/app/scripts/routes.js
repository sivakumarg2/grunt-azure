(function () {
  'use strict';

  function Routes ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/imethod-lite");

    $stateProvider.state('app', {
      url: "/",
      templateUrl: "/views/layouts/app.html"
    })

    // My Ideas page

    $stateProvider.state('myIdeas', {
        url: "my-ideas",
        parent: "app",
        views: {
            pageMeta: {
                templateUrl: "/views/partials/my-ideas-page-meta.html"
            },
            content: {
                templateUrl: "/views/partials/my-ideas.html"
            }
        }
    })

    $stateProvider.state('companyIdeas', {
        url: "company-ideas",
        parent: "app",
        views: {
            pageMeta: {
                templateUrl: "/views/partials/company-ideas-page-meta.html"
            },
            content: {
                templateUrl: "/views/partials/company-ideas.html"
            }
        }
    })

    $stateProvider.state('people', {
        url: "people",
        parent: "app",
        views: {
            content: {
                templateUrl: "/views/partials/people.html"
            }
        }
    })

    // iMethod Lite routes

    $stateProvider.state('imethodLite', {
        url: "imethod-lite",
        parent: "app",
        views: {
            pageMeta: {
                templateUrl: "/views/partials/imethod-lite-page-meta.html"
            },
            sidebar: {
                templateUrl: "/views/partials/imethod-side-menu.html"
            },
            content: {
                templateUrl: "/views/partials/imethod-lite-idea-create.html"
            }
        }
    })

    $stateProvider.state('imethodLite.edit', {
        url: "imethod-lite/edit/:id",
        parent: "app",
        views: {
            pageMeta: {
                templateUrl: "/views/partials/imethod-lite-page-meta.html"
            },
            sidebar: {
                templateUrl: "/views/partials/imethod-side-menu.html"
            },
            content: {
                templateUrl: "/views/partials/imethod-lite-idea-create.html"
            }
        }
    })

    $stateProvider.state('imethodLite.view', {
        url: "imethod-lite/view/:id",
        parent: "app",
        views: {
            pageMeta: {
                templateUrl: "/views/partials/imethod-lite-page-view-meta.html"
            },
            sidebar: {
                templateUrl: "/views/partials/imethod-side-menu.html"
            },
            content: {
                templateUrl: "/views/partials/imethod-lite-idea-view.html"
            }
        }
    })

    // Routes for header dropdown
    $stateProvider.state('profile', {
        url: "user/:id",
        parent: "app",
        views: {
			pageMeta: {
                templateUrl: "/views/partials/profile-meta.html"
            },
            content: {
                templateUrl: "/views/partials/profile.html"
            }
        }
    })

    $stateProvider.state('login', {
      url: "login",
      parent: "app",
      views: {
            content: {
                templateUrl: "/views/partials/login.html"
            }
        }
    })

	 //logout
    $stateProvider.state('logout', {
      url: "logout",
      parent: "app",
      views: {
        content: {
          templateUrl: "/views/partials/logout.html"
        }
      }
    })

    //Recover Password
    $stateProvider.state('recover-password', {
      url: "recover-password",
      parent: "app",
      views: {
        content: {
          templateUrl: "/views/partials/recover-password.html"
        }
      }
    })

    //Reset Password
    $stateProvider.state('reset-password', {
        url: "reset-password",
        parent: "app",
        views: {
            content: {
                templateUrl: "/views/partials/reset-password.html"
            }
        }
    })

    //Recover Password
    $stateProvider.state('registration', {
      url: "registration",
      parent: "app",
      views: {
        content: {
          templateUrl: "/views/partials/registration.html"
        }
      }
    })

    // Routes for DB CRUD interface
    $stateProvider.state('companies', {
        url: "companies",
        parent: "app",
        views: {
            sidebar: {
                templateUrl: "/views/partials/my-dashboard-sidebar.html"
            },
            content: {
                templateUrl: "/views/partials/companyCrud/index.html"
            }
        }
    })

    $stateProvider.state('company-create', {
        url: "company/create",
        parent: "app",
        templateUrl: "/views/partials/companyCrud/create.html"
    })

    $stateProvider.state('company-edit', {
        url: "company/edit/:id",
        parent: "app",
        templateUrl: "/views/partials/companyCrud/edit.html"
    })


    $stateProvider.state('company', {
        url: "company/:id",
        parent: "app",
        templateUrl: "/views/partials/companyCrud/show.html"
    })

    $stateProvider.state('users', {
        url: "users",
        parent: "app",
        views: {
            sidebar: {
                    templateUrl: "/views/partials/my-dashboard-sidebar.html"
            },
            content: {
                templateUrl: "/views/partials/userCrud/index.html"
            }
        }
    })

    $stateProvider.state('user-create', {
        url: "user/create",
        parent: "app",
        views: {
            sidebar: {
                templateUrl: "/views/partials/my-dashboard-sidebar.html"
            },
            content: {
                templateUrl: "/views/partials/userCrud/create.html"
            }
        }
    })

    $stateProvider.state('user-edit', {
        url: "user/edit/:id",
        parent: "app",
        views: {
            sidebar: {
                templateUrl: "/views/partials/my-dashboard-sidebar.html"
            },
            content: {
                templateUrl: "/views/partials/userCrud/edit.html"
            }
        }
    })

    $stateProvider.state('user', {
        url: "user/:id",
        parent: "app",
        views: {
            sidebar: {
                templateUrl: "/views/partials/my-dashboard-sidebar.html"
            },
            content: {
                templateUrl: "/views/partials/userCrud/show.html"
            }
        }
    })

  };

  angular.module('ima-app').config(Routes);
  Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

})();
